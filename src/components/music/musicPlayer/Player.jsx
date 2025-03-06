import React from 'react'
import styles from './Player.module.css'

import { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player/youtube";
import "./Player.module.css";

function Player({ playingVideoId }) {
    const [playing, setPlaying] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [played, setPlayed] = useState(0);
    const playerRef = useRef(null);
    const [duration, setDuration] = useState(0)
    const [isfullScreen, setisfullScreen] = useState(false)
    const [bufferedTime, setBufferedTime] = useState(0);

    useEffect(() => {
        setPlaying(true)
    }, [playingVideoId])

    function togglePlayPause() {
        setPlaying(!playing);
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
            <div className={styles.mainBox}>
                <div className={styles.album}>
                    <div className={styles.cover}>
                        <img src="https://i.ytimg.com/vi/6JYIGclVQdw/hqdefault.jpg" alt="" height={"100%"} width={"100%"} />
                    </div>
                    <div>
                        rfghjkl
                    </div>
                </div>
                <div className={styles.controls}>
                    <div>
                        <div className={styles.btn}><i class="fa-solid fa-shuffle"></i></div>
                        <div className={styles.btn}><i class="fa-solid fa-backward-step"></i></div>
                        <button onClick={togglePlayPause}>{playing ? <i class="fa-solid fa-play"></i> : <i class="fa-solid fa-pause"></i>}</button>
                        <div className={styles.btn}><i class="fa-solid fa-forward-step"></i></div>
                        <div className={styles.btn}><i class="fa-solid fa-repeat"></i></div>
                    </div>
                    <div className={styles.range}>
                        <div className={styles.totalRange}></div>
                        <div className={styles.buffRange} style={{ width: `${(bufferedTime * 100) / duration}%` }}></div>
                        {/* <div className={styles.pointRange} style={{ width: `${hoverTime !== null ? hoverTime : 0}%` }}></div> */}
                        <div className={styles.passedRange} style={{ width: `${(played * 100) / duration}%` }}></div>
                        <input type="range" name="" id="" min={0} max={duration} step={0.001} value={played} onChange={handleSeekChange} className={styles.slider} />
                    </div>
                </div>
                <div className={styles.extras}></div>
            </div>
            <ReactPlayer
                ref={playerRef}
                url={`https://www.youtube.com/watch?v=${playingVideoId}`}
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
