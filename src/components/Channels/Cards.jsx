import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { format } from "timeago.js";
import { darkTheme, lightTheme } from "../../themes";
import styles from "./Cards.module.css";

export default function Cards({ video }) {
    const theme = useSelector((state) => state.theme.value);
    const [user, setUser] = useState("");
    const videoRef = useRef();
    const [isPlaying, setIsPlaying] = useState(false);
    const [time, setTime] = useState(false);
    const navigate = useNavigate();

    function getDuration(duration) {
        duration = Math.floor(duration);
        let sec = Math.floor(duration % 60);
        let min = Math.floor((duration % 3600) / 60);
        let hr = Math.floor(duration / 3600);
        sec = sec <= 9 ? "0" + sec : sec;
        min = min <= 9 ? "0" + min : min;
        if (hr) {
            return hr + ":" + min + ":" + sec;
        } else if (min) {
            return min + ":" + sec;
        } else {
            return min + ":" + sec;
        }
    }

    let timeout;

    function handlePlay() {
        setTime(() => 0);
        timeout = setTimeout(() => {
            setIsPlaying(() => true);
            if (videoRef.current) {
                videoRef.current
                    .play()
                    .then(() => {
                        videoRef.current.muted = false;
                    })
                    .catch((err) => console.log(err));
            }
        }, 1000);
        // return clearTimeout(timeout)
    }
    function handleStop() {
        // if (videoRef.current) {
        //     videoRef.current.pause()
        // }
        setTime(() => 0);
        clearTimeout(timeout);
        setIsPlaying(() => false);
    }

    return (
        <>
            <div
                className={styles.singleVid}
                style={theme ? darkTheme : lightTheme}
                onMouseOut={handleStop}
            >
                {!isPlaying ? (
                    <div
                        className={styles.thumbnail}
                        onMouseOver={handlePlay}
                        onMouseOut={handleStop}
                    >
                        <Link to={`/player/${video?._id}`}>
                            <img src={video.imageUrl} width="100%" alt="thumbnail" />
                        </Link>
                        <div className={styles.duration}>
                            {getDuration(video?.duration)}
                        </div>
                    </div>
                ) : (
                    <div
                        className={
                            Math.floor(time) !== 0 ? styles.thumbnail2 : styles.thumbnail
                        }
                        onClick={() => {
                            handleStop();
                            navigate(`/player/${video?._id}`);
                        }}
                        onMouseOver={handlePlay}
                        onMouseOut={handleStop}
                    >
                        <video
                            src={video.videoUrl}
                            width="100%"
                            poster={video.imageUrl}
                            ref={videoRef}
                            onTimeUpdate={() => setTime(videoRef.current?.currentTime)}
                            muted
                        ></video>
                        <div className={styles.duration}>
                            {getDuration((time && video?.duration - time) || video?.duration)}
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
                )}
                <div
                    className={styles.videoDetail}
                    style={theme ? darkTheme : lightTheme}
                >
                    {/* <div className={styles.icon}>
                        <a href={`/channels/${video.userId}/featured`}>
                            <img src={user?.img} width="100%" height="100%" alt="icon" />
                        </a>
                    </div> */}
                    {/* {JSON.stringify(isPlaying)} */}
                    <div className={styles.details}>
                        <Link
                            to={`/player/${video?._id}`}
                            style={theme ? { color: "white" } : { color: "black" }}
                        >
                            <div className={styles.title}>{video?.title}</div>
                            <div className={styles.channel}>
                                <div className={styles.channelNames}>{user?.name}</div>
                                <div>
                                    {video?.views} Views . {format(video.createdAt)}
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
