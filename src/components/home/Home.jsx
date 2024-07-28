import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from '../navbar/Navbar'
import Sidenav from '../navbar/Sidenav'
import styles from './Home.module.css'
import pic from './pic.jpg'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { lightTheme,darkTheme } from '../../themes'



export default function Home() {
    const [videos, setVideos] = useState([1,2,2,2,2,2,22,2,2,2,2])
    const theme = useSelector((state) => state.theme.value)
    
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
    }, [])
    return (
        <>
            <Navbar></Navbar>
            <div className={styles.bigBox}>
                <div className={styles.Sidenav}>
                <Sidenav></Sidenav>
                </div>
                <div className={styles.videos}>
                    {
                        videos.map((video, index) =>
                            // <div key={index} className={styles.singleVid} >
                            <Link to={`player/${video._id}`}  key={index} className={styles.singleVid} style={theme?darkTheme:lightTheme}>
                                <div className={styles.thumbnail}>
                                    <img src={pic} width="100%" height="100%" alt="" />
                                </div>
                                <div className={styles.videoDetail} style={theme?darkTheme:lightTheme}>
                                    <div className={styles.icon}>
                                        <a href="fgbxfdbd">
                                            <img src={pic} width="100%" height="100%" alt="" />
                                        </a>
                                    </div>
                                    <div>
                                        <div className={styles.title}>
                                            {video?.title}
                                        </div>
                                        <div className={styles.channel}>
                                            channel name
                                            <br />
                                            0 views
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            // </div>
                        )
                    }

                <div className={styles.bottomNav}>
                <Sidenav></Sidenav>
                </div>
                </div>

            </div>
        </>
    )
}
