import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { darkTheme, lightTheme } from '../../themes'
import Share from '../Share/Share'
import Comment from '../comment/Comment'
import Navbar from '../navbar/Navbar'
import Sidenav from '../navbar/Sidenav'
import Player from '../player/Player'
import Queue from '../queue/Queue'
import SimilarVideos from '../similarVideos/SimilarVideos'
import styles from "./VideoPlay.module.css"

export default function VideoPlay() {

    const menu = useSelector((state) => state.menu.value)
    const theme = useSelector((state) => state.theme.value)
    const boxRef = useRef(null)
    const videoRef = useRef(null)
    const [isSubs, setisSubs] = useState(false)
    const [isLike, setisLike] = useState(false)
    const [isSaved, setisSaved] = useState(false)
    const [isDislike, setisDislike] = useState(false)
    const [isComment, setisComment] = useState(false)
    const [isDesc, setisDesc] = useState(false)
    const [videoData, setvideoData] = useState({})
    const [duration, setDuration] = useState(0)
    const [view, setView] = useState(0)
    const [subs, setSubs] = useState(0)
    const [like, setLike] = useState(0)
    const [dislike, setDislike] = useState(0)
    const [queue, setQueue] = useState([])
    const { id } = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchData() {
            try {
                const vidData = await axios.get(`https://video-streaming-app-backend-r6e3.onrender.com/api/videos/${id}`)
                setvideoData(() => vidData.data)
                setLike(() => vidData.data.likes)
                setDislike(() => vidData.data.dislikes)
                setView(() => vidData.data.views)
                setSubs(() => vidData.data.userId.followers)
                if(queue.length==0){
                    setQueue([vidData.data])
                }

                async function isSubscribed() {
                    try {
                        const userD = await axios.get(`https://video-streaming-app-backend-r6e3.onrender.com/api/users/issubscribe/${vidData.data.userId._id}`,
                            { withCredentials: true }
                        )
                        setisSubs(userD.data)
                    }
                    catch (err) {
                        console.log(err.message)
                    }
                }
                isSubscribed()
            }
            catch (err) {
                console.log(err.message)
                navigate("/notFound")
            }
        }
        async function isLiked() {
            try {
                const userD = await axios.get(`https://video-streaming-app-backend-r6e3.onrender.com/api/videos/isliked/${id}`,
                    { withCredentials: true }
                )
                setisLike(userD.data)
            }
            catch (err) {
                console.log(err.message)
            }
        }

        async function isDisliked() {
            try {
                const userD = await axios.get(`https://video-streaming-app-backend-r6e3.onrender.com/api/videos/isdisliked/${id}`,
                    { withCredentials: true }
                )
                setisDislike(userD.data)
            }
            catch (err) {
                console.log(err.message)
            }
        }
        async function isSaved() {
            try {
                const userD = await axios.get(`https://video-streaming-app-backend-r6e3.onrender.com/api/videos/issaved/${id}`,
                    { withCredentials: true }
                )
                setisSaved(userD.data)
            }
            catch (err) {
                console.log(err.message)
            }
        }
        fetchData()
        isLiked()
        isDisliked()
        isSaved()
    }, [id])

    function handleSubscribe() {
        async function fetchData() {
            if(videoData?.userId?._id){
                try {
                    if (isSubs) {
                        setisSubs(false)
                        setSubs(subs - 1)
                        await axios.delete(`https://video-streaming-app-backend-r6e3.onrender.com/api/users/unsubscribe/${videoData?.userId?._id}`,
                            { withCredentials: true }
                        );
                        console.log("Unsubscribe")
                    }
                    else {
                        setisSubs(true)
                        setSubs(subs + 1)
                        await axios.put(`https://video-streaming-app-backend-r6e3.onrender.com/api/users/subscribe/${videoData?.userId?._id}`,
                            {},
                            { withCredentials: true }
                        );
                        console.log("Subscribe")
                    }
                }
                catch (err) {
                    console.log(err?.response?.data)
                }
            }
        }
        fetchData()
    }

    async function handleLike() {
        try {
            if (isLike) {
                setisLike(false)
                setLike(like - 1)
                await axios.delete(`https://video-streaming-app-backend-r6e3.onrender.com/api/videos/unlike/${id}`,
                    { withCredentials: true }
                );
                console.log("unlikes")
            }
            else {
                if (isDislike === true) {
                    handleDislike()
                }
                setisLike(true)
                setLike(like + 1)
                await axios.put(`https://video-streaming-app-backend-r6e3.onrender.com/api/videos/like/${id}`,
                    {},
                    { withCredentials: true }
                );
                console.log("likes")
            }
        }
        catch (err) {
            console.log(err?.response?.data)
        }
    }
    async function handleDislike() {
        try {
            if (isDislike) {
                setisDislike(false)
                setDislike(dislike - 1)
                await axios.delete(`https://video-streaming-app-backend-r6e3.onrender.com/api/videos/undislike/${id}`,
                    { withCredentials: true }
                );
                console.log("undislikes")
            }
            else {
                if (isLike === true) {
                    handleLike()
                }
                setisDislike(true)
                setDislike(dislike + 1)
                await axios.put(`https://video-streaming-app-backend-r6e3.onrender.com/api/videos/dislike/${id}`,
                    {},
                    { withCredentials: true }
                );
                console.log("dislikes")
            }
        }
        catch (err) {
            console.log(err?.response?.data)
        }
    }
    async function addView() {
        try {
            await axios.put(`https://video-streaming-app-backend-r6e3.onrender.com/api/videos/view/${id}`)
            setView(view + 1)
        }
        catch (err) {
            console.log(err.message)
        }
    }
    async function addHistory() {
        try {
            await axios.put(`https://video-streaming-app-backend-r6e3.onrender.com/api/videos/history/${id}`,
                {},
                { withCredentials: true }
            );
        }
        catch (err) {
            console.log(err.message)
        }
    }
    function totalTime() {
        if (videoRef.current.duration) {
            setDuration(Math.floor(videoRef.current.duration) / 3)
        }
        addHistory()
    }
    useEffect(() => {
        if (duration !== 0) {
            var handlePopState = setTimeout(() => {
                addView()
                console.log("view added")
            }, duration * 1000)

            function clear() {
                clearTimeout(handlePopState)
            }
            window.addEventListener('popstate', clear);
        }
    }, [duration])


    function startDownload() {
        window.location.href = videoData.videoUrl;
    }

    async function addSaved() {
        try {
            if (isSaved) {
                setisSaved(false)
                await axios.delete(`https://video-streaming-app-backend-r6e3.onrender.com/api/videos/unsave/${id}`,
                    { withCredentials: true }
                );
                console.log("removed")
            }
            else {
                setisSaved(true)
                await axios.put(`https://video-streaming-app-backend-r6e3.onrender.com/api/videos/save/${id}`,
                    {},
                    { withCredentials: true }
                );
                console.log("saved")
            }
            // setisSaved(!isSaved)
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
                    {/* <video
                        className={styles.video}
                        src={videoData?.videoUrl}
                        autoPlay
                        controls
                        id='videos'
                        ref={videoRef}
                        onPlay={totalTime}
                        poster={videoData?.imageUrl}
                    >
                    </video> */}
                    <Player url={videoData?.videoUrl} poster={videoData?.imageUrl} videoRef={videoRef} onduration={totalTime} />
                </div>
            </div>
            <div className={styles.videoDetails} ref={boxRef}>
                <div className={styles.videoDet}>
                    <div className={styles.title}>
                        {videoData?.title}
                    </div>

                    <div className={styles.videoStatus}>
                        <div className={styles.channel}>
                            <div className={styles.channelDetail} onClick={() => navigate(`/channels/${videoData?.userId?._id}/featured`)}>
                                <div className={styles.icon}>
                                    <img src={videoData?.userId?.img} alt="" width="100%" height="100%" />
                                </div>
                                <div className={styles.channelName}>
                                    <span className={styles.name}>{videoData?.userId?.name}</span>
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
                            <div className={styles.share} style={theme ? {} : { backgroundColor: "rgb(220, 220, 220)" }} onClick={startDownload}>
                                <span>
                                    <i className="fa-solid fa-download"></i> Download
                                </span>
                            </div>
                        </div>

                    </div>
                    <div className={styles.descript} style={theme ? {} : { backgroundColor: "rgb(220, 220, 220)" }} onClick={() => !isDesc && setisDesc(true)}>
                        <div><b>{view} views</b></div>
                        {isDesc &&
                            <>
                                <div className={styles.desc}>
                                    <br />
                                    {videoData?.description ?
                                        videoData?.description?.split("\n").map((line, index, arr) =>
                                            (index===arr.length-1 ? line.trim()!=="" : true) &&
                                            <div key={index} className={styles.descLine}>{line}</div>
                                        )
                                        : "No Discription Available"}
                                </div>
                                <div className={styles.cross} onClick={() => setisDesc(false)}><i className="fa-solid fa-xmark"></i></div>
                            </>
                        }
                    </div>
                    <div className={styles.comment} onClick={() => !isComment && setisComment(true)} style={theme ? {} : { backgroundColor: "rgb(220, 220, 220)" }}>
                        {isComment ? <Comment videoId={id} toClose={setisComment}></Comment> : "Comment"}
                    </div>
                </div>
                

                <div className={styles.similarVideo}>
                    {queue.length>1 &&
                    <>
                        <Queue queue={queue} id={id}/>
                    <br />
                    </>}
                    <SimilarVideos current={id} queue={queue} setQueue={setQueue}></SimilarVideos>
                </div>
            </div>

        </div>
    )

}
