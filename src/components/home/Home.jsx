import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { offMic } from '../../redux/Data/micSlice'
import { darkTheme, lightTheme } from '../../themes'
import Navbar from '../navbar/Navbar'
import Sidenav from '../navbar/Sidenav'
import styles from './Home.module.css'
import pic from './pic.jpg'



export default function Home() {
    const [videos, setVideos] = useState([])
    const theme = useSelector((state) => state.theme.value)
    const lastVid = useRef(null)
    const dispatch = useDispatch()
    const [last, setLast] = useState(false)
    // const [limit,setLimit]=useState(20)
    const [skip, setSkip] = useState(0)

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                const res = await axios.get(`https://honest-stillness-production.up.railway.app/api/videos/?limit=${20}&skip=${skip}`)
                // console.log(res.data)
                setVideos([...videos, ...res.data])
                if (res.data.length !== 0) {
                    setLast(true)
                }
            }
            catch (err) {
                console.log(err.message)
            }
        }
        fetchVideo();
        dispatch(offMic())
    }, [skip])

    function handleScroll() {
        let divHeight = lastVid.current.offsetHeight
        let scrollHeight = lastVid.current.scrollHeight
        let scroll = lastVid.current.scrollTop
        if (Math.floor(divHeight + scroll) >= Math.floor(scrollHeight) - 1) {
            if (last) {
                setSkip(skip + 20)
                setLast(false)
            }
        }
    }
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
    return (
        <div className={styles.mainBox} ref={lastVid} onScroll={handleScroll}>
            <div className={styles.nav}>
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
                                    <Link to={`player/${video?._id}`}>
                                        <img src={video.imageUrl} width="100%" height="100%" alt="thumbnail" />
                                    </Link>
                                    <div className={styles.duration}>{getDuration(video?.duration)}</div>
                                </div>
                                <div className={styles.videoDetail} style={theme ? darkTheme : lightTheme}>
                                    <div className={styles.icon}>
                                        <a href="/userDetail/userid">
                                            <img src={pic} width="100%" height="100%" alt="icon" />
                                        </a>
                                    </div>
                                    <div className={styles.details}>
                                        <Link to={`/player/${video?._id}`} style={theme ? { color: "white" } : { color: "black" }}>
                                            <div className={styles.title}>
                                                {video?.title}
                                            </div>
                                            <div className={styles.channel}>
                                                <div className={styles.channelNames}>
                                                    {video?.name}
                                                </div>
                                                <div>
                                                    {video?.views} Views

                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )
                    }

                {videos.length!==0 &&
                <div className={styles.loading}>
                    <div className={styles.loadingBar} style={theme?{}:{borderColor:"black"}}>
                    </div>
                </div>}
                    <div className={styles.bottomNav}>
                        <Sidenav></Sidenav>
                    </div>
                </div>

            </div>
        </div>
    )
}
