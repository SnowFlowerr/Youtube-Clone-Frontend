import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Comment from '../comment/Comment';
import Share from '../Share/Share';
import styles from "./Shorts.module.css";

export const VideoCard = ({ data, onPlay, index, length, noMore }) => {
    const videoRef = useRef(null);
    const theme = useSelector((state) => state.theme.value)
    const [isSubs, setisSubs] = useState(false)
    const [isLike, setisLike] = useState(false)
    const [isDislike, setisDislike] = useState(false)
    const [isSaved, setisSaved] = useState(false)
    const [isComment, setisComment] = useState(false)
    const [hist, setHist] = useState(true)
    const [userData, setUserData] = useState({ username: "username here" })
    const [view, setView] = useState(0)
    const [subs, setSubs] = useState(0)
    const [like, setLike] = useState(0)
    const [dislike, setDislike] = useState(0)
    const navigate=useNavigate()

    useEffect(() => {
        const handlePlayStop = (entries) => {
            try {
                if (data !== "url") {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            fetchUser()
                            setView(data.views)
                            setLike(data.likes)
                            setDislike(data.dislikes)
                            isSubscribedfun()
                            isLikedfun()
                            isDislikedfun()
                            isSavedfun()
                            addHistory()
                            // setvideoData(data)
                            onPlay(data?._id);
                            videoRef.current.currentTime = 0; // Reset video to the beginning
                            videoRef.current.play().then(() => {
                            }).catch((error) => {
                                console.error('Error trying to play video:', error.message);
                            });
                        } else {
                            if (videoRef.current === null) {
                                return
                            }
                            videoRef.current.pause();
                            videoRef.current.currentTime = 0; // Stop video and reset to the beginning
                        }
                    });
                }
            }
            catch (err) {
                console.log(err.message)
            }
        };


        const observer = new IntersectionObserver(handlePlayStop, { threshold: 0.5 });

        if (videoRef.current) {
            observer.observe(videoRef.current);
        }

        return () => {
            if (videoRef.current) {
                observer.unobserve(videoRef.current);
            }
        };
    }, [data, onPlay]);

    async function fetchUser() {
        try {
            const user = await axios.get(`https://video-streaming-app-backend-r6e3.onrender.com/api/users/get/${data?.userId}`)
            setUserData(user.data)
            setSubs(user.data.followers)

        }
        catch (err) {
            console.log(err.message)
        }
    }

    async function isSubscribedfun() {
        if (data?.userId) {
            try {
                const userD = await axios.get(`https://video-streaming-app-backend-r6e3.onrender.com/api/users/issubscribe/${data.userId}`,
                    { withCredentials: true }
                )
                setisSubs(userD.data)
            }
            catch (err) {
                console.log(err.message)
            }
        }
    }
    async function isSavedfun() {
        if (data?._id) {
            try {
                const userD = await axios.get(`https://video-streaming-app-backend-r6e3.onrender.com/api/shorts/issaved/${data?._id}`,
                    { withCredentials: true }
                )
                setisSaved(userD.data)
            }
            catch (err) {
                console.log(err.message)
            }
        }
    }
    async function isLikedfun() {
        if (data?._id) {
            try {
                const userD = await axios.get(`https://video-streaming-app-backend-r6e3.onrender.com/api/shorts/isliked/${data?._id}`,
                    { withCredentials: true }
                )
                setisLike(userD.data)
                console.log(userD.data)
            }
            catch (err) {
                console.log(err.message)
            }
        }

    }
    async function isDislikedfun() {
        if (data?._id) {
            try {
                const userD = await axios.get(`https://video-streaming-app-backend-r6e3.onrender.com/api/shorts/isdisliked/${data?._id}`,
                    { withCredentials: true }
                )
                setisDislike(userD.data)
            }
            catch (err) {
                console.log(err.message)
            }
        }
    }

    async function handleSubscribe() {
            if (data?.userId) {
                try {
                    if (isSubs) {
                        setisSubs(false)
                        setSubs(subs - 1)
                        await axios.delete(`https://video-streaming-app-backend-r6e3.onrender.com/api/users/unsubscribe/${data?.userId}`,
                            
                            { withCredentials: true }
                        );
                        console.log("Unsubscribe")
                    }
                    else {
                        setisSubs(true)
                        setSubs(subs + 1)
                        await axios.put(`https://video-streaming-app-backend-r6e3.onrender.com/api/users/subscribe/${data?.userId}`,
                            {},
                            { withCredentials: true }
                        );
                        console.log("Subscribe")
                    }
                    // setisSubs(!isSubs)
                    // console.log("err?.response?.data")
                }
                catch (err) {
                    console.log(err?.response?.data)
                }
            }
    }
    async function handleLike() {
        if (data._id) {
            try {
                if (isLike) {
                    setisLike(false)
                    setLike(like - 1)
                    await axios.delete(`https://video-streaming-app-backend-r6e3.onrender.com/api/shorts/unlike/${data._id}`,
                        
                        { withCredentials: true }
                    );
                    console.log("unlikes")
                }
                else {
                    if (isDislike === true) {
                        handleDislike()
                    }
                    setLike(like + 1)
                    setisLike(true)
                    await axios.put(`https://video-streaming-app-backend-r6e3.onrender.com/api/shorts/like/${data._id}`,
                        {},
                        { withCredentials: true }
                    );
                    console.log("likes")
                }
                // setisLike(!isLike)
                // console.log("err?.response?.data")
            }
            catch (err) {
                console.log(err?.response?.data)
            }
        }
    }
    async function handleDislike() {
        if (data._id) {
            try {
                if (isDislike) {
                    setDislike(dislike - 1)
                    setisDislike(false)
                    await axios.delete(`https://video-streaming-app-backend-r6e3.onrender.com/api/shorts/undislike/${data._id}`,
                        
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
                    await axios.put(`https://video-streaming-app-backend-r6e3.onrender.com/api/shorts/dislike/${data._id}`,
                        {},
                        { withCredentials: true }
                    );
                    console.log("dislikes")
                }
                // setisDislike(!isDislike)
                // console.log("err?.response?.data")
            }
            catch (err) {
                console.log(err?.response?.data)
            }
        }
    }
    async function handleViews() {
        try {
            await axios.put(`https://video-streaming-app-backend-r6e3.onrender.com/api/shorts/view/${data._id}`)
            setView(view + 1)
            console.log("View added")
        }
        catch (err) {
            console.log(err.message)
        }
    }
    async function addHistory() {
        if (data._id && hist) {
            setHist(()=>false)
            try {
                await axios.put(`https://video-streaming-app-backend-r6e3.onrender.com/api/shorts/history/${data._id}`,
                    {},
                    { withCredentials: true }
                );
                console.log("added to history")
            }
            catch (err) {
                console.log(err.message)
            }
        }
        
    }
    async function addSaved() {
        if (data._id) {
            try {
                if (isSaved) {
                    setisSaved(false)
                    await axios.delete(`https://video-streaming-app-backend-r6e3.onrender.com/api/shorts/unsave/${data?._id}`,
                        
                        { withCredentials: true }
                    );
                    console.log("removed")
                }
                else {
                    setisSaved(true)
                    await axios.put(`https://video-streaming-app-backend-r6e3.onrender.com/api/shorts/save/${data?._id}`,
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
    }

    return (
        <>
            <span className={styles.span}>
                <video className={styles.video} ref={videoRef} src={data?.videoUrl} controls onEnded={handleViews} />

                {index === length ?
                    <div className={styles.loading}>
                        {noMore ?
                            <div>
                                No more Shorts is Available
                            </div>
                            :
                            <div className={styles.loadingBar} style={theme ? {} : { borderColor: "black" }}>
                            </div>
                        }
                    </div>
                    :
                    <div className={styles.shortsDet}>
                        <div className={styles.name}>
                            <div className={styles.icon} onClick={()=>navigate(`/channels/${userData._id}/featured`)}>
                                <img src={userData?.img} width="100%" height="100%" alt="icon" />
                            </div>
                            <div className={styles.username} onClick={()=>navigate(`/channels/${userData._id}/featured`)}>
                                @{userData?.username}
                            </div>
                            <div className={styles.subs} onClick={handleSubscribe} style={isSubs ? { backgroundColor: "rgb(255, 255, 255, 0.2)" } : {color:"black"}}>
                                {isSubs ? "Unsubscribe" : "Subscribe"}
                            </div>
                        </div>
                        <div className={styles.shortsTitle} onClick={()=>navigate(`/channels/${userData._id}/featured`)}>
                            {data?.title}
                        </div>
                    </div>
                }
            </span>
            {index !== length &&
                <div className={isComment ? styles.comments2 : styles.comments} style={theme ? {} : { backgroundColor: "rgb(220, 220, 220)" }}>
                    {isComment && <Comment videoId={data?._id} isshorts={true} toClose={setisComment}></Comment>}
                </div>
            }

            <div className={styles.details}>
                <div className={styles.first} onClick={handleLike}>
                    <div className={styles.span1} style={theme ? {} : { backgroundColor: "rgb(220, 220, 220)" }}>
                        {isLike ? <span className={styles.selected}><i className="fa-solid fa-thumbs-up"></i></span> : <i className="fa-regular fa-thumbs-up"></i>}
                    </div>
                    {like} like
                </div>
                <div className={styles.first} onClick={handleDislike}>
                    <div className={styles.span1} style={theme ? {} : { backgroundColor: "rgb(220, 220, 220)" }}>
                        {isDislike ? <span className={styles.selected}><i className="fa-solid fa-thumbs-down fa-flip-horizontal"></i></span> : <i className="fa-regular fa-thumbs-down fa-flip-horizontal"></i>}
                    </div>
                    {dislike} Dislike
                </div>
                <div className={styles.first} onClick={() => setisComment(!isComment)}>
                    <div className={styles.span1} style={theme ? {} : { backgroundColor: "rgb(220, 220, 220)" }}>
                        <i className="fa-solid fa-comment"></i>
                    </div>
                    Comment
                </div>
                <Share
                    text={data?.title}
                    title={data?.title}
                    url={window.location.href}
                    share={<div className={styles.first}>
                        <div className={styles.span1} style={theme ? {} : { backgroundColor: "rgb(220, 220, 220)" }}>
                            <i className="fa-solid fa-share"></i>
                        </div>
                        Share
                    </div>}
                />
                <div className={styles.first} onClick={addSaved}>
                    <div className={styles.span1} style={theme ? {} : { backgroundColor: "rgb(220, 220, 220)" }}>
                        {isSaved ? <i className="fa-solid fa-bookmark"></i> : <i className="fa-regular fa-bookmark"></i>}
                    </div>
                    {isSaved ? "Remove" : "Save"}
                </div>
                <div>
                    <div className={styles.span2} style={theme ? {} : { backgroundColor: "rgb(220, 220, 220)" }} onClick={()=>navigate(`/channels/${userData._id}/featured`)}>
                        <div className={styles.channelIcon}>
                            {index !== length &&
                                <img src={userData?.img} alt="ChannelIcon" height="100%" width="100%" />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};