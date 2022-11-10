import * as React from 'react'

import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'

import { db } from './firebase'
import { doc, setDoc, Timestamp } from 'firebase/firestore'

export default function AdminMakeLink(props) {

    const [ shortcode, setShortcode ] = React.useState('')
    const [ URL, setURL ] = React.useState('')

    const makeLink = () => {
        if (shortcode && URL) {
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
        }
    }

    return(
        <Grid container spacing={2} sx={{alignItems: 'center'}}>
            <Grid item xs={12} sm={3} md={2}>
                <TextField fullWidth size='small' value={shortcode} onChange={(e) => setShortcode(e.target.value)} label='Short Code' />
            </Grid>
            <Grid item xs={12} sm={6} md={8}>
                <TextField fullWidth size='small' value={URL} onChange={(e) => setURL(e.target.value)} label='URL' />
            </Grid>
            <Grid item xs={12} sm={3} md={2}>
                <Button fullWidth size='large' variant='outlined' onClick={makeLink}>New Link</Button>
            </Grid>
        </Grid>
    )
}