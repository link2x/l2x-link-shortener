import * as React from 'react'

import Card from '@mui/material/Card'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Chip from '@mui/material/Chip'
import TextField from '@mui/material/TextField'

import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'

import Link from 'next/link'

import { db } from './firebase'
import { doc, deleteDoc, setDoc, Timestamp } from 'firebase/firestore'

export default function AdminLink(props) {

    const linkData = props.linkData
    const showHidden = props.showHidden

    const [ editMode, setEditMode ] = React.useState(false)
    const [ updating, setUpdating ] = React.useState(false)
    const [ editURL, setEditURL ] = React.useState(linkData.url)

    const [ deleteDialog, setDeleteDialog ] = React.useState(false)

    const linkDocument = doc(db, 'links/' + linkData.linkID)

    const handleDelete = () => {
        setUpdating(true)
        deleteDoc(linkDocument).then(() => {
            setDeleteDialog(false)
            setUpdating(false)
        })
    }

    const handleOpenDeleteDialog = () => {
        setDeleteDialog(true)
    }

    const handleCloseDeleteDialog = () => {
        setDeleteDialog(false)
    }

    const toggleHidden = () => {
        setDoc(linkDocument, {
            hidden: !linkData?.hidden
        }, { merge: true })
    }

    const handleEditMode = () => {
        setUpdating(false)
        setEditMode(true)
    }

    const handleCancelEditMode = () => {
        setEditMode(false)
    }

    const handleEditUpdate = () => {
        setUpdating(true)
        setDoc(linkDocument, {
            url: editURL,
            updateTimestamp: Timestamp.now()
        }, { merge: true }).then(() => {
            setEditMode(false)
            setUpdating(false)
        })
    }

    const displayDeleteDialog =
        <Dialog maxWidth='lg' fullWidth open={deleteDialog} onClose={handleCloseDeleteDialog}>
            <DialogTitle>Delete this link?</DialogTitle>
            <DialogContent>
                <DialogContentText>This action cannot be undone.</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button disabled={updating} onClick={handleCloseDeleteDialog}>Cancel</Button>
                <Button variant='contained' color='error' disabled={updating} onClick={handleDelete}>Delete</Button>
            </DialogActions>
        </Dialog>

    const displayNormal = 
        <Grid container direction='row' spacing={2} sx={{alignItems: 'center', p: '1em'}}>
            {displayDeleteDialog}
            <Grid item xs={12} sm={3} md={2} sx={{textAlign: 'center'}}>
                <Chip color='primary' label={
                <Typography variant='h6'><Link href={'../' + linkData.linkID}>{linkData.linkID}</Link></Typography>
            } />
            </Grid>
            <Grid item xs={12} sm={9} md={7}>
                <Stack direction='column' spacing={1} sx={{alignItems: 'center'}}>
                    <Chip size='small' variant='outlined' label={
                        <Typography textAlign={'center'} ><Link href={linkData.url}>{linkData.url}</Link></Typography>
                    } />
                    <Chip size='small' label={
                        <Typography variant='caption'>Created: {linkData.createTimestamp.toDate().toLocaleString()}</Typography>
                    } />
                    <Chip size='small' label={
                        <Typography variant='caption'>Last Updated: {
                            linkData?.updateTimestamp ? linkData?.updateTimestamp?.toDate().toLocaleString()
                                : linkData.createTimestamp.toDate().toLocaleString()
                            }</Typography>
                    } />
                </Stack>
            </Grid>
            <Grid item xs={12} sm={6} md={1}>
                <Button fullWidth onClick={toggleHidden}>{linkData?.hidden ? 'Unhide' : 'Hide'}</Button>
            </Grid>
            <Grid item xs={12} sm={6} md={1}>
                <Button fullWidth variant='outlined' onClick={handleEditMode}>Edit</Button>
            </Grid>
            <Grid item xs={12} sm={12} md={1}>
                <Button fullWidth variant='outlined' color='error' onClick={handleOpenDeleteDialog}>Delete</Button>
            </Grid>
        </Grid>

    const displayEdit =
        <Grid container direction='row' spacing={2} sx={{alignItems: 'center', p: '1em'}}>
            <Grid item xs={12} sm={12} md={10}>
                <Stack direction='column' spacing={1}>
                    <TextField fullWidth size='small' label='Short Code' disabled value={linkData.linkID} />
                    <TextField fullWidth size='small' label='URL' disabled={updating} value={editURL} onChange={(e) => {setEditURL(e.target.value)}} />
                </Stack>
            </Grid>
            <Grid item xs={12} sm={6} md={1}>
                <Button fullWidth variant='outlined' color='error' disabled={updating} onClick={handleCancelEditMode}>Cancel</Button>
            </Grid>
            <Grid item xs={12} sm={6} md={1}>
                <Button fullWidth variant='outlined' color='secondary' disabled={updating} onClick={handleEditUpdate}>Submit</Button>
            </Grid>
        </Grid>

    if (showHidden || (!linkData?.hidden)) return(
        <Card elevation={2}>
            {editMode ? displayEdit : displayNormal}
        </Card>
    )
}