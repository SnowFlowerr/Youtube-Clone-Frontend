import React, { useEffect, useRef, useState } from 'react'
import styles from "./SimilarVideos.module.css"
import { useSelector } from 'react-redux'
import { lightTheme, darkTheme } from '../../themes'
import ShortsCard from './ShortsCard'
import Cards from './Cards'
import axios from 'axios'

export default function SimilarVideos({ current }) {
    const titles = ["All", "Similar to This Video",]
    const [shorts, setShorts] = useState([1, 1, 1, 1, 1, 1])
    const [videos, setVideos] = useState([2,2,2,2,2,2])
    const theme = useSelector((state) => state.theme.value)
    
    useEffect(()=>{
        currentShorts()
        currentVideos()
    },[])

    async function currentShorts() {
        try {
            const short = await axios.get(
                `https://honest-stillness-production.up.railway.app/api/shorts/?limit=${6}&skip=${0}`,
                { withCredentials: true }
            );
            setShorts(short.data);
            
        } catch (err) {
            console.log(err);
        }
    }

    async function currentVideos() {
        try {
            const short = await axios.get(
                `https://honest-stillness-production.up.railway.app/api/videos/random/vid/?limit=${10}&skip=${0}`,
                { withCredentials: true }
            );
            setVideos(short.data);
            console.log(short.data)
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div>
            <div className={styles.mainBox}>
                <div className={styles.allTitles}>
                    {
                        titles.map((title, index) =>
                            <div className={styles.title} key={index}>
                                {title}
                            </div>
                        )
                    }
                </div>
                <div>
                    <div className={styles.shortsLogo} style={theme ? { backgroundColor: "white", color: "black" } : { backgroundColor: "black", color: "white" }}>
                        <i className="fa-solid fa-circle-play"></i> Shorts
                    </div>
                    <div className={styles.shortsStorage}>
                        {
                            shorts.map((short, index) =>
                                <ShortsCard video={short} index={index}></ShortsCard>
                            )
                        }
                    </div>
                    <hr />
                </div>
                <div>
                    <div className={styles.shortsLogo} style={theme ? { backgroundColor: "white", color: "black" } : { backgroundColor: "black", color: "white" }}>
                        <i className="fa-solid fa-video"></i> Videos
                    </div>
                    <div className={styles.VideosStorage}>
                        {
                            videos.map((video, index) =>
                                {video?._id!==current && <Cards video={video} index={index}></Cards>}
                            )
                        }
                    </div>
                </div>

            </div>
        </div>
    )
}
