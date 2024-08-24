import React, { useEffect, useState } from 'react'
import styles from './History.module.css'
import Navbar from '../navbar/Navbar'
import Sidenav from '../navbar/Sidenav'
import { useSelector } from 'react-redux'
import { darkTheme, lightTheme } from '../../themes'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import History from './History'


export default function Histories() {
    const theme = useSelector((state) => state.theme.value)
    const navigate = useNavigate()
    const [userData, setuserData] = useState("")
    const sign = useSelector((state) => state.sign.value)
    useEffect(() => {
        if(!sign.status){
            navigate("/")
        }
        async function fetchData() {
            try {
                const userData = await axios.get("http://localhost:8000/api/users/history",
                    { withCredentials: true }
                );
                setuserData(userData.data)
                console.log(userData.data)
            }
            catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [])

    return (
        <div className={styles.mainBox}>
            <Navbar></Navbar>
            <div className={styles.bigBox}>
                <div className={styles.Sidenav}>
                    <Sidenav></Sidenav>
                </div>
                <div className={styles.history}>
                    <div className={styles.userProfile}>
                        <div className={styles.userImg}>
                            <img src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmF0dXJlfGVufDB8MHwwfHx8MA%3D%3D" alt="profile" width="100%" height="100%" />
                        </div>
                        <div className={styles.profileDetails}>
                            <div className={styles.channelName}>
                                {userData?.name}
                            </div>
                            <div className={styles.userName}>
                                <div>@{userData?.username}</div>
                                .
                                <div>subs {userData?.followers}</div>
                            </div>
                            <div className={styles.switchBtn}>
                                <button style={theme ? darkTheme : lightTheme} onClick={() => navigate("/signin")}>Switch Account</button>
                            </div>
                        </div>
                    </div>
                    {userData?.history?.length!==0 &&  <div>
                        <div className={styles.view}>History ({userData?.history?.length})</div>
                        <History userData={userData.history}></History>
                    </div>}
                    {userData?.saved?.length!==0 &&  <div>
                        <div className={styles.view}>Watch Later ({userData?.saved?.length})</div>
                        <History userData={userData.saved}></History>
                    </div>}
                    {userData?.liked?.length!==0 && <div>
                        <div className={styles.view}>Liked Videos ({userData?.liked?.length})</div>
                        <History userData={userData.liked}></History>
                    </div>}
                    {userData?.disliked?.length !==0 &&  <div>
                        <div className={styles.view}>Disliked Videos ({userData?.disliked?.length})</div>
                        <History userData={userData.disliked}></History>
                    </div>}
                </div>
            </div>
        </div>
    )
}
