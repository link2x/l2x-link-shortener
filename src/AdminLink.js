import Card from '@mui/material/Card'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'

import Link from 'next/link'

import { db } from './firebase'
import { doc, deleteDoc, Timestamp } from 'firebase/firestore'

export default function AdminLink(props) {

    const linkData = props.linkData

    const handleDelete = () => {
        const linkDocument = doc(db, 'links/' + linkData.linkID)
        deleteDoc(linkDocument)
    }

    return(
        <Card sx={{p: '0.5em'}}>
            <Grid container direction='row' sx={{alignItems: 'center'}}>
                <Grid item sm={3} md={2} sx={{textAlign: 'center'}}>
                    <Typography variant='h6' color='blue' sx={{textDecoration: 'underline'}}><Link href={'../' + linkData.linkID}>{linkData.linkID}</Link></Typography>
                </Grid>
                <Grid item sm={9} md={8}>
                    <Stack direction='column' spacing={1} sx={{alignItems: 'center'}}>
                        <Typography variant='body2' color='blue' sx={{textDecoration: 'underline'}}><Link href={linkData.url}>{linkData.url}</Link></Typography>
                        <Typography variant='caption'>{linkData.createTimestamp.toDate().toLocaleString()}</Typography>
                    </Stack>
                </Grid>
                <Grid item md={1}>

                </Grid>
                <Grid item xs={12} sm={2} md={1}>
                    <Button fullWidth variant='outlined' color='error' onClick={handleDelete}>Delete</Button>
                </Grid>
            </Grid>
        </Card>
    )
}