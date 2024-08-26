import React, { useEffect, useRef, useState } from 'react'
import styles from "./VideoPlay.module.css"
import Navbar from '../navbar/Navbar'
import Sidenav from '../navbar/Sidenav'
import { useSelector } from 'react-redux'
import vid from "./VIDEO-2024-07-21-10-47-29.mp4"
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { darkTheme, lightTheme } from '../../themes'
import Share from '../Share/Share'
import Comment from '../comment/Comment'
import SimilarVideos from '../similarVideos/SimilarVideos'

// import { useNavigate } from 'react-router-dom'

export default function VideoPlay() {

    const menu = useSelector((state) => state.menu.value)
    const theme = useSelector((state) => state.theme.value)
    const sign = useSelector((state) => state.sign.value)
    const boxRef = useRef(null)
    const videoRef = useRef(null)
    const [isSubs, setisSubs] = useState(false)
    const [isLike, setisLike] = useState(false)
    const [isSaved, setisSaved] = useState(false)
    const [isDislike, setisDislike] = useState(false)
    const [videoData, setvideoData] = useState({ title: "Title" })
    const [userData, setuserData] = useState({ name: "Title" })
    const [duration, setDuration] = useState(0)
    const [view, setView] = useState(0)
    const [subs, setSubs] = useState(0)
    const [like, setLike] = useState(0)
    const [dislike, setDislike] = useState(0)
    const { id } = useParams();


    useEffect(() => {
        async function fetchData() {
            try {
                const vidData = await axios.get(`https://honest-stillness-production.up.railway.app/api/videos/${id}`)
                setvideoData(vidData.data)
                setLike(vidData.data.likes)
                setDislike(vidData.data.dislikes)
                setView(vidData.data.views)

                try {
                    const userD = await axios.get(`https://honest-stillness-production.up.railway.app/api/users/issubscribe/${vidData.data.userId}`,
                        { withCredentials: true }
                    )
                    setisSubs(userD.data)
                }
                catch (err) {
                    console.log(err.message)
                }

                try {
                    const userD = await axios.get(`https://honest-stillness-production.up.railway.app/api/users/isliked/${id}`,
                        { withCredentials: true }
                    )
                    setisLike(userD.data)
                }
                catch (err) {
                    console.log(err.message)
                }
                try {
                    const userD = await axios.get(`https://honest-stillness-production.up.railway.app/api/users/isdisliked/${id}`,
                        { withCredentials: true }
                    )
                    setisDislike(userD.data)
                }
                catch (err) {
                    console.log(err.message)
                }
                try {
                    const userD = await axios.get(`https://honest-stillness-production.up.railway.app/api/users/issaved/${id}`,
                        { withCredentials: true }
                    )
                    setisSaved(userD.data)
                }
                catch (err) {
                    console.log(err.message)
                }
                try {
                    const userD = await axios.get(`https://honest-stillness-production.up.railway.app/api/users/get/${vidData.data.userId}`,
                    )
                    setSubs(userD.data.followers)
                    setuserData(userD.data)
                }
                catch (err) {
                    console.log(err.message)
                }

            }
            catch (err) {
                console.log(err.message)
            }
        }
        fetchData()
    }, [])

    // useEffect(() => {
    //     if (menu) {
    //         boxRef.current.style.filter = "brightness(0.8)";
    //     }
    //     else {
    //         boxRef.current.style.filter = 'none'
    //     }
    // }, [menu])

    function handleSubscribe() {
        async function fetchData() {
            try {
                if (isSubs) {
                    await axios.put(`https://honest-stillness-production.up.railway.app/api/users/unsubscribe/${videoData?.userId}`,
                        {},
                        { withCredentials: true }
                    );
                    setSubs(subs - 1)
                    console.log("Unsubscribe")
                }
                else {
                    await axios.put(`https://honest-stillness-production.up.railway.app/api/users/subscribe/${videoData?.userId}`,
                        {},
                        { withCredentials: true }
                    );
                    setSubs(subs + 1)
                    console.log("Subscribe")
                }
                setisSubs(!isSubs)
                // console.log("err?.response?.data")
            }
            catch (err) {
                console.log(err?.response?.data)
            }
        }
        fetchData()
    }
    async function handleLike() {
        if (isDislike === true) {
            handleDislike()
        }
        // else if(isLike===false && isDislike===true){
        //     handleLike()
        // }
        try {
            if (isLike) {
                await axios.put(`https://honest-stillness-production.up.railway.app/api/videos/unlike/${id}`,
                    {},
                    { withCredentials: true }
                );
                setLike(like - 1)
                console.log("unlikes")
            }
            else {
                await axios.put(`https://honest-stillness-production.up.railway.app/api/videos/like/${id}`,
                    {},
                    { withCredentials: true }
                );
                setLike(like + 1)
                console.log("likes")
            }
            setisLike(!isLike)
            // console.log("err?.response?.data")
        }
        catch (err) {
            console.log(err?.response?.data)
        }
    }
    async function handleDislike() {
        if (isLike === true) {
            handleLike()
        }
        try {
            if (isDislike) {
                await axios.put(`https://honest-stillness-production.up.railway.app/api/videos/undislike/${id}`,
                    {},
                    { withCredentials: true }
                );
                setDislike(dislike - 1)
                console.log("undislikes")
            }
            else {
                await axios.put(`https://honest-stillness-production.up.railway.app/api/videos/dislike/${id}`,
                    {},
                    { withCredentials: true }
                );
                setDislike(dislike + 1)
                console.log("dislikes")
            }
            setisDislike(!isDislike)
            // console.log("err?.response?.data")
        }
        catch (err) {
            console.log(err?.response?.data)
        }
    }
    async function addView() {
        try {
            await axios.put(`https://honest-stillness-production.up.railway.app/api/videos/view/${id}`)
            setView(view + 1)
        }
        catch (err) {
            console.log(err.message)
        }
    }
    async function addHistory() {
        try {
            await axios.put(`https://honest-stillness-production.up.railway.app/api/users/history/${id}`,
                {},
                { withCredentials: true }
            );
        }
        catch (err) {
            console.log(err.message)
        }
    }
    function totalTime() {
        setDuration(Math.floor(videoRef.current.duration) / 3)
        addHistory()
    }
    useEffect(() => {
        if (duration !== 0) {
            setTimeout(() => {
                addView()
                console.log("view added")
            }, duration * 1000)
        }
    }, [duration])
    async function addSaved() {
        try {
            if (isSaved) {
                await axios.put(`https://honest-stillness-production.up.railway.app/api/users/removesave/${id}`,
                    {},
                    { withCredentials: true }
                );
                console.log("removed")
            }
            else {
                await axios.put(`https://honest-stillness-production.up.railway.app/api/users/addsave/${id}`,
                    {},
                    { withCredentials: true }
                );
                console.log("saved")
            }
            setisSaved(!isSaved)
            // console.log("err?.response?.data")
        }
        catch (err) {
            console.log(err?.response?.data)
        }
    }



    return (
        <div className={styles.mainBox}>
            <Navbar />
            <div className={styles.box} >
                {
                    menu ?
                        <div className={styles.Sidenav} >
                            <Sidenav />
                        </div>
                        :
                        <div className={styles.Sidenav2}>
                            <Sidenav />
                        </div>
                }
                <div className={styles.player} ref={boxRef}>
                    <video
                        className={styles.video}
                        src={videoData?.videoUrl}
                        // src={vid}
                        autoPlay
                        controls
                        id='videos'
                        ref={videoRef}
                        onPlay={totalTime}
                        poster={videoData?.imageUrl}
                        >

                        {/* <source
                            src={vid}
                            type='video/mp4'
                        /> */}


                    </video>
                </div>
            </div>
            <div className={styles.videoDetails} ref={boxRef}>
                <div className={styles.videoDet}>
                    <div className={styles.title}>
                        {videoData?.title}
                    </div>

                    <div className={styles.videoStatus}>
                        <div className={styles.channel}>
                            <div className={styles.channelDetail}>
                                <div className={styles.icon}></div>
                                <div className={styles.channelName}>
                                    <span className={styles.name}>{userData?.name}</span>
                                    <br />
                                    <span className={styles.subs}>{subs} subs</span>
                                </div>
                            </div>

                            <div className={styles.status2}>
                                <div className={styles.subscribe} style={theme ? isSubs ? { backgroundColor: "#2e2e2e" } : lightTheme : isSubs ? { backgroundColor: "rgb(220, 220, 220)" } : darkTheme} onClick={handleSubscribe}>
                                    {isSubs ? "Unsubscribe" : "Subscribe"}
                                </div>

                            </div>
                        </div>
                        <div className={styles.status}>
                            <div className={styles.likeDislike} style={theme ? {} : { backgroundColor: "rgb(220, 220, 220)" }}>
                                <span className={styles.like} onClick={handleLike} >
                                    {isLike ? <span className={styles.selected}><i className="fa-solid fa-thumbs-up"></i></span> : <i className="fa-regular fa-thumbs-up"></i>} {like}
                                </span>
                                <span className={styles.dislike} onClick={handleDislike}>
                                    {dislike} {isDislike ? <span className={styles.selected}> <i className="fa-solid fa-thumbs-down fa-flip-horizontal"></i> </span> : <i className="fa-regular fa-thumbs-down fa-flip-horizontal"></i>}
                                </span>
                            </div>
                            <Share
                                text={videoData?.title}
                                url={window.location.href}
                                title={videoData?.title}
                                share={
                                    <div className={styles.share} style={theme ? {} : { backgroundColor: "rgb(220, 220, 220)" }}>
                                        <span><i className="fa-solid fa-share"></i> Share</span>
                                    </div>
                                }
                            />
                            <div className={styles.share} style={theme ? {} : { backgroundColor: "rgb(220, 220, 220)" }}>
                                {isSaved ?
                                    <span onClick={addSaved} >
                                        <i className="fa-solid fa-bookmark"></i> Remove</span>
                                    :
                                    <span onClick={addSaved} >
                                        <i className="fa-regular fa-bookmark"></i> Save
                                    </span>

                                }
                            </div>
                        </div>

                    </div>
                    <div className={styles.descript} style={theme ? {} : { backgroundColor: "rgb(220, 220, 220)" }}>
                        <b>{view} views</b> <br />
                        {videoData?.description}
                    </div>
                    <div className={styles.comment}>
                        <Comment></Comment>
                    </div>
                </div>



                <div className={styles.similarVideo}>
                    <SimilarVideos></SimilarVideos>
                </div>
            </div>

        </div>
    )

}
