import * as React from 'react'
import { useRouter } from "next/router"
import { db, analytics } from '../src/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function LinkShorten() {
    const router = useRouter()
    
    const linkID = router.query.linkID

    const getLink = () => {
        const userDocument = doc(db, 'links/', linkID)
        getDoc(userDocument).then((doc) => {
            if (doc.exists()) {
                router.push(doc.data().url)
            } else {
                router.push('/')
            }
        })
    }

    React.useEffect(() => {
        if (router.isReady) {
            getLink()
        }
    }, [router.isReady])
}