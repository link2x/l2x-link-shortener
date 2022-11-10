import * as React from 'react'
import { useRouter } from "next/router"
import { db } from '../src/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function LinkShorten() {
    const router = useRouter()
    
    const linkID = router.query.linkID

    const getLink = () => {
        const userDocument = doc(db, 'links/', linkID)
        getDoc(userDocument).then((doc) => {
            router.push(doc.data().url)
        })
    }

    React.useEffect(() => {
        if (router.isReady) {
            getLink()
        }
    }, [router.isReady])
}