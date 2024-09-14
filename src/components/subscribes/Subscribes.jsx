import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../navbar/Navbar'
import Sidenav from '../navbar/Sidenav'
import SubsCard from './SubsCard'
import styles from "./Subscribes.module.css"

export default function Subscribes() {
    const [subsc, setSubsc] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        async function getSubs() {
            try {
                const userData = await axios.get("https://honest-stillness-production.up.railway.app/api/users/getsubscriber",
                    { withCredentials: true });
                // console.log(userData.data?.followedUser)
                setSubsc(userData.data?.followedUser)

            }
            catch (err) {
                console.log(err)
            }
        }
        getSubs()
    }, [])
    return (
        <div className={styles.main}>
            <div>
                <Navbar></Navbar>
            </div>
            <div className={styles.mainbox}>
                <div className={styles.Sidenav}>
                    <Sidenav></Sidenav>
                </div>
                <div className={styles.box}>
                    <div className={styles.subs}>
                        {subsc.map((channel, index) =>
                            <SubsCard key={index} channel={channel}></SubsCard>
                        )}
                    </div>
                    {
                        subsc.length===0 &&
                        <div className={styles.notSubs}>
                            You have'nt Subscribed any Channel yet
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
