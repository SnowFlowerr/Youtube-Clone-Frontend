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

// import { useNavigate } from 'react-router-dom'

export default function VideoPlay() {

    const menu = useSelector((state) => state.menu.value)
    const theme = useSelector((state) => state.theme.value)
    const boxRef = useRef(null)
    const videoRef = useRef(null)
    const [isSubs, setisSubs] = useState(false)
    const [isLike, setisLike] = useState(false)
    const [isDislike, setisDislike] = useState(false)
    const [videoData, setvideoData] = useState({ title: "Title" })
    const [userData, setuserData] = useState({})
    const { id } = useParams();

    useEffect(() => {
        async function fetchData() {
            try {
                const vidData = await axios.get(`http://localhost:8000/api/videos/${id}`)
                const userD = await axios.get(`http://localhost:8000/api/users/${vidData.data.userId}`)
                setvideoData(vidData.data)
                setuserData(userD.data)
                if (userD.data.followedUser.indexOf('669b3f0247fef352b02613c6') !== -1) {
                    setisSubs(true)
                }
                if (vidData.data.likedUser.indexOf('669b3f0247fef352b02613c6') !== -1) {
                    setisLike(true)
                }
                if (vidData.data.dislikedUser.indexOf('669b3f0247fef352b02613c6') !== -1) {
                    setisDislike(true)
                }
            }
            catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [])
    useEffect(() => {
        async function fetchData() {
            try {
                const userD = await axios.get(`http://localhost:8000/api/users/${videoData.userId}`)
                setuserData(userD.data)
                if (userD.data.followedUser.indexOf('669b3f0247fef352b02613c6') !== -1) {
                    setisSubs(true)
                }
            }
            catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [isSubs])
    useEffect(() => {
        async function fetchData() {
            try {
                const vidData = await axios.get(`http://localhost:8000/api/videos/${id}`)
                setvideoData(vidData.data)
                if (vidData.data.likedUser.indexOf('669b3f0247fef352b02613c6') !== -1) {
                    setisLike(true)
                }
                if (vidData.data.dislikedUser.indexOf('669b3f0247fef352b02613c6') !== -1) {
                    setisDislike(true)
                }
            }
            catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [isLike, isDislike])

    useEffect(() => {
        if (menu) {
            boxRef.current.style.filter = "brightness(0.8)";
        }
        else {
            boxRef.current.style.filter = 'none'
        }
    }, [menu])
    function handleSubscribe() {
        async function fetchData() {
            try {
                if (isSubs) {
                    await axios.put(`http://localhost:8000/api/users/unsubscribe/${videoData.userId}`,
                        {},
                        { withCredentials: true }
                    );
                    console.log("Unsubscribe")
                }
                else {
                    await axios.put(`http://localhost:8000/api/users/subscribe/${videoData.userId}`,
                        {},
                        { withCredentials: true }
                    );
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
                await axios.put(`http://localhost:8000/api/videos/unlike/${id}`,
                    {},
                    { withCredentials: true }
                );
                console.log("unlikes")
            }
            else {
                await axios.put(`http://localhost:8000/api/videos/like/${id}`,
                    {},
                    { withCredentials: true }
                );
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
                await axios.put(`http://localhost:8000/api/videos/undislike/${id}`,
                    {},
                    { withCredentials: true }
                );
                console.log("undislikes")
            }
            else {
                await axios.put(`http://localhost:8000/api/videos/dislike/${id}`,
                    {},
                    { withCredentials: true }
                );
                console.log("dislikes")
            }
            setisDislike(!isDislike)
            // console.log("err?.response?.data")
        }
        catch (err) {
            console.log(err?.response?.data)
        }
        setisDislike(!isDislike)
    }
    async function play() {
        try {
            await axios.put(`http://localhost:8000/api/videos/view/${id}`)
        }
        catch (err) {
            console.log(err)
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
                        autoPlay
                        controls
                        id='videos'
                        ref={videoRef}
                        onPlay={play}
                        poster={null}>


                        <source
                            src={vid}
                            type='video/mp4'
                        />

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
                                <span className={styles.subs}>{userData?.followers} subs</span>
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
                                    {isLike ? <i className="fa-solid fa-thumbs-up"></i> : <i className="fa-regular fa-thumbs-up"></i>} {videoData?.likes}
                                </span>
                                <span className={styles.dislike} onClick={handleDislike}>
                                    {isDislike ? <i className="fa-solid fa-thumbs-down fa-flip-horizontal"></i> : <i className="fa-regular fa-thumbs-down fa-flip-horizontal"></i>} {videoData?.dislikes}
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
                        </div>

                    </div>
                    <div className={styles.descript} style={theme ? {} : { backgroundColor: "rgb(220, 220, 220)" }}>
                        <b>{videoData?.views} views</b> <br />
                        {videoData?.description}
                    </div>
                </div>






                <div className={styles.similarVideo}>
                    fefsdz <br />
                    efvfesv
                    fefsdz <br />
                    efvfesv
                    v

                    fefsdz <br />
                    efvfesv
                    fefsdz <br />
                    efvfesv

                    fefsdz <br />
                    efvfesv
                    v
                    fefsdz <br />
                    efvfesv
                    v
                    fefsdz <br />
                    efvfesv
                    fefsdz <br />
                    efvfesv

                    fefsdz <br />
                    efvfesv
                    fefsdz <br />
                    efvfesv
                    fefsdz <br />
                    efvfesv
                    v
                    fefsdz <br />
                    efvfesv
                    v
                    fefsdz <br />
                    efvfesv
                    fefsdz <br />
                    efvfesv

                    fefsdz <br />
                    efvfesv
                    fefsdz <br />
                    v
                    fefsdz <br />
                    efvfesv
                    v
                    fefsdz <br />
                    efvfesv
                    fefsdz <br />
                    efvfesv

                    fefsdz <br />
                    efvfesv
                    fefsdz <br />
                    efvfesv
                    fefsdz <br />
                    efvfesv
                    v
                    fefsdz <br />
                    efvfesv
                    v
                    fefsdz <br />
                    efvfesv
                    fefsdz <br />
                    efvfesv

                    fefsdz <br />
                    efvfesv
                    fefsdz <br />
                    efvfesv
                </div>
            </div>

        </div>
    )

}
