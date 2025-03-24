import React from 'react'
import styles from './Player.module.css'

import { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player/youtube";
import "./Player.module.css";

function Player({ playingVideoId, playing, setPlaying }) {

    const [volume, setVolume] = useState(50)
    const [played, setPlayed] = useState(0);
    const playerRef = useRef(null);
    const [duration, setDuration] = useState(0)
    const [isfullScreen, setisfullScreen] = useState(false)
    const [bufferedTime, setBufferedTime] = useState(0);

    useEffect(() => {
        if (playingVideoId) {
            setPlaying(true)
        }
    }, [playingVideoId])

    async function togglePlayPause() {
        await setPlaying(!playing);
    }
    function handleVolume(e) {
        setVolume(e.target.value)
    }

    function stopMusic() {
        setPlaying(false);
        if (playerRef.current) {
            playerRef.current.seekTo(0);
        }
        setPlayed(0);
    }

    function handleSeekChange(e) {
        const seekTo = parseFloat(e.target.value);
        setPlayed(seekTo);
        playerRef.current.seekTo(seekTo);
    }
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

    return (
        <>
            <div className={playingVideoId ? styles.mainBox : styles.mainBox2}>
                <div className={styles.album}>
                    <div className={styles.cover}>
                        <img src={playingVideoId?.snippet.thumbnails.default.url} alt={playingVideoId?.snippet.title} height={"100%"} width={"100%"} />
                    </div>
                    <div>
                        <div className={styles.title}>
                            {playingVideoId?.snippet.title}
                        </div>
                        <div className={styles.chtitle}>
                            {playingVideoId?.snippet?.channelTitle}
                        </div>
                    </div>
                </div>
                <div className={styles.controls}>
                    <div>
                        <div className={styles.btn}><i className="fa-solid fa-shuffle"></i></div>
                        <div className={styles.btn}><i className="fa-solid fa-backward-step"></i></div>
                        <button onClick={togglePlayPause}>{!playing ? <i className="fa-solid fa-play"></i> : <i className="fa-solid fa-pause"></i>}</button>
                        <div className={styles.btn}><i className="fa-solid fa-forward-step"></i></div>
                        <div className={styles.btn}><i className="fa-solid fa-repeat"></i></div>
                    </div>
                    <div className={styles.time}>
                        {getDuration(played)}
                        <div className={styles.range}>
                            <div className={styles.totalRange}></div>
                            <div className={styles.buffRange} style={{ width: `${(bufferedTime * 100) / duration}%` }}></div>
                            {/* <div className={styles.pointRange} style={{ width: `${hoverTime !== null ? hoverTime : 0}%` }}></div> */}
                            <div className={styles.passedRange} style={{ width: `${(played * 100) / duration}%` }}></div>
                            <input type="range" name="" id="" min={0} max={duration} step={0.001} value={played} onChange={handleSeekChange} className={styles.slider} />
                        </div>
                        {getDuration(duration)}
                    </div>
                </div>
                <div className={styles.extras}>
                    <div style={{ marginTop: "2px" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 -960 960 960" width="25px" fill="#e8eaed"><path d="M640-160q-50 0-85-35t-35-85q0-50 35-85t85-35q11 0 21 1.5t19 6.5v-328h200v80H760v360q0 50-35 85t-85 35ZM120-320v-80h320v80H120Zm0-160v-80h480v80H120Zm0-160v-80h480v80H120Z" /></svg>
                    </div>
                    <div className={styles.volume}>
                        {volume === "0" ?
                            <svg xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 -960 960 960" width="25px" fill="#e8eaed"><path d="M806-56 677.67-184.33q-27 18.66-58 32.16-31 13.5-64.34 21.17v-68.67q20-6.33 38.84-13.66 18.83-7.34 35.5-19l-154.34-155V-160l-200-200h-160v-240H262L51.33-810.67 98.67-858l754.66 754L806-56Zm-26.67-232-48-48q19-33 28.17-69.67 9.17-36.66 9.17-75.33 0-100-58.34-179-58.33-79-155-102.33V-831q124 28 202 125.5t78 224.5q0 51.67-14.16 100.67-14.17 49-41.84 92.33Zm-134-134-90-90v-130q47 22 73.5 66t26.5 96q0 15-2.5 29.5t-7.5 28.5Zm-170-170-104-104 104-104v208Z" /></svg>
                            :
                            volume <= 50 ?
                                <svg xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 -960 960 960" width="25px" fill="#e8eaed"><path d="M200-360v-240h160l200-200v640L360-360H200Zm440 40v-322q45 21 72.5 65t27.5 97q0 53-27.5 96T640-320Z" /></svg>
                                :
                                <svg xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 -960 960 960" width="25px" fill="#e8eaed"><path d="M560-131v-82q90-26 145-100t55-168q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 127-78 224.5T560-131ZM120-360v-240h160l200-200v640L280-360H120Zm440 40v-322q47 22 73.5 66t26.5 96q0 51-26.5 94.5T560-320Z" /></svg>
                        }
                        <div className={styles.volumes}>
                            <div className={styles.range}>
                                <div className={styles.totalRange}></div>
                                <div className={styles.passedRange} style={{ width: `${(volume * 100) / 100}%` }}></div>
                                <input type="range" name="" id="" min={0} max={100} step={0.001} value={volume} className={styles.slider} onChange={handleVolume} />
                            </div>
                        </div>
                    </div>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" fill="#e8eaed"><path d="M120-120v-320h80v184l504-504H520v-80h320v320h-80v-184L256-200h184v80H120Z" /></svg>
                    </div>
                </div>
            </div>
            <ReactPlayer
                ref={playerRef}
                url={`https://www.youtube.com/watch?v=${playingVideoId?.id.videoId}`}
                playing={playing}
                volume={volume / 100}
                controls={false}
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                width="0"
                height="0"
                onProgress={() => setPlayed(playerRef?.current.getCurrentTime())}
                onDuration={(duration) => setDuration(duration)}
                onSeek={handleSeekChange}
            />
        </>
    );
}

export default Player;
