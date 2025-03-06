import React, { useState } from 'react'
import Navbar from '../../navbar/Navbar'
import Sidenav from '../../navbar/Sidenav'
import styles from './Home.module.css'
import axios from 'axios'

export default function Home({ setPlayingVideoId }) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY
    const BASE_URL = "https://www.googleapis.com/youtube/v3/search";

    async function searchMusic() {
        if (!query) return;

        try {
            const response = await axios.get(BASE_URL, {
                params: {
                    part: "snippet",
                    q: query + " music",
                    type: "video",
                    key: API_KEY,
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
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Search for a song..."
                                    className="p-2 text-black rounded-lg"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                                <button
                                    onClick={searchMusic}
                                    className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-700"
                                >
                                    Search
                                </button>
                            </div>
                        </div>
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
                                                    onClick={() => setPlayingVideoId(video.id.videoId)}
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
