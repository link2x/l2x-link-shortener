import * as React from 'react'

import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { useRouter } from 'next/router';

function ToolButton(props) {
    return(
        <Tooltip title={props.description}>
            <Button size='large' variant='outlined' color='primary' fullWidth onClick={() => {props.router.push(props.link)}}>{props.title}</Button>
        </Tooltip>
    )
}

export default function Home() {

    const router = useRouter()

    return(
        <Container component={Paper} square sx={{p: '2em'}} maxWidth='xl'>
            <Grid container spacing={8} sx={{flexGrow: 1}} justifyContent={'center'}>
                <Grid item xs={12} md={12} lg={12}>
                    <Paper elevation={1} square
                        sx={{
                            px: '2em',
                            pt: '7em',
                            pb: '1em',
                            background: 'linear-gradient(129deg, rgba(29,63,84,0.8) 0%, rgba(3,26,38,0.8) 100%)'
                        }}>
                        <Typography
                            align='right'
                            variant='h4'
                            sx={{
                                background: 'linear-gradient(129deg, rgba(120,148,166,1) 0%, rgba(14,107,156,1) 100%)',
                                backgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'}}>
                            L2X.US Tools</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6} lg={12} alignSelf={'center'} textAlign={'center'}>
                    <Typography variant='body'>
                        This site hosts a variety of publicly available tools in the form of web apps. <br/>
                        All tools are completely free unless otherwise noted, and many are open source.
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                    <Stack direction='column' spacing={2}>
                        <ToolButton
                            title='IC Safe Foods'
                            description='A tracker for triggering foods and ingredients.'
                            link='https://ic.l2x.us/'
                            router={router} />
                    </Stack>
                </Grid>
            </Grid>
        </Container>
        )
}