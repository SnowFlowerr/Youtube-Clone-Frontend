import React, { useEffect, useState } from 'react'
import styles from "./MusicCategory.module.css"
import axios from 'axios'

export default function MusicCategory({category, playingVideoId, playing, setPlayingVideoId, setPlaying}) {
    const [songs, setSongs] = useState([])

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
    }, []);

    async function searchMusic(n) {
        if(n==keys.length){
            return
        }
        try {
            const response = await axios.get(BASE_URL, {
                params: {
                    part: "snippet",
                    q: category + " songs",
                    type: "video",
                    key: keys[n],
                    maxResults: 10,
                    // regionCode:"US"
                },
            });
            // console.log(response.data.items)

            // setResults(response.data.items);
            setSongs([...songs,...response.data.items]);
        } catch (error) {
            console.error("Error fetching YouTube results:", error);
            searchMusic(n+1)
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
    function handleFav(item){
        if(!playingVideoId || playingVideoId?.id?.videoId!==item?.id?.videoId){
            setPlayingVideoId(item)
        }
        else{
            setPlaying(!playing)
        }
    }
    return (
        <div className={styles.mainBox}>
            {
                songs.map((item, index) =>
                    <div className={styles.cards} onClick={()=>handleBtn(item)} key={index}>
                        <div className={styles.album}>
                            <img src={item?.snippet?.thumbnails?.medium?.url} alt={item?.snippet?.title} />
                            <button className={styles.play} onClick={()=>handleBtn(item)}>{playingVideoId?.id?.videoId===item?.id?.videoId && playing?<i className="fa-solid fa-pause"></i>:<i className="fa-solid fa-play"></i>}</button>
                            <button className={styles.favorite} onClick={() => handleFav(item)}>{playingVideoId?.id?.videoId === item?.id?.videoId && playing ? <i className="fa-solid fa-star"></i> : <i className="fa-regular fa-star"></i>}</button>
                        </div>
                        <div className={styles.title}>
                            {item?.snippet?.title}
                        </div>
                        <div className={styles.Chtitle}>
                            {item?.snippet?.channelTitle}
                        </div>
                    </div>
                )
            }
        </div>
    )
}
