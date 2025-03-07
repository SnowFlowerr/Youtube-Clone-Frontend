import React from 'react'
import styles from './Player.module.css'

import { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player/youtube";
import "./Player.module.css";

function Player({ playingVideoId, playing, setPlaying }) {
    
    const [volume, setVolume] = useState(0.5);
    const [played, setPlayed] = useState(0);
    const playerRef = useRef(null);
    const [duration, setDuration] = useState(0)
    const [isfullScreen, setisfullScreen] = useState(false)
    const [bufferedTime, setBufferedTime] = useState(0);

    useEffect(() => {
        if(playingVideoId){
            setPlaying(true)
        }
    }, [playingVideoId])

    async function togglePlayPause() {
        await setPlaying(!playing);
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

    return (
        <>
            <div className={playingVideoId?styles.mainBox:styles.mainBox2}>
                <div className={styles.album}>
                    <div className={styles.cover}>
                        <img src={playingVideoId?.snippet.thumbnails.default.url} alt={playingVideoId?.snippet.title} height={"100%"} width={"100%"} />
                    </div>
                    <div className={styles.title}>
                        {playingVideoId?.snippet.title}
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
                    <div className={styles.range}>
                        <div className={styles.totalRange}></div>
                        <div className={styles.buffRange} style={{ width: `${(bufferedTime * 100) / duration}%` }}></div>
                        {/* <div className={styles.pointRange} style={{ width: `${hoverTime !== null ? hoverTime : 0}%` }}></div> */}
                        <div className={styles.passedRange} style={{ width: `${(played * 100) / duration}%` }}></div>
                        <input type="range" name="" id="" min={0} max={duration} step={0.001} value={played} onChange={handleSeekChange} className={styles.slider} />
                    </div>
                </div>
                <div className={styles.extras}>
                    <div>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M640-160q-50 0-85-35t-35-85q0-50 35-85t85-35q11 0 21 1.5t19 6.5v-328h200v80H760v360q0 50-35 85t-85 35ZM120-320v-80h320v80H120Zm0-160v-80h480v80H120Zm0-160v-80h480v80H120Z"/></svg>
                    </div>
                    <div>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M560-131v-82q90-26 145-100t55-168q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 127-78 224.5T560-131ZM120-360v-240h160l200-200v640L280-360H120Zm440 40v-322q47 22 73.5 66t26.5 96q0 51-26.5 94.5T560-320ZM400-606l-86 86H200v80h114l86 86v-252ZM300-480Z"/></svg>
                    </div>
                    <div>
                        <input type="range" min={0} max={100}/>
                    </div>
                    <div>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm0-80h640v-480H160v480Zm0 0v-480 480Zm280-40h320v-240H440v240Zm80-80v-80h160v80H520Z"/></svg>
                    </div>
                    <div>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M120-120v-320h80v184l504-504H520v-80h320v320h-80v-184L256-200h184v80H120Z"/></svg>
                    </div>
                </div>
            </div>
            <ReactPlayer
                ref={playerRef}
                url={`https://www.youtube.com/watch?v=${playingVideoId?.id.videoId}`}
                playing={playing}
                volume={volume}
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
