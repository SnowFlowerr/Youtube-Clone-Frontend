import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import Navbar from '../navbar/Navbar'
import Sidenav from '../navbar/Sidenav'
import styles from './Home.module.css'
import pic from './pic.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { lightTheme, darkTheme } from '../../themes'
import { offMic } from '../../redux/Data/micSlice'



export default function Home() {
    const [videos, setVideos] = useState([1, 2, 2, 2, 2, 2, 22, 2, 2, 2, 2])
    const theme = useSelector((state) => state.theme.value)
    const lastVid = useRef(null)
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                const res = await axios.get('http://localhost:8000/api/videos')
                setVideos(res.data)
            }
            catch (err) {
                console.log(err.message)
            }
        }
        fetchVideo();
        dispatch(offMic())
    }, [])


    function handleScroll() {
        let divHeight = lastVid.current.offsetHeight
        let scrollHeight = lastVid.current.scrollHeight
        let scroll = lastVid.current.scrollTop
        if (divHeight + scroll >= scrollHeight - 5) {
            console.log("true")
        }
    }
    return (
        <div className={styles.mainBox} ref={lastVid} onScroll={handleScroll}>
            <div>
                <Navbar></Navbar>
            </div>
            <div className={styles.bigBox}>
                <div className={styles.Sidenav}>
                    <Sidenav></Sidenav>
                </div>
                <div className={styles.videos}>
                    {
                        videos.map((video, index) =>
                            <div key={index} className={styles.singleVid} style={theme ? darkTheme : lightTheme}>
                                <div className={styles.thumbnail}>
                                    <a href={`player/${video?._id}`}>
                                        <img src={pic} width="100%" height="100%" alt="" />
                                    </a>
                                </div>
                                <div className={styles.videoDetail} style={theme ? darkTheme : lightTheme}>
                                    <div className={styles.icon}>
                                        <a href="/userDetail/userid">
                                            <img src={pic} width="100%" height="100%" alt="" />
                                        </a>
                                    </div>
                                    <div className={styles.details}>
                                        <a href={`/player/${video?._id}`} style={theme ? { color: "white" } : { color: "black" }}>
                                            <div className={styles.title}>
                                                {video?.title}fyhv
                                            </div>
                                            <div className={styles.channel}>
                                                channel name
                                                <br />
                                                0 views
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )
                    }

                    {/* <div ref={lastVid}>gdrgdrrgr</div> */}
                    <div className={styles.bottomNav}>
                        <Sidenav></Sidenav>
                    </div>
                </div>

            </div>
        </div>
    )
}
