import React, { useRef, useEffect, useState } from 'react';
import styles from "./Shorts.module.css"
import video from "./videoplayback.mp4"
import { useSelector } from 'react-redux'
import Share from '../Share/Share';
import axios from 'axios';
export const VideoCard = ({ data, onPlay, index }) => {
    const videoRef = useRef(null);
    const theme = useSelector((state) => state.theme.value)
    const [isSubs, setisSubs] = useState(false)
    const [isLike, setisLike] = useState(false)
    const [isDislike, setisDislike] = useState(false)
    const [userData, setUserData] = useState({ name: "Title" })
    const [videoData, setvideoData] = useState({ title: "Title" })
    const sign = useSelector((state) => state.sign.value)

    useEffect(() => {
        const handlePlayStop = (entries) => {
            try {
                if (data !== "url") {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            fetchUser()
                            setvideoData(data)
                            onPlay(data?._id);  // Notify parent component that this video is playing
                            videoRef.current.currentTime = 0; // Reset video to the beginning
                            videoRef.current.play().then(() => {
                            }).catch((error) => {
                                console.error('Error trying to play video:', error);
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
            const user = await axios.get(`http://localhost:8000/api/users/${data?.userId}`)
            // console.log("user.data")
            setUserData(user.data)
            if (user.data.followedUser.indexOf(sign?.data?._id) !== -1) {
                setisSubs(true)
            }
        }
        catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const vidData = await axios.get(`http://localhost:8000/api/shorts/${data._id}`)
                setvideoData(vidData.data)
                // console.log(vidData.data)
                if (vidData.data.likedUser.indexOf(sign?.data?._id) !== -1) {
                    setisLike(true)
                }
                if (vidData.data.dislikedUser.indexOf(sign?.data?._id) !== -1) {
                    setisDislike(true)
                }
            }
            catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [isLike, isDislike, data])

    function handleSubscribe() {
        async function fetchData() {
            try {
                if (isSubs) {
                    await axios.put(`http://localhost:8000/api/users/unsubscribe/${data.userId}`,
                        {},
                        { withCredentials: true }
                    );
                    console.log("Unsubscribe")
                }
                else {
                    await axios.put(`http://localhost:8000/api/users/subscribe/${data.userId}`,
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
                await axios.put(`http://localhost:8000/api/shorts/unlike/${data._id}`,
                    {},
                    { withCredentials: true }
                );
                console.log("unlikes")
            }
            else {
                await axios.put(`http://localhost:8000/api/shorts/like/${data._id}`,
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
                await axios.put(`http://localhost:8000/api/shorts/undislike/${data._id}`,
                    {},
                    { withCredentials: true }
                );
                console.log("undislikes")
            }
            else {
                await axios.put(`http://localhost:8000/api/shorts/dislike/${data._id}`,
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
    }
    async function play() {
        try {
            await axios.put(`http://localhost:8000/api/shorts/view/${data._id}`)
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <span className={styles.span}>
                <video className={styles.video} ref={videoRef} src={video} controls />
                <div className={styles.name}>
                    <div className={styles.icon}>

                    </div>
                    <div>
                        @{userData?.username}
                    </div>
                    <div className={styles.subs} onClick={handleSubscribe} style={isSubs?{backgroundColor:"rgb(255, 255, 255, 0.2)"}:{}}>
                        {isSubs?"Unsubscribe":"Subscribe"}
                    </div>
                </div>
            </span>
            <div className={styles.details}>
                <div className={styles.first} onClick={handleLike}>
                    <div className={styles.span1} style={theme ? {} : { backgroundColor: "rgb(220, 220, 220)" }}>
                        {isLike? <span className={styles.selected}><i className="fa-solid fa-thumbs-up"></i></span>:<i className="fa-regular fa-thumbs-up"></i>}
                    </div>
                    {videoData?.likes} like
                </div>
                <div className={styles.first} onClick={handleDislike}>
                    <div className={styles.span1} style={theme ? {} : { backgroundColor: "rgb(220, 220, 220)" }}>
                        {isDislike?<span className={styles.selected}><i className="fa-solid fa-thumbs-down fa-flip-horizontal"></i></span>:<i className="fa-regular fa-thumbs-down fa-flip-horizontal"></i>}
                    </div>
                    {videoData?.dislikes} Dislike
                </div>
                <div className={styles.first}>
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
                    </div>
                </div>
            </div>
        </>
    )
};