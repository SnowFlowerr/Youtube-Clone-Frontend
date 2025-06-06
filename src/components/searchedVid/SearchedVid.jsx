import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { offMic } from '../../redux/Data/micSlice'
import Navbar from '../navbar/Navbar'
import Sidenav from '../navbar/Sidenav'
import Cards from './Cards'
import styles from "./SearchVid.module.css"
import ShortsCard from './ShortsCard'

export default function SearchedVid() {
    const [searchedVideo, setsearchedVideo] = useState(null)
    const [searchedShorts, setsearchedShorts] = useState(null)
    const [isShorts, setisShorts] = useState(true)

    const dispatch = useDispatch()
    const { search } = useParams()
    const theme = useSelector((state) => state.theme.value)

    useEffect(() => {
        const fetchShorts = async () => {
            try {
                const res = await axios.get(`https://video-streaming-app-backend-r6e3.onrender.com/api/shorts/search/${search}`)
                // console.log(res.data)
                setsearchedShorts(res.data)
            }
            catch (err) {
                console.log(err.message)
            }
        }
        const fetchVideos = async () => {
            try {
                const res = await axios.get(`https://video-streaming-app-backend-r6e3.onrender.com/api/videos/search/${search}`)
                // console.log(res.data)
                setsearchedVideo(res.data)
            }
            catch (err) {
                console.log(err.message)
            }
        }
        fetchShorts();
        fetchVideos();
        dispatch(offMic())
    }, [search])

    return (
        <div className={styles.main}>
            <Navbar></Navbar>
            <div className={styles.bigBox}>
                <div className={styles.Sidenav}>
                    <Sidenav />
                </div>
                <div className={styles.box}>
                    <div className={styles.searchFor} style={theme?{backgroundColor:"black"}:{backgroundColor:"white"}}>
                        <div className={styles.toggleBtn} onClick={() => setisShorts(!isShorts)} style={theme ? {} : { borderColor: "black" }}>
                            <div className={isShorts ? styles.toggleRoll : styles.toggleRoll2} style={theme ? {} : { borderColor: "black" }}>
                                {isShorts ? <i className="fa-solid fa-circle-play"></i> : <i className="fa-solid fa-video"></i>}
                            </div>
                            <div className={isShorts ? styles.toggleTitle : styles.toggleTitle2} style={theme ? {} : { borderColor: "black" }}>
                                {isShorts ? "Shorts" : "Videos"}
                            </div>
                        </div>
                        Showing results for <b>{search}</b>
                    </div>
                    <div>
                        <div className={isShorts ? styles.mainShorts : styles.mainShorts2}>
                                {<div className={styles.shortsCard}>
                                    {searchedShorts && searchedShorts.map((video, index) =>
                                        <ShortsCard video={video} key={index} index={index} />
                                    )}
                                </div> }
                                    {searchedShorts && searchedShorts.length === 0 &&
                                <div className={styles.notFound}>
                                    No Shorts Found
                                </div>
                            }
                        </div>
                    </div>
                    <div className={isShorts ? styles.mainVideo2 : styles.mainVideo}>
                            {searchedVideo && searchedVideo?.map((video, index) =>
                                <Cards video={video} key={index} index={index}></Cards>
                            )}
                            
                        {searchedVideo && searchedVideo?.length ===0 &&
                            <div className={styles.notFound}>
                                    No Videos Found
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
