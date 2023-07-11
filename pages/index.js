import * as React from 'react'

import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'
import { useRouter } from 'next/router';

export default function Home() {

    const router = useRouter()

    return(
        <Container sx={{p: '2em'}}>
            <Stack direction='row' alignContent={'center'} alignItems={'center'} justifyContent={'center'}>
                <Stack direction='column' spacing={2}>
                    <Typography variant='h4'>L2X.US Tools</Typography>
                    <Button onClick={() => {router.push('https://ic.l2x.us/')}}>IC Safe Foods</Button>
                </Stack>
            </Stack>
        </Container>
        )
}