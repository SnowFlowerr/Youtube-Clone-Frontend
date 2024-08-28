import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Comment from '../comment/Comment';
import Share from '../Share/Share';
import styles from "./Shorts.module.css";

export const VideoCard = ({ data, onPlay, index }) => {
    const videoRef = useRef(null);
    const theme = useSelector((state) => state.theme.value)
    const [isSubs, setisSubs] = useState(false)
    const [isLike, setisLike] = useState(false)
    const [isDislike, setisDislike] = useState(false)
    const [isSaved, setisSaved] = useState(false)
    const [isComment, setisComment] = useState(false)
    const [userData, setUserData] = useState({ name: "Title" })
    // const [currentUser, setCurrentUser] = useState({ name: "Title" })
    // const [videoData, setvideoData] = useState({ title: "Title" })
    const [view, setView] = useState(0)
    const [subs, setSubs] = useState(0)
    const [like, setLike] = useState(0)
    const [dislike, setDislike] = useState(0)
    const sign = useSelector((state) => state.sign.value)

    useEffect(() => {
        const handlePlayStop = (entries) => {
            try {
                if (data !== "url") {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            fetchUser()
                            fetchVideo()
                            fetchData()
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
            const user = await axios.get(`https://honest-stillness-production.up.railway.app/api/users/get/${data?.userId}`)
            setUserData(user.data)
            setSubs(user.data.followers)

        }
        catch (err) {
            console.log(err.message)
        }
    }
    async function fetchVideo() {
        try {
            const video = await axios.get(`https://honest-stillness-production.up.railway.app/api/shorts/${data?._id}`)
            setView(video.data.views)
            setLike(video.data.likes)
            setDislike(video.data.dislikes)
        }
        catch (err) {
            console.log(err.message)
        }
    }
    async function fetchData() {
        try {
            const userD = await axios.get(`https://honest-stillness-production.up.railway.app/api/users/issubscribe/${data.userId}`,
                { withCredentials: true }
            )
            setisSubs(userD.data)
        }
        catch (err) {
            console.log(err.message)
        }
        
        try {
            const userD = await axios.get(`https://honest-stillness-production.up.railway.app/api/users/islikedshorts/${data?._id}`,
                { withCredentials: true }
            )
            setisLike(userD.data)
        }
        catch (err) {
            console.log(err.message)
        }
        try {
            const userD = await axios.get(`https://honest-stillness-production.up.railway.app/api/users/isdislikedshorts/${data?._id}`,
                { withCredentials: true }
            )
            setisDislike(userD.data)
        }
        catch (err) {
            console.log(err.message)
        }
        try {
            const userD = await axios.get(`https://honest-stillness-production.up.railway.app/api/users/issavedshorts/${data?._id}`,
                { withCredentials: true }
            )
            setisSaved(userD.data)
        }
        catch (err) {
            console.log(err.message)
        }
    }

    function handleSubscribe() {
        async function fetchData() {
            try {
                if (isSubs) {
                    await axios.put(`https://honest-stillness-production.up.railway.app/api/users/unsubscribe/${data?.userId}`,
                        {},
                        { withCredentials: true }
                    );
                    setSubs(subs - 1)
                    console.log("Unsubscribe")
                }
                else {
                    await axios.put(`https://honest-stillness-production.up.railway.app/api/users/subscribe/${data?.userId}`,
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
        try {
            if (isLike) {
                await axios.put(`https://honest-stillness-production.up.railway.app/api/shorts/unlike/${data._id}`,
                    {},
                    { withCredentials: true }
                );
                setLike(like - 1)
                console.log("unlikes")
            }
            else {
                await axios.put(`https://honest-stillness-production.up.railway.app/api/shorts/like/${data._id}`,
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
                await axios.put(`https://honest-stillness-production.up.railway.app/api/shorts/undislike/${data._id}`,
                    {},
                    { withCredentials: true }
                );
                setDislike(dislike - 1)
                console.log("undislikes")
            }
            else {
                await axios.put(`https://honest-stillness-production.up.railway.app/api/shorts/dislike/${data._id}`,
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
    async function handleViews() {
        try {
            await axios.put(`https://honest-stillness-production.up.railway.app/api/shorts/view/${data._id}`)
            setView(view + 1)
            console.log("View added")
        }
        catch (err) {
            console.log(err.message)
        }
    }
    async function addHistory() {
        
        try {
            await axios.put(`https://honest-stillness-production.up.railway.app/api/users/shortshistory/${data?._id}`,
                {},
                { withCredentials: true }
            );
            console.log("added to history")
        }
        catch (err) {
            console.log(err.message)
        }
    }

    return (
        <>
            <span className={styles.span}>
                <video className={styles.video} ref={videoRef} src={data?.videoUrl} onPlay={()=>addHistory()} controls onEnded={handleViews} />
                
                <div className={styles.name}>
                    <div className={styles.icon}>
                        <img src={userData?.img} width="100%" height="100%" alt="icon" />
                    </div>
                    <div className={styles.username}>
                        @{userData?.username}
                    </div>
                    <div className={styles.subs} onClick={handleSubscribe} style={isSubs ? { backgroundColor: "rgb(255, 255, 255, 0.2)" } : {}}>
                        {isSubs ? "Unsubscribe" : "Subscribe"}
                    </div>
                </div>
            </span>
                <div className={isComment?styles.comments2:styles.comments}>
                    <Comment></Comment>
                    <div className={styles.cross} onClick={() => setisComment(false)}><i className="fa-solid fa-xmark"></i></div>
                </div>
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
                <div className={styles.first} onClick={()=>setisComment(!isComment)}>
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
                <div>
                    <div className={styles.span2} style={theme ? {} : { backgroundColor: "rgb(220, 220, 220)" }}>
                        <div className={styles.channelIcon}>
                            <img src={userData?.img} alt="ChannelIcon" height="100%" width="100%"/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};