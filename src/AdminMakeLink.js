import * as React from 'react'

import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'

import { db } from './firebase'
import { doc, setDoc, Timestamp } from 'firebase/firestore'

export default function AdminMakeLink(props) {

    const linkData = props.linkData

    const [ shortcode, setShortcode ] = React.useState('')
    const [ URL, setURL ] = React.useState('')

    const [ error, setError ] = React.useState('')

    const makeLink = () => {
        if (shortcode && URL && (linkData.findIndex(e => e.linkID==shortcode) === -1)) {
            const linkDocument = doc(db, 'links/' + shortcode)
            let newLinkData = {
                url: URL,
                createTimestamp: Timestamp.now(),
                updateTimestamp: Timestamp.now()
            }
            setDoc(linkDocument, newLinkData).then(() => {
                setShortcode('')
                setURL('')
            })
        } else if (!(linkData.findIndex(e => e.linkID==shortcode) === -1)) {
            setError('This shortcode already exists. Edit/Delete the existing entry or pick a new one.')
        } else if (!shortcode) {
            setError('Please enter a shortcode.')
        } else if (!URL) {
            setError('Please enter a URL.')
        }
    }

    return(
        <Grid container spacing={2} sx={{alignItems: 'center'}}>
            {error && 
                <Grid item md={12}>
                    <Alert severity='error'>{error}</Alert>
                </Grid>
            }
            <Grid item xs={12} sm={3} md={2}>
                <TextField fullWidth size='small' value={shortcode}
                    onChange={(e) => {
                        setShortcode(e.target.value)
                        setError('')
                        }} label='Short Code' />
            </Grid>
            <Grid item xs={12} sm={6} md={8}>
                <TextField fullWidth size='small' value={URL}
                    onChange={(e) => {
                        setURL(e.target.value)
                        setError('')
                        }} label='URL' />
            </Grid>
            <Grid item xs={12} sm={3} md={2}>
                <Button fullWidth size='large' variant='outlined' onClick={makeLink}>New Link</Button>
            </Grid>
        </Grid>
    )
}