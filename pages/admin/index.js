import * as React from 'react'

import { auth, db } from '../../src/firebase'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { collection, doc, getDoc, getDocs, setDoc, orderBy, query, onSnapshot } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth'

import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'

import AdminLink from '../../src/AdminLink';
import AdminMakeLink from '../../src/AdminMakeLink';

export default function Admin() {

    const [user, loading, error] = useAuthState(auth);

    const [ username, setUsername ] = React.useState();
    const [ password, setPassword ] = React.useState();

    const [ userData, setUserData ] = React.useState();
    const [ linkData, setLinkData ] = React.useState([]);

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
    }, [ user ] )
    React.useMemo(() => {
        if (user) {
            getUser()
        }
    }, [ user ])

    if (loading) return (<div>Loading...</div>)
    else if (!user) return(
        <Container sx={{p: '1em'}}>
            <Stack direction='column' spacing={2} sx={{alignItems: 'center'}}>
                <Typography>Admin Panel</Typography>
                <Stack direction='row' spacing={2} sx={{justifyContent: 'space-evenly'}}>
                    <TextField label='Login' fullWidth id='user' type='text' value={username} onChange={(e) => {setUsername(e.target.value)}} />
                    <TextField label='Password' fullWidth id='pass' type='password' value={password} onChange={(e) => {setPassword(e.target.value)}} />
                    <Button variant='contained' onClick={attemptLogin}>Login</Button>
                </Stack>
            </Stack>
        </Container>
    )
    else if (user && userData?.admin) return (
        <Container sx={{mt: '1em'}}>
            <Stack direction='row' spacing={2} sx={{pb: '1em', alignItems: 'center'}}>
                <Typography>{user.email}</Typography>
                <Box sx={{flexGrow: 1}} />
                <Typography>{userData?.admin? 'Admin' : '!NOT ADMIN!'}</Typography>
                <Button variant='contained' onClick={() => signOut(auth)}>Sign Out</Button>
            </Stack>
            <AdminMakeLink />
            <Paper sx={{my: '1em' ,p: '1em'}}>
                <Stack direction='column' spacing={2}>
                    {linkData.map((link, index) => 
                        <AdminLink linkData={link} index={index} key={index} />
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