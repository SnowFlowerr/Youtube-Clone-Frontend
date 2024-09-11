import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { darkTheme, lightTheme } from '../../themes'
import Navbar from '../navbar/Navbar'
import Sidenav from '../navbar/Sidenav'
import History from './History'
import styles from './History.module.css'
import ShortsHistory from './ShortsHistory'


export default function Histories() {
    const theme = useSelector((state) => state.theme.value)
    const navigate = useNavigate()
    const [userData, setuserData] = useState("")
    const [shortsData, setshortsData] = useState("")
    const sign = useSelector((state) => state.sign.value)

    useEffect(() => {
        if(!sign){
            // navigate("/")
        }
        async function fetchData() {
            try {
                const userData = await axios.get("https://honest-stillness-production.up.railway.app/api/users/history",
                    { withCredentials: true }
                );
                setuserData(userData.data)
                // console.log(userData.data)
            }
            catch (err) {
                console.log(err)
            }
        }
        fetchData()
        async function fetchData2() {
            try {
                const userData = await axios.get("https://honest-stillness-production.up.railway.app/api/users/shortshistory",
                    { withCredentials: true }
                );
                setshortsData(userData.data)
                // console.log(userData.data)
            }
            catch (err) {
                console.log(err)
            }
        }
        fetchData2()
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
                            <img src={sign?.img} alt="profile" width="100%" height="100%" />
                        </div>
                        <div className={styles.profileDetails}>
                            <div className={styles.channelName}>
                                {sign?.name}
                            </div>
                            <div className={styles.userName}>
                                <div>@{sign?.username}</div>
                                .
                                <div>subs {sign?.followers}</div>
                            </div>
                            <div className={styles.switchBtn}>
                                <button style={theme ? darkTheme : lightTheme} onClick={() => navigate(`/channels/${sign._id}/featured`)}>Your Channel</button>
                                {" "}
                                <button style={theme ? darkTheme : lightTheme} onClick={() => navigate("/signin")}>Switch Account</button>
                            </div>
                        </div>
                    </div>
                    {userData?.history?.length!==0 &&  <div>
                        <div className={styles.view}>Videos History ({userData?.history?.length})</div>
                        <History userData={userData.history}></History>
                    </div>}
                    {shortsData?.shortsHistory?.length!==0 &&  <div>
                        <div className={styles.view}>Shorts History ({shortsData?.shortsHistory?.length})</div>
                        <ShortsHistory userData={shortsData?.shortsHistory}/>
                    </div>}

                    {userData?.saved?.length!==0 &&  <div>
                        <div className={styles.view}>Saved Videos ({userData?.saved?.length})</div>
                        <History userData={userData?.saved}></History>
                    </div>}
                    {shortsData?.shortsSaved?.length!==0 &&  <div>
                        <div className={styles.view}>Saved Shorts ({shortsData?.shortsSaved?.length})</div>
                        <ShortsHistory userData={shortsData?.shortsSaved}/>
                    </div>}

                    {userData?.liked?.length!==0 && <div>
                        <div className={styles.view}>Liked Videos ({userData?.liked?.length})</div>
                        <History userData={userData?.liked}></History>
                    </div>}
                    {shortsData?.shortsLiked?.length!==0 && <div>
                        <div className={styles.view}>Liked Shorts ({shortsData?.shortsLiked?.length})</div>
                        <ShortsHistory userData={shortsData?.shortsLiked}/>
                    </div>}

                    {userData?.disliked?.length!==0 && <div>
                        <div className={styles.view}>Disliked Videos ({userData?.disliked?.length})</div>
                        <History userData={userData?.disliked}></History>
                    </div>}
                    {shortsData?.shortsDisliked?.length!==0 && <div>
                        <div className={styles.view}>Disliked Shorts ({shortsData?.shortsDisliked?.length})</div>
                        <ShortsHistory userData={shortsData?.shortsDisliked}/>
                    </div>}
                </div>
            </div>
        </div>
    )
}
