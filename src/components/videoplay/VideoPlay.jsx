import React, { useEffect, useRef, useState } from 'react'
import styles from "./VideoPlay.module.css"
import Navbar from '../navbar/Navbar'
import Sidenav from '../navbar/Sidenav'
import { useSelector } from 'react-redux'
import vid from "./VIDEO-2024-07-21-10-47-29.mp4"
// import { useNavigate } from 'react-router-dom'

export default function VideoPlay() {

    const menu = useSelector((state) => state.menu.value)
    // const navigate = useNavigate()
    const playRef = useRef(null)
    const boxRef = useRef(null)
    const videoRef = useRef(null)
    const [isSubs, setisSubs] = useState(false)
    const [isLike, setisLike] = useState(false)
    const [isDislike, setisDislike] = useState(false)

    useEffect(() => {
        if (menu) {
            boxRef.current.style.filter = "brightness(0.8)";
        }
        else {
            boxRef.current.style.filter = 'none'
        }
    }, [menu])

    function handlePlay() {
        videoRef.current.play()
        playRef.current.style.display = 'none'
    }

    function handlePause() {
        playRef.current.style.display = 'block'
    }
    function handleSubscribe() {
        setisSubs(!isSubs)
    }
    function handleLike() {
        setisLike(!isLike)
    }
    function handleDislike() {
        setisDislike(!isDislike)
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
                    <video
                        className={styles.video}
                        // autoPlay
                        controls
                        id='videos'
                        ref={videoRef}
                        onPlay={handlePlay}
                        onPause={handlePause}
                        poster={null}>

                        <source
                            src={vid}
                            type='video/mp4'
                        />

                    </video>
                    <div className={styles.pause} onClick={handlePlay} ref={playRef}><i class="fa-solid fa-play"></i></div>
                </div>

            </div>
            <div className={styles.videoDetails} ref={boxRef}>
                <div className={styles.videoDet}>
                    <div className={styles.title}>
                        bcfkebckjbkds gr gre g reg
                    </div>
                    <div className={styles.videoStatus}>
                        <div className={styles.channel}>
                            <div className={styles.icon}></div>
                            <div className={styles.channelName}>
                                <span className={styles.name}>Channel Name</span>
                                <br />
                                <span className={styles.subs}>0 subs</span>
                            </div>
                            {/* <div className={styles.subscribe}>
                                Subscribe
                            </div> */}
                        </div>
                        <div className={styles.status2}>
                            <div className={styles.subscribe} style={!isSubs?{backgroundColor:"white",color:"black"}:{}} onClick={handleSubscribe}>
                                {isSubs?"Unsubscribe":"Subscribe"}
                            </div>
                            <div className={styles.status}>
                                <div className={styles.likeDislike}>
                                    <span className={styles.like} onClick={handleLike}>
                                        {isLike?<i class="fa-solid fa-thumbs-up"></i>:<i class="fa-regular fa-thumbs-up"></i>} 0
                                    </span>
                                    <span className={styles.dislike} onClick={handleDislike}>
                                        {isDislike?<i class="fa-solid fa-thumbs-down fa-flip-horizontal"></i>:<i class="fa-regular fa-thumbs-down fa-flip-horizontal"></i>} 0
                                    </span>
                                </div>
                                <div className={styles.share}>
                                    <i class="fa-solid fa-share"></i> Share
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.descript}>
                        <b>views</b> <br />
                        kdjbckscksbzckjbs k k s b bs bdk bksbf
                    </div>
                </div>






                <div className={styles.similarVideo}>
                    fefsdz <br />
                    efvfesv
                    fefsdz <br />
                    efvfesv
                    v

                    fefsdz <br />
                    efvfesv
                    fefsdz <br />
                    efvfesv

                    fefsdz <br />
                    efvfesv
                    v
                    fefsdz <br />
                    efvfesv
                    v
                    fefsdz <br />
                    efvfesv
                    fefsdz <br />
                    efvfesv

                    fefsdz <br />
                    efvfesv
                    fefsdz <br />
                    efvfesv
                </div>
            </div>

        </div>
    )

}
