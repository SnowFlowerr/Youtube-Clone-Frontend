import React, { useEffect, useState } from 'react'
import Navbar from '../../navbar/Navbar'
import Sidenav from '../../navbar/Sidenav'
import styles from './Home.module.css'
import axios from 'axios'
import Like from "./Like.webp"

export default function Home({ playingVideoId, setPlayingVideoId, playing, setPlaying }) {
    const [fav, setFav] = useState([{snippet:{thumbnails:{medium:{url:Like}},title:"Liked Songs"}}]);
    const [results, setResults] = useState([]);

    const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY
    const API_KEY2 = process.env.REACT_APP_YOUTUBE_API_KEY2
    const BASE_URL = "https://www.googleapis.com/youtube/v3/search";

    useEffect(() => {
        searchMusic();
    }, []);

    async function searchMusic() {
        try {
            const response = await axios.get(BASE_URL, {
                params: {
                    part: "snippet",
                    q: "songs" + " music",
                    type: "video",
                    key: API_KEY,
                    maxResults: 5,
                    // regionCode:"US"
                },
            });
            // console.log(response.data.items)

            // setResults(response.data.items);
            setFav([...fav,...response.data.items]);
        } catch (error) {
            searchMusic2();
            console.error("Error fetching YouTube results:", error);
        }
    }
    async function searchMusic2() {
        try {
            const response = await axios.get(BASE_URL, {
                params: {
                    part: "snippet",
                    q: "songs" + " music",
                    type: "video",
                    key: API_KEY2,
                    maxResults: 5,
                    // regionCode:"US"
                },
            });
            // console.log(response.data.items)

            // setResults(response.data.items);
            setFav([...fav,...response.data.items]);
        } catch (error) {
            console.error("Error fetching YouTube results:", error);
        }
    }
    function handleBtn(item){
        if(!playingVideoId || playingVideoId?.id?.videoId!==item?.id?.videoId){
            setPlayingVideoId(item)
        }
        else{
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
                                        <div className={styles.album}>
                                            <img src={item?.snippet?.thumbnails?.medium?.url} alt={item?.snippet?.title} />
                                        </div>
                                        <div className={styles.title}>
                                            {item?.snippet?.title}
                                        </div>

                                            {index!=0&&<button className={styles.play} onClick={()=>handleBtn(item)}>{playingVideoId?.id?.videoId===item?.id?.videoId && playing?<i class="fa-solid fa-pause"></i>:<i class="fa-solid fa-play"></i>}</button>}
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
