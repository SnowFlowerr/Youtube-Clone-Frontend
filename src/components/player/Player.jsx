import React, { useEffect, useRef, useState } from 'react'
import styles from './Player.module.css'

export default function Player({ url, poster, videoRef, onduration }) {
    const [range, setRange] = useState(0)
    const [volume, setVolume] = useState(100)
    const [duration, setDuration] = useState(0)
    const [isplaying, setisplaying] = useState(true)
    const [isfullScreen, setisfullScreen] = useState(false)
    const [ispip, setispip] = useState(false)
    const [controls, setControls] = useState(false)
    const [bufferedTime, setBufferedTime] = useState(0);
    // const [pointTime, setpointTime] = useState(0);
    const progressBarRef = useRef(null);
    const [hoverTime, setHoverTime] = useState(null);
    const [tooltipPosition, setTooltipPosition] = useState(0);
    // const videoRef = useRef(null)
    const playerRef = useRef(null)

    function handleRange(e) {
        setRange(e.target.value)
        if (videoRef.current) {
            videoRef.current.currentTime = e.target.value
        }
    }
    useEffect(() => {
        document.addEventListener('fullscreenchange', (event) => {
            setisfullScreen(!isfullScreen)
        })
    }, [isfullScreen])


    // useEffect(() => {
    //     document.addEventListener('enterpictureinpicture', (event) => {
    //         setispip(!ispip)
    //     })
    // }, [ispip])



    const handleProgress = () => {
        const video = videoRef.current;
        if (video) {
            const buffered = video.buffered;
            if (buffered.length > 0) {

                setBufferedTime(buffered.end(buffered.length - 1));
            }
        }
    };

    function getDuration(duration) {
        duration = Math.floor(duration - 0);
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
    function handleVolume(e) {
        setVolume(e.target.value)
        if (videoRef.current) {
            videoRef.current.volume = (e.target.value) / 100
        }
    }
    function handlePlay() {
        if (videoRef.current && isplaying) {
            videoRef.current.play().then(() => console.log("play")).catch((err) => console.log("err"))
        }
        else if (videoRef.current && !isplaying) {
            videoRef.current.pause()
            setControls(false)
        }
        setisplaying(!isplaying)
    }
    function handleEnter() {
        setControls(() => false)
        if (playerRef.current) {
            playerRef.current.style.cursor = 'auto';
        }
        // if (!isplaying) {
        //     setTimeout(() => {
        //         setControls(true)
        //     }, 500)
        // }
    }
    var aaa;
    useEffect(() => {
        const debounce = (callback, wait) => {
            let timeoutId = null;
            return (...args) => {
                window.clearTimeout(timeoutId);
                timeoutId = window.setTimeout(() => {
                    callback(args);
                }, wait);
            }
        }
        aaa=videoRef.current.addEventListener(
            "mousemove",
            debounce(() => {
                setControls(true)
                if (videoRef.current) {
                    playerRef.current.style.cursor = 'none';
                    setHoverTime(null)
                }
            }, /* Wait */ 1500 /* ms */)
        );
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setControls(true)
        }, 2000);
        handlePlay()
    }, [])
    function handleLeave() {
        if (!isplaying) {
            setTimeout(() => {
                setControls(true)
            }, 1000)
        }
        else {
            setTimeout(() => {
                setControls(false)
            }, 1000)
        }
    }
    function onControls(){
        setControls(()=>false)
        setTimeout(() => {
            setControls(false)
        }, 1500)
    }


    async function handleFullScreen() {
        // setisfullScreen(!isfullScreen)

        try {
            if (!isfullScreen) {
                // playerRef.current.requestFullscreen()
                if (playerRef.current.requestFullscreen) {
                    playerRef.current.requestFullscreen();
                } else if (playerRef.current.webkitRequestFullscreen) { /* Safari */
                    playerRef.current.webkitRequestFullscreen();
                } else if (playerRef.current.msRequestFullscreen) { /* IE11 */
                    playerRef.current.msRequestFullscreen();
                }
            }
            else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                }
            }
        }
        catch (err) {
            console.log(err)
        }
        try {
            if (!isfullScreen) {
                if (window.screen.orientation) {
                    window.screen.orientation.lock('landscape').then(() => console.log("lock")).catch((err) => console.log(err))
                }
                else {
                    window.screen.orientation.unlock().then(() => console.log("unlock")).catch((err) => console.log(err))
                }
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    const handleMouseMove = (e) => {
        const progressBar = progressBarRef.current;
        const rect = progressBar.getBoundingClientRect(); // Get the position of the progress bar
        const offsetX = e.clientX - rect.left; // Get the X position of the cursor relative to the progress bar
        const percentage = (offsetX) / (rect.width ); // Get the percentage of the progress bar the cursor is at
        const time = (percentage*100); // Convert that percentage into the corresponding time

        setHoverTime(time);
        setTooltipPosition(offsetX); // Set the position of the tooltip
    };
    const handleMouseLeave = () => {
        setHoverTime(null); // Hide the tooltip when the cursor leaves the progress bar
    };
    return (
        <>
            <div className={isfullScreen ? styles.mainBox2 : styles.mainBox} ref={playerRef} onMouseMove={handleEnter} onMouseLeave={handleLeave} >
                <video src={url} height={"100%"} width={"100%"} ref={videoRef} onTimeUpdate={() => setRange(videoRef.current.currentTime)} onClick={handlePlay} onDurationChange={() => { setDuration(videoRef.current?.duration); onduration() }} onEnded={handlePlay} muted autoPlay onPlay={() => { videoRef.current.muted = false }} onContextMenu={(e) => e.preventDefault()} onProgress={handleProgress}>
                </video>

                <div className={controls ? styles.controls2 : styles.controls} onMouseMove={onControls}>
                    <div className={styles.range}>
                        <div className={styles.totalRange}></div>
                        <div className={styles.buffRange} style={{ width: `${(bufferedTime * 100) / duration}%` }}></div>
                        <div className={styles.pointRange} style={{ width: `${hoverTime!==null?hoverTime:0}%` }}>
                            
                        </div>
                        <div className={styles.passedRange} style={{ width: `${(range * 100) / duration}%` }}></div>
                        <input type="range" name="" id="" min={0} max={duration} step={0.001} value={range} onChange={handleRange} className={styles.slider} ref={progressBarRef} onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave} />
                        {hoverTime!==null && <div
                                className={styles.tooltip}
                                style={{
                                    left: `${tooltipPosition}px`,
                                    // left:"500px"
                                }}
                            >
                                {getDuration((hoverTime*duration)/100)}
                            </div>}
                    </div>
                    <div className={styles.features}>
                        <div className={styles.first}>
                            <div onClick={handlePlay}>
                                {isplaying ?
                                    <svg xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 -960 960 960" width="35px" fill="#e8eaed"><path d="M320-200v-560l440 280-440 280Z" /></svg>
                                    :
                                    <svg xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 -960 960 960" width="35px" fill="#e8eaed"><path d="M556.67-200v-560h170v560h-170Zm-323.34 0v-560h170v560h-170Z" /></svg>
                                }
                            </div>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 -960 960 960" width="35px" fill="#e8eaed"><path d="M673.33-240v-480H740v480h-66.67ZM220-240v-480l350.67 240L220-240Z" /></svg>
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
                                <input type="range" name="" id="" min={0} max={100} value={volume} className={styles.volumeRange} onChange={handleVolume} />
                            </div>
                            <div>
                                {getDuration(range)} / {getDuration(duration)}
                            </div>
                        </div>
                        <div className={styles.second}>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 -960 960 960" width="25px" fill="#e8eaed"><path d="m357.67-52-20-135.67q-10.34-3.33-23-10.66Q302-205.67 293-212.67l-126.33 57-124-218 113-83.33q-.67-5-1-11.5-.34-6.5-.34-11.5t.34-11.5q.33-6.5 1-11.5l-113-84 124-216L295-747q8.33-6.33 20.33-13.17 12-6.83 22.34-10.16l20-138.34h244.66l20 137.67q10.34 4 23 10.5Q658-754 667-747l127-56 123.33 216-114 82.67q.67 5.66 1.34 12.16.66 6.5.66 12.17t-.83 11.83q-.83 6.17-1.5 11.84l114 82.66-124.33 218-127-57q-9 7-20.67 14.34-11.67 7.33-22.67 10.66L602.33-52H357.67Zm120.66-294.67q55.34 0 94.34-39t39-94.33q0-55.33-39-94.33t-94.34-39q-55.33 0-94.33 39T345-480q0 55.33 39 94.33t94.33 39Z" /></svg>
                            </div>
                            {/* <div onClick={() => videoRef.current.requestPictureInPicture()}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 -960 960 960" width="25px" fill="#e8eaed"><path d="M52-523.33v-105.34h125.67l-173.34-172 75-75L252-703v-125.67h104.67v305.34H52ZM156.67-132q-43.7 0-74.19-30.48Q52-192.97 52-236.67V-450h104.67v213.33h349V-132h-349Zm646.66-276.67v-314.66H430v-105.34h373.33q43.98 0 74.66 30.68t30.68 74.66v314.66H803.33ZM572.33-131v-211h336.34v211H572.33Z" /></svg>
                            </div> */}
                            <div >
                                <svg xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 -960 960 960" width="25px" fill="#e8eaed"><path d="M52-523.33v-105.34h125.67l-173.34-172 75-75L252-703v-125.67h104.67v305.34H52ZM156.67-132q-43.7 0-74.19-30.48Q52-192.97 52-236.67V-450h104.67v213.33h349V-132h-349Zm646.66-276.67v-314.66H430v-105.34h373.33q43.98 0 74.66 30.68t30.68 74.66v314.66H803.33ZM572.33-131v-211h336.34v211H572.33Z" /></svg>
                            </div>
                            <div title='full screen' onClick={handleFullScreen}>
                                {isfullScreen ?
                                    <svg xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 -960 960 960" width="25px" fill="#e8eaed"><path d="M220-86v-134H86v-126h260v260H220Zm395 0v-260h259v126H741v134H615ZM86-615v-126h134v-133h126v259H86Zm529 0v-259h126v133h133v126H615Z" /></svg>
                                    :
                                    <svg xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 -960 960 960" width="25px" fill="#e8eaed"><path d="M86-86v-260h126v134h134v126H86Zm529 0v-126h133v-134h126v260H615ZM86-615v-259h260v126H212v133H86Zm662 0v-133H615v-126h259v259H748Z" /></svg>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
