import React, { useEffect, useRef, useState } from 'react'
import styles from "./VideoPlay.module.css"
import Navbar from '../navbar/Navbar'
import Sidenav from '../navbar/Sidenav'
import { useSelector } from 'react-redux'
import vid from "./VIDEO-2024-07-21-10-47-29.mp4"
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { darkTheme, lightTheme } from '../../themes'
import Share from '../Share/Share'

// import { useNavigate } from 'react-router-dom'

export default function VideoPlay() {

    const menu = useSelector((state) => state.menu.value)
    const theme = useSelector((state) => state.theme.value)
    // const navigate = useNavigate()
    // const playRef = useRef(null)
    const boxRef = useRef(null)
    const videoRef = useRef(null)
    const [isSubs, setisSubs] = useState(false)
    const [isLike, setisLike] = useState(false)
    const [isDislike, setisDislike] = useState(false)
    const [isShare, setisShare] = useState(false)
    const [videoData, setvideoData] = useState({ title: "jhgvvhj" })
    const { id } = useParams();

    useEffect(() => {
        async function fetchData() {
            try {
                const vidData = await axios.get(`http://localhost:8000/api/videos/${id}`)
                setvideoData(vidData.data)
                // console.log(vidData.data)
            }
            catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        if (menu) {
            boxRef.current.style.filter = "brightness(0.8)";
        }
        else {
            boxRef.current.style.filter = 'none'
        }
    }, [menu])
    function handleSubscribe() {
        async function fetchData() {
            try {
                if (isSubs) {
                    await axios.put(`http://localhost:800/api/users/unsubscribe/${videoData.userId}`)
                }
                else {
                    await axios.put(`http://localhost:800/api/users/subscribe/${videoData.userId}`)
                }
                setisSubs(!isSubs)
            }
            catch (err) {
                console.log(err.message)
            }
        }
        fetchData()
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
                        autoPlay
                        controls
                        id='videos'
                        ref={videoRef}
                        poster={null}>

                        <source
                            src={vid}
                            type='video/mp4'
                        />

                    </video>
                    {/* <div className={styles.paus} onClick={handlePlay} ref={playRef}><i className="fa-solid fa-play"></i></div> */}
                </div>


            </div>
            <div className={styles.videoDetails} ref={boxRef}>
                <div className={styles.videoDet}>
                    <div className={styles.title}>
                        {videoData?.title}
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
                            <div className={styles.subscribe} style={theme ? lightTheme : darkTheme} onClick={handleSubscribe}>
                                {isSubs ? "Unsubscribe" : "Subscribe"}
                            </div>
                            <div className={styles.status}>
                                <div className={styles.likeDislike} style={theme ? {} : { backgroundColor: "rgb(220, 220, 220)" }}>
                                    <span className={styles.like} onClick={handleLike} >
                                        {isLike ? <i className="fa-solid fa-thumbs-up"></i> : <i className="fa-regular fa-thumbs-up"></i>} 0
                                    </span>
                                    <span className={styles.dislike} onClick={handleDislike}>
                                        {isDislike ? <i className="fa-solid fa-thumbs-down fa-flip-horizontal"></i> : <i className="fa-regular fa-thumbs-down fa-flip-horizontal"></i>} 0
                                    </span>
                                </div>
                                <Share
                                text={videoData?.title}
                                url={window.location.href}
                                title={videoData?.title}
                                    share={
                                        <div className={styles.share} style={theme ? {} : { backgroundColor: "rgb(220, 220, 220)" }}>
                                            <span><i className="fa-solid fa-share"></i> Share</span>
                                        </div>
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <div className={styles.descript} style={theme ? {} : { backgroundColor: "rgb(220, 220, 220)" }}>
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
