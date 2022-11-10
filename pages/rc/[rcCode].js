import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

export default function Sorry() {
    return(
        <Container>
            <Paper sx={{p: '1em', my: '2em'}} >
                <Typography variant='h4' textAlign={'center'} sx={{pb: '0.5em'}}>Sorry, this content is no longer available.</Typography>
                <Typography variant='body1'>Hi there! Unfortunately, as part of a server move, this content is no longer available through these links.</Typography>
                <Typography variant='body1'>I&apos;m no longer hosting these files directly, but that doesn&apos;t mean you can&apos;t have them!</Typography>
                <Typography variant='body1'>Feel free to email me at eden@link2x.us, and I&apos;ll be super happy to send you MP3s of any song.</Typography>
            </Paper>
        </Container>
    )
}