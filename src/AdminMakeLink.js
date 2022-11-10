import * as React from 'react'

import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

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
                createTimestamp: Timestamp.now()
            }
            setDoc(linkDocument, newLinkData).then(() => {
                setShortcode('')
                setURL('')
            })
        }
    }

    return(
        <Stack direction='row' spacing={2} sx={{alignItems: 'center'}}>
            <TextField value={shortcode} onChange={(e) => setShortcode(e.target.value)} label='Short Code' />
            <TextField value={URL} onChange={(e) => setURL(e.target.value)}fullWidth label='URL' />
            <Button onClick={makeLink}>New Link</Button>
        </Stack>
    )
}