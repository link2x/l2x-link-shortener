import * as React from 'react'

import { auth, db } from '../../src/firebase'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { collection, doc, getDoc, getDocs, setDoc, orderBy, query, onSnapshot, where } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth'

import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'

import RefreshIcon from '@mui/icons-material/Refresh'

import AdminLink from '../../src/AdminLink';
import AdminMakeLink from '../../src/AdminMakeLink';

export default function Admin() {

    const [user, loading, error] = useAuthState(auth);

    const [ username, setUsername ] = React.useState();
    const [ password, setPassword ] = React.useState();

    const [ userData, setUserData ] = React.useState();
    const [ linkData, setLinkData ] = React.useState([]);

    const [ forceUpdate, setForceUpdate ] = React.useState(0);

    const [ showHidden, setShowHidden ] = React.useState(false);

    const triggerRefresh = () => {
        setForceUpdate(forceUpdate + 1)
    }

    const toggleShowHidden = () => {
        setShowHidden(!showHidden)
    }

    const attemptLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, username, password)
    }

    const getUser = () => {
        const userDocument = doc(db, 'users/', user.uid)
        getDoc(userDocument).then((doc) => {
            setUserData(doc.data())
        })
    }

    const linksCollection = collection(db, 'links/')
    const linksQuery = query(linksCollection, orderBy('createTimestamp', 'desc'))
    React.useEffect(() => {
        if (user) {
        const unsubGetLinks = onSnapshot(linksQuery, (docs) => {
                let newLinkData = []
                docs.forEach((doc) => {
                    let newLink = doc.data()
                    newLink.linkID = doc.id
                    linkData.findIndex(e => e.linkID==newLink.linkID) === -1 ? newLinkData.push(newLink) : null
                })
                setLinkData(newLinkData)
        })

        return () => unsubGetLinks()
        }
    }, [ user, forceUpdate ] )

    React.useMemo(() => {
        if (user) {
            getUser()
        }
    }, [ user ])

    if (loading) return (<div>Loading...</div>)
    else if (!user) return(
        <Container>
            <Stack direction='column' sx={{alignItems: 'center'}}>
                <Typography variant='h5' sx={{py: '1em'}}>Admin Panel</Typography>
                <Grid container direction='row' spacing={2} sx={{alignItems: 'center'}}>
                    <Grid item xs={12} sm={12} md={5}>
                        <TextField fullWidth label='Login' id='user' type='text' value={username} onChange={(e) => {setUsername(e.target.value)}} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={5}>
                        <TextField fullWidth label='Password' id='pass' type='password' value={password} onChange={(e) => {setPassword(e.target.value)}} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={2}>
                        <Button fullWidth variant='contained' size='large' onClick={attemptLogin}>Login</Button>
                    </Grid>
                </Grid>
            </Stack>
        </Container>
    )
    else if (user && userData?.admin) return (
        <Container maxWidth='xl' sx={{mt: '1em'}}>
            <Stack direction='row' spacing={2} sx={{pb: '1em', alignItems: 'center'}}>
                <Typography>L2X.US Link Shortener - {user.email}</Typography>
                <Box sx={{flexGrow: 1}} />
                <Button variant='contained' onClick={() => signOut(auth)}>Sign Out</Button>
            </Stack>
            <AdminMakeLink />
            <Paper elevation={1} sx={{my: '1em', p: '1em'}}>
                <Grid container spacing={2} sx={{mb: '1em', px: '1em', alignContent: 'center', alignItems: 'center'}}>
                    <Grid item xs={12} md={8}>
                        <Typography variant='body1'>{linkData.length} Links</Typography>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Button fullWidth variant='contained' color='secondary' onClick={toggleShowHidden}>{showHidden ? 'Hide Hidden Links' : 'Show All Links'}</Button>
                    </Grid>
                    <Grid item xs={12} md={1}>
                        <Stack direction='row' sx={{justifyContent: 'center'}}>
                            <IconButton onClick={triggerRefresh}>
                                <RefreshIcon />
                            </IconButton>
                        </Stack>
                    </Grid>
                </Grid>
                <Stack direction='column' spacing={2}>
                    {linkData.map((link, index) => 
                        <AdminLink linkData={link} index={index} key={index} showHidden={showHidden} />
                    )}
                </Stack>
            </Paper>
        </Container>
    )
    else if (user) return (
        <div>
            Loading...
        </div>
    )
}