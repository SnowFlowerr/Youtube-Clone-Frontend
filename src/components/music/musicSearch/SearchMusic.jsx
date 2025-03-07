import React, { useEffect, useState } from 'react'
import Navbar from '../../navbar/Navbar'
import Sidenav from '../../navbar/Sidenav'
import styles from './SearchMusic.module.css'
import axios from 'axios'
import { useParams } from 'react-router-dom'

export default function SearchMusic({ playingVideoId, setPlayingVideoId, playing, setPlaying }) {
    const [results, setResults] = useState([]);
    const {id}=useParams()

    const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY
    const API_KEY2 = process.env.REACT_APP_YOUTUBE_API_KEY2
    const BASE_URL = "https://www.googleapis.com/youtube/v3/search";

    useEffect(()=>{
        searchMusic()
    },[id])
    async function searchMusic() {
        if (!id) return;

        try {
            const response = await axios.get(BASE_URL, {
                params: {
                    part: "snippet",
                    q: id + " music",
                    type: "video",
                    key: API_KEY,
                    maxResults: 10,
                },
            });

            setResults(response.data.items);
        } catch (error) {
            searchMusic2()
            console.error("Error fetching YouTube results:", error);
        }
    }
    async function searchMusic2() {
        if (!id) return;

        try {
            const response = await axios.get(BASE_URL, {
                params: {
                    part: "snippet",
                    q: id + " music",
                    type: "video",
                    key: API_KEY2,
                    maxResults: 10,
                },
            });

            setResults(response.data.items);
        } catch (error) {
            console.error("Error fetching YouTube results:", error);
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
                            <div className="mt-6 w-full max-w-2xl">
                                {results.length > 0 && (
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {results.map((video) => (
                                            <li key={video.id.videoId} className="bg-gray-800 p-3 rounded-lg">
                                                <img
                                                    src={video.snippet.thumbnails.medium.url}
                                                    alt={video.snippet.title}
                                                    className="rounded-lg w-full"
                                                />
                                                <p className="mt-2 text-lg">{video.snippet.title}</p>
                                                <button
                                                    onClick={() => setPlayingVideoId(video)}
                                                    className="mt-2 bg-green-500 px-4 py-2 rounded-lg hover:bg-green-700"
                                                >
                                                    Play ▶
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
