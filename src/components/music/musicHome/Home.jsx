import React, { useEffect, useState } from 'react'
import Navbar from '../../navbar/Navbar'
import Sidenav from '../../navbar/Sidenav'
import styles from './Home.module.css'
import axios from 'axios'
import Like from "./Like.webp"
import { useNavigate } from 'react-router-dom'
import MusicCategory from '../musicCategory/MusicCategory'

export default function Home({ playingVideoId, setPlayingVideoId, playing, setPlaying }) {
    const [fav, setFav] = useState([{ snippet: { thumbnails: { medium: { url: Like } }, title: "Liked Songs" } }]);
    const [results, setResults] = useState([]);
    const navigate = useNavigate()

    const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY
    const API_KEY2 = process.env.REACT_APP_YOUTUBE_API_KEY2
    const API_KEY3 = process.env.REACT_APP_YOUTUBE_API_KEY3
    const API_KEY4 = process.env.REACT_APP_YOUTUBE_API_KEY4
    const API_KEY5 = process.env.REACT_APP_YOUTUBE_API_KEY5
    const BASE_URL = "https://www.googleapis.com/youtube/v3/search";
    const keys = [API_KEY, API_KEY2, API_KEY3, API_KEY4, API_KEY5]
    useEffect(() => {
        searchMusic(0);
    }, []);

    async function searchMusic(n) {
        if (n == keys.length) {
            return
        }
        try {
            const response = await axios.get(BASE_URL, {
                params: {
                    part: "snippet",
                    q: "songs" + " music",
                    type: "video",
                    key: keys[n],
                    maxResults: 5,
                    // regionCode:"US"
                },
            });
            // console.log(response.data.items)
            // setResults(response.data.items);
            if (fav.length === 1) {
                setFav([...fav, ...response.data.items]);
            }

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
                        <div className={styles.fav}>
                            {
                                fav.map((item, index) =>
                                    <div key={index} className={styles.favItem}>
                                        <div className={styles.album} onClick={() => index === 0 && navigate("/music/favorite/song")}>
                                            <img src={item?.snippet?.thumbnails?.medium?.url} alt={item?.snippet?.title} />
                                        </div>
                                        <div className={styles.chDetail} onClick={() => index === 0 && navigate("/music/favorite/song")}>

                                            <div className={styles.title}>
                                                {item?.snippet?.title}
                                            </div>
                                            {/* {item?.snippet?.channelTitle && */}
                                                <div className={styles.chtitle}>
                                                    {item?.snippet?.channelTitle}
                                                </div>
                                            {/* } */}
                                        </div>

                                        {index != 0 && <button className={styles.play} onClick={() => handleBtn(item)}>{playingVideoId?.id?.videoId === item?.id?.videoId && playing ? <i class="fa-solid fa-pause"></i> : <i class="fa-solid fa-play"></i>}</button>}
                                    </div>
                                )
                            }
                        </div>
                        <div className={styles.category}>
                            <div>
                                <h2>Pop Songs</h2>
                                <br />
                                <MusicCategory category={"Pop"} playingVideoId={playingVideoId} setPlayingVideoId={setPlayingVideoId} playing={playing} setPlaying={setPlaying} />
                            </div>
                            <div>
                                <h2>Dance Songs</h2>
                                <br />
                                <MusicCategory category={"Dance"} playingVideoId={playingVideoId} setPlayingVideoId={setPlayingVideoId} playing={playing} setPlaying={setPlaying} />
                            </div>
                            <div>
                                <h2>Rock Songs</h2>
                                <br />
                                <MusicCategory category={"Rock"} playingVideoId={playingVideoId} setPlayingVideoId={setPlayingVideoId} playing={playing} setPlaying={setPlaying} />
                            </div>
                            <div>
                                <h2>Raps Songs</h2>
                                <br />
                                <MusicCategory category={"Raps"} playingVideoId={playingVideoId} setPlayingVideoId={setPlayingVideoId} playing={playing} setPlaying={setPlaying} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
