import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { darkTheme, lightTheme } from '../../themes'
import Navbar from '../navbar/Navbar'
import Sidenav from '../navbar/Sidenav'
import History from './History'
import styles from './History.module.css'
import ShortsHistory from './ShortsHistory'


export default function Histories() {
    const theme = useSelector((state) => state.theme.value)
    const navigate = useNavigate()
    const [videoHistory, setvideoHistory] = useState([])
    const [videoLiked, setvideoLiked] = useState([])
    const [musicHistory, setmusicHistory] = useState([])
    const [musicLiked, setmusicLiked] = useState([])
    const [videoDisliked, setvideoDisliked] = useState([])
    const [videoSaved, setvideoSaved] = useState([])
    const [shortsHistory, setshortsHistory] = useState([])
    const [shortsLiked, setshortsLiked] = useState([])
    const [shortsDisliked, setshortsDisliked] = useState([])
    const [shortsSaved, setshortsSaved] = useState([])
    const sign = useSelector((state) => state.sign.value)
    let { category } = useParams();

    useEffect(() => {
        if(!sign){
            // navigate("/")
        }
        async function fetchData() {
            try {
                const userData = await axios.get("https://video-streaming-app-backend-r6e3.onrender.com/api/videos/history/get",
                    { withCredentials: true }
                );
                setvideoHistory(userData.data)
                // console.log(userData.data)
            }
            catch (err) {
                console.log(err)
            }
        }
        async function fetchData2() {
            try {
                const userData = await axios.get("https://video-streaming-app-backend-r6e3.onrender.com/api/shorts/history/get",
                    { withCredentials: true }
                );
                setshortsHistory(userData.data)
                // console.log(userData.data)
            }
            catch (err) {
                console.log(err)
            }
        }
        async function fetchData3() {
            try {
                const userData = await axios.get("https://video-streaming-app-backend-r6e3.onrender.com/api/videos/liked/get",
                    { withCredentials: true }
                );
                setvideoLiked(userData.data)
                // console.log(userData.data)
            }
            catch (err) {
                console.log(err)
            }
        }
        async function fetchData4() {
            try {
                const userData = await axios.get("https://video-streaming-app-backend-r6e3.onrender.com/api/shorts/liked/get",
                    { withCredentials: true }
                );
                setshortsLiked(userData.data)
                // console.log(userData.data)
            }
            catch (err) {
                console.log(err)
            }
        }
        async function fetchData5() {
            try {
                const userData = await axios.get("https://video-streaming-app-backend-r6e3.onrender.com/api/videos/disliked/get",
                    { withCredentials: true }
                );
                setvideoDisliked(userData.data)
                // console.log(userData.data)
            }
            catch (err) {
                console.log(err)
            }
        }
        async function fetchData6() {
            try {
                const userData = await axios.get("https://video-streaming-app-backend-r6e3.onrender.com/api/shorts/disliked/get",
                    { withCredentials: true }
                );
                setshortsDisliked(userData.data)
                // console.log(userData.data)
            }
            catch (err) {
                console.log(err)
            }
        }
        async function fetchData7() {
            try {
                const userData = await axios.get("https://video-streaming-app-backend-r6e3.onrender.com/api/videos/saved/get",
                    { withCredentials: true }
                );
                setvideoSaved(userData.data)
                // console.log(userData.data)
            }
            catch (err) {
                console.log(err)
            }
        }
        async function fetchData8() {
            try {
                const userData = await axios.get("https://video-streaming-app-backend-r6e3.onrender.com/api/shorts/saved/get",
                    { withCredentials: true }
                );
                setshortsSaved(userData.data)
                // console.log(userData.data)
            }
            catch (err) {
                console.log(err)
            }
        }
        fetchData()
        fetchData2()
        fetchData3()
        fetchData4()
        fetchData5()
        fetchData6()
        fetchData7()
        fetchData8()
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
                    <div>
                        <div className={styles.historyNav}>
                            <div onClick={() => navigate("/history/videos")} style={theme ? category === "videos"?lightTheme:{borderBottom: "1px solid gray"} : category === "videos"?  darkTheme:{borderBottom: "1px solid gray"}} >
                                Videos
                            </div>
                            <div onClick={() => navigate("/history/shorts")} style={theme ? category === "shorts"?lightTheme:{borderBottom: "1px solid gray"} : category === "shorts"?  darkTheme:{borderBottom: "1px solid gray"}} >
                                Shorts
                            </div>
                            <div onClick={() => navigate("/history/music")} style={theme ? category === "music"?lightTheme:{borderBottom: "1px solid gray"} : category === "music"?  darkTheme:{borderBottom: "1px solid gray"}} >
                                Music
                            </div>
                        </div>
                    {videoHistory?.length!==0 &&  <div>
                        <div className={styles.view}>Videos History ({videoHistory?.length})</div>
                        <History userData={videoHistory}></History>
                    </div>}
                    {shortsHistory?.length!==0 &&  <div>
                        <div className={styles.view}>Shorts History ({shortsHistory?.length})</div>
                        <ShortsHistory userData={shortsHistory}/>
                    </div>}

                    {musicHistory?.length!==0 &&  <div>
                        <div className={styles.view}>Music History ({videoHistory?.length})</div>
                        <History userData={videoHistory}></History>
                    </div>}
                    {musicLiked?.length!==0 &&  <div>
                        <div className={styles.view}>Music Liked ({shortsHistory?.length})</div>
                        <ShortsHistory userData={shortsHistory}/>
                    </div>}

                    {videoSaved?.length!==0 &&  <div>
                        <div className={styles.view}>Saved Videos ({videoSaved?.length})</div>
                        <History userData={videoSaved}></History>
                    </div>}
                    {shortsSaved?.length!==0 &&  <div>
                        <div className={styles.view}>Saved Shorts ({shortsSaved?.length})</div>
                        <ShortsHistory userData={shortsSaved}/>
                    </div>}

                    {videoLiked?.length!==0 && <div>
                        <div className={styles.view}>Liked Videos ({videoLiked?.length})</div>
                        <History userData={videoLiked}></History>
                    </div>}
                    {shortsLiked?.length!==0 && <div>
                        <div className={styles.view}>Liked Shorts ({shortsLiked?.length})</div>
                        <ShortsHistory userData={shortsLiked}/>
                    </div>}

                    {videoDisliked?.length!==0 && <div>
                        <div className={styles.view}>Disliked Videos ({videoDisliked?.length})</div>
                        <History userData={videoDisliked}></History>
                    </div>}
                    {shortsDisliked?.length!==0 && <div>
                        <div className={styles.view}>Disliked Shorts ({shortsDisliked?.length})</div>
                        <ShortsHistory userData={shortsDisliked}/>
                    </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}
