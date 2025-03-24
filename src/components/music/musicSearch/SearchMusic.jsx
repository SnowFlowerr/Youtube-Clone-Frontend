import React, { useEffect, useState } from 'react'
import Navbar from '../../navbar/Navbar'
import Sidenav from '../../navbar/Sidenav'
import styles from './SearchMusic.module.css'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import pic from "../musicHome/Like.webp"

export default function SearchMusic({ playingVideoId, setPlayingVideoId, playing, setPlaying }) {
    const [results, setResults] = useState([]);
    const { id } = useParams()
    const navigate = useNavigate()

    const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY
    const API_KEY2 = process.env.REACT_APP_YOUTUBE_API_KEY2
    const API_KEY3 = process.env.REACT_APP_YOUTUBE_API_KEY3
    const API_KEY4 = process.env.REACT_APP_YOUTUBE_API_KEY4
    const API_KEY5 = process.env.REACT_APP_YOUTUBE_API_KEY5
    const API_KEY6 = process.env.REACT_APP_YOUTUBE_API_KEY6
    const BASE_URL = "https://www.googleapis.com/youtube/v3/search";
    const keys = [API_KEY, API_KEY2, API_KEY3, API_KEY4, API_KEY5, API_KEY6]
    useEffect(() => {
        searchMusic(0);
    }, [id]);

    async function searchMusic(n) {
        if (!id) return;
        if (n == keys.length) {
            return
        }

        try {
            const response = await axios.get(BASE_URL, {
                params: {
                    part: "snippet",
                    q: id + " song",
                    type: "video",
                    key: keys[n],
                    maxResults: 10,
                },
            });
            console.log(response.data.items)

            setResults(response.data.items);
        } catch (error) {
            console.error("Error fetching YouTube results:", error);
            searchMusic(n + 1)
        }
    }
    function handleBtn(item) {
        if (!playingVideoId || playingVideoId?.id?.videoId !== item?.id?.videoId) {
            setPlayingVideoId(item)
        }
        else {
            setPlaying(!playing)
        }
    }
    return (
        <div>
            <div className={styles.mainBox} >
                <div className={styles.nav}>
                    <Navbar></Navbar>
                </div>
                <div className={styles.bigBox}>
                    <div className={styles.Sidenav}>
                        <Sidenav></Sidenav>
                    </div>
                    <div className={styles.songs}>
                        <div>
                            <div className={styles.fav}>
                                {
                                    results.map((item, index) =>
                                        <div key={index} className={styles.favItem}>
                                            <div className={styles.album} onClick={() => handleBtn(item)}>
                                                <img src={item?.snippet?.thumbnails?.medium?.url} alt={item?.snippet?.title} />
                                            </div>
                                            <div className={styles.chDetail} onClick={() => handleBtn(item)}>

                                                <div className={styles.title}>
                                                    {item?.snippet?.title}
                                                </div>
                                                {/* {item?.snippet?.channelTitle && */}
                                                <div className={styles.chtitle}>
                                                    {item?.snippet?.channelTitle}
                                                </div>
                                                {/* } */}
                                            </div>

                                            <button className={styles.play} onClick={() => handleBtn(item)}>{playingVideoId?.id?.videoId === item?.id?.videoId && playing ? <i className="fa-solid fa-pause"></i> : <i className="fa-solid fa-play"></i>}</button>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
