import Card from '@mui/material/Card'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Chip from '@mui/material/Chip'

import Link from 'next/link'

import { db } from './firebase'
import { doc, deleteDoc, setDoc, Timestamp } from 'firebase/firestore'

export default function AdminLink(props) {

    const linkData = props.linkData
    const showHidden = props.showHidden

    const linkDocument = doc(db, 'links/' + linkData.linkID)

    const handleDelete = () => {
        deleteDoc(linkDocument)
    }

    const toggleHidden = () => {
        setDoc(linkDocument, {
            hidden: !linkData?.hidden
        }, { merge: true })
    }

    if (showHidden || (!linkData?.hidden)) return(
        <Card elevation={2}>
            <Grid container direction='row' spacing={2} sx={{alignItems: 'center', p: '1em'}}>
                <Grid item xs={12} sm={3} md={2} sx={{textAlign: 'center'}}>
                    <Chip color='primary' label={
                    <Typography variant='h6'><Link href={'../' + linkData.linkID}>{linkData.linkID}</Link></Typography>
                } />
                </Grid>
                <Grid item xs={12} sm={9} md={8}>
                    <Stack direction='column' spacing={1} sx={{alignItems: 'center'}}>
                        <Chip size='small' variant='outlined' label={
                            <Typography textAlign={'center'} ><Link href={linkData.url}>{linkData.url}</Link></Typography>
                        } />
                        <Chip size='small' label={
                        <Typography variant='caption'>{linkData.createTimestamp.toDate().toLocaleString()}</Typography>
                    } />
                    </Stack>
                </Grid>
                <Grid item xs={12} sm={6} md={1}>
                    <Button fullWidth onClick={toggleHidden}>{linkData?.hidden ? 'Unhide' : 'Hide'}</Button>
                </Grid>
                <Grid item xs={12} sm={6} md={1}>
                    <Button fullWidth variant='outlined' color='error' onClick={handleDelete}>Delete</Button>
                </Grid>
            </Grid>
        </Card>
    )
}