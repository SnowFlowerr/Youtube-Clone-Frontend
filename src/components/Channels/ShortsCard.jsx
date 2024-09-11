import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { format } from 'timeago.js'
import { darkTheme, lightTheme } from '../../themes'
import styles from "./ShortsCard.module.css"

export default function ShortsCard({video , index, seteditingData, setisEditing, setisShorts}) {
    const theme = useSelector((state) => state.theme.value)
    const [user, setUser] = useState("")
    const videoRef = useRef()
    const [isPlaying, setIsPlaying] = useState(false);
    const [time, setTime] = useState(false);
    const navigate = useNavigate()
    const {id}=useParams()
    const sign = useSelector((state) => state.sign?.value)


    function getDuration(duration) {
        duration = Math.floor(duration)
        let sec = Math.floor(duration % 60)
        let min = Math.floor((duration % 3600) / 60)
        let hr = Math.floor(duration / 3600)
        sec = sec <= 9 ? "0" + sec : sec
        min = min <= 9 ? "0" + min : min
        if (hr) {
            return hr + ":" + min + ":" + sec
        }
        else if (min) {
            return min + ":" + sec
        }
        else {
            return min + ":" + sec
        }
    }

    const [isMute, setisMute] = useState(true);

    function handlePlay() {
        setTime(() => 0);

        // timeout = setTimeout(() => {
        // setIsPlaying(() => true);
        if (videoRef.current) {
            videoRef.current
                .play()
                .then(() => {
                    // videoRef.current.muted = false;
                    console.log("wcabw")
                })
                .catch((err) => console.log(err));
        }
        // }, 500);

    }
    function handleStop() {
        // setIsPlaying(() => false);
        if (videoRef.current) {
            // videoRef.current.currentTime=0
            // videoRef.current.pause()
            videoRef.current.load()
        }
        setTime(() => 0);
        setisMute(() => true);
        // clearTimeout(timeout);
    }
    function handleVolume() {
        setisMute(!isMute)
    }
    useEffect(()=>{
        if (videoRef.current) {
            videoRef.current.muted=isMute
        }
    },[isMute])
    

    return (
        <>
            <div className={index===5?styles.singleVid2:index===4?styles.singleVid3:index===3?styles.singleVid4:index===2?styles.singleVid5:styles.singleVid} style={theme ? darkTheme : lightTheme}  onMouseLeave={handleStop}>
                {/* {!isPlaying ? */}
                <div className={styles.videoCont}>
                    <div
                        className={styles.thumbnail}
                    // onMouseOver={handlePlay}
                    // onMouseOut={handleStop}
                    >
                        <Link to={`/shorts/${video?._id}`}>
                            <img src={video.imageUrl} width="100%" alt="thumbnail" />
                        </Link>
                        <div className={styles.duration}>
                            {getDuration(video?.duration)}
                        </div>
                    </div>
                    {/* {isPlaying && */}
                    <div
                        className={
                            styles.thumbnail2
                        }
                        
                    // onMouseOver={handlePlay}
                    // onMouseOut={handleStop}
                    >
                        <video
                            src={video.videoUrl}
                            width="100%"
                            poster={video.imageUrl}
                            ref={videoRef}
                            onTimeUpdate={() => setTime(videoRef.current?.currentTime)}
                            muted
                            onClick={() => {
                                handleStop();
                                navigate(`/shorts/${video?._id}`);
                            }}
                        ></video>
                        <div className={styles.duration}>
                            {getDuration((time && video?.duration - time) || video?.duration)}
                        </div>
                        <div className={styles.volume} onClick={handleVolume}>
                        {isMute ?
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M792-56 671-177q-25 16-53 27.5T560-131v-82q14-5 27.5-10t25.5-12L480-368v208L280-360H120v-240h128L56-792l56-56 736 736-56 56Zm-8-232-58-58q17-31 25.5-65t8.5-70q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 53-14.5 102T784-288ZM650-422l-90-90v-130q47 22 73.5 66t26.5 96q0 15-2.5 29.5T650-422ZM480-592 376-696l104-104v208Zm-80 238v-94l-72-72H200v80h114l86 86Zm-36-130Z"/></svg>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M560-131v-82q90-26 145-100t55-168q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 127-78 224.5T560-131ZM120-360v-240h160l200-200v640L280-360H120Zm440 40v-322q47 22 73.5 66t26.5 96q0 51-26.5 94.5T560-320ZM400-606l-86 86H200v80h114l86 86v-252ZM300-480Z"/></svg>
                            
                        }
                        </div>
                        {Math.floor(time) !== 0 && (
                            <div
                                className={styles.range}
                                style={{
                                    width: `${(time * 100) / videoRef.current?.duration}%`,
                                }}
                            ></div>
                        )}
                    </div>
                </div>
                <div className={styles.mouseBtn} onMouseEnter={handlePlay} onClick={() => {
                            handleStop();
                            navigate(`/shorts/${video?._id}`);
                        }}>
                        </div>
                        <div className={styles.touchBtn} onTouchStart={handlePlay} onTouchEnd={handleStop} onClick={() => { handleStop(); navigate(`/shorts/${video?._id}`); }}>
                </div>
                {/* } */}
                <div className={styles.videoDetail} style={theme ? darkTheme : lightTheme}>
                    
                    {/* <div className={styles.icon}>
                        <a href="/userDetail/userid">
                            <img src={user?.img} width="100%" height="100%" alt="icon" />
                        </a>
                    </div> */}
                    {/* {JSON.stringify(isPlaying)} */}
                    <div className={styles.details}>
                        <Link to={`/shorts/${video?._id}`} style={theme ? { color: "white" } : { color: "black" }}>
                            <div className={styles.title}>
                                {video?.title}
                            </div>
                            <div className={styles.channel}>
                                {/* <div className={styles.channelNames}>
                                    {user?.name}
                                </div> */}
                                <div>
                                    {video?.views} Views . {format(video.createdAt)}
                                </div>
                            </div>
                        </Link>
                        {id===sign._id &&
                            <div className={styles.extraOp} style={theme?{backgroundColor:"black"}:{backgroundColor:"white"}} onClick={()=>{seteditingData(video);setisEditing(true);setisShorts(true)}}>
                            <i className="fa-solid fa-pen-to-square"></i>
                        </div>}
                    </div>
                </div>
                
                <div className={styles.volume} onClick={handleVolume}>
                    {isMute ?
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M792-56 671-177q-25 16-53 27.5T560-131v-82q14-5 27.5-10t25.5-12L480-368v208L280-360H120v-240h128L56-792l56-56 736 736-56 56Zm-8-232-58-58q17-31 25.5-65t8.5-70q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 53-14.5 102T784-288ZM650-422l-90-90v-130q47 22 73.5 66t26.5 96q0 15-2.5 29.5T650-422ZM480-592 376-696l104-104v208Zm-80 238v-94l-72-72H200v80h114l86 86Zm-36-130Z" /></svg>
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M560-131v-82q90-26 145-100t55-168q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 127-78 224.5T560-131ZM120-360v-240h160l200-200v640L280-360H120Zm440 40v-322q47 22 73.5 66t26.5 96q0 51-26.5 94.5T560-320ZM400-606l-86 86H200v80h114l86 86v-252ZM300-480Z" /></svg>
                    }
                </div>
            </div>
        </>
    )
}
