import * as React from 'react'

import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'
import { useRouter } from 'next/router';

function ToolButton(props) {
    return(
        <Tooltip title={props.description}>
            <Button variant='outlined' color='primary' fullWidth onClick={() => {router.push(props.link)}}>{props.title}</Button>
        </Tooltip>
    )
}

export default function Home() {

    const router = useRouter()

    return(
        <Container sx={{p: '2em'}} maxWidth='xl'>
            <Grid container spacing={8} sx={{flexGrow: 1}} justifyContent={'center'}>
                <Grid item xl={12}>
                    <Paper elevation={4} sx={{px: '2em', pt: '7em', pb: '1em'}}>
                        <Typography align='right' variant='h4'>L2X.US Tools</Typography>
                    </Paper>
                </Grid>
                <Grid item xl={12} alignSelf={'center'} textAlign={'center'}>
                    <Typography variant='body'>
                        This site hosts a variety of publicly available tools in the form of web apps. <br/>
                        All tools are completely free unless otherwise noted, and many are open source.
                    </Typography>
                </Grid>
                <Grid item xl={6}>
                    <Stack direction='column' spacing={2}>
                        <ToolButton
                            title='IC Safe Foods'
                            description='A tracker for triggering foods and ingredients.'
                            link='https://ic.l2x.us/' />
                    </Stack>
                </Grid>
            </Grid>
        </Container>
        )
}