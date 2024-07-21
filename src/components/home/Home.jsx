import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from '../navbar/Navbar'
import Sidenav from '../navbar/Sidenav'
import styles from './Home.module.css'


export default function Home() {
    const [showMenu, setshowMenu] = useState(false)
    const [videos, setVideos] = useState([1,2,2,2,2,2,22,2,2,2,2,2,2,2,2,2])
    useEffect(() => {
        const fetchVideo = async () => {
            try {
                const res = await axios.get('http://localhost:800/api/videos')
                setVideos(res.data)
                console.log(res.data)
            }
            catch (err) {
                console.log(err.message)
            }
        }
        fetchVideo();
    }, [])
    return (
        <>
            <Navbar showMenu={showMenu} setshowMenu={setshowMenu}></Navbar>
            <div className={styles.bigBox}>
                <div className={styles.Sidenav}>
                <Sidenav showMenu={showMenu}></Sidenav>
                </div>
                <div className={styles.videos}>
                    {
                        videos.map((video, index) =>
                            <div key={index} className={styles.singleVid}>
                                <div className={styles.thumbnail}>
                                    video
                                </div>
                                <div className={styles.videoDetail}>
                                    <div className={styles.icon}>
                                    </div>
                                    <div>
                                        <div className={styles.title}>
                                            {video.title}hbkhbk kbibh rf erf erf er
                                        </div>
                                        <div className={styles.channel}>
                                            channel name
                                            <br />
                                            0 views
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }

                <div>
                <Sidenav showMenu={showMenu}></Sidenav>
                </div>
                </div>

            </div>
        </>
    )
}
