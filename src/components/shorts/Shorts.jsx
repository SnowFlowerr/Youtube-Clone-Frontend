import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { offMic } from '../../redux/Data/micSlice'
import { darkTheme, lightTheme } from '../../themes'
import logo from "../assets/Logo.png"
import Navbar from '../navbar/Navbar'
import Sidenav from '../navbar/Sidenav'
import { VideoCard } from './short'
import styles from "./Shorts.module.css"

export default function Shorts() {

    const [videoData, setvideoData] = useState([])
    // const arr=[2,2,2,2,2,2,2,2]
    const [vidData, setvidData] = useState({ title: "Title" })
    let { id } = useParams();
    const navigate = useNavigate()
    const [currentUrl, setCurrentUrl] = useState(null);
    const dispatch = useDispatch()
    const theme = useSelector((state) => state.theme.value)
    const sign = useSelector((state) => state.sign.value)
    // const [limit, setLimit] = useState(2)
    const [skip, setSkip] = useState(0)
    const lastVid = useRef(null)
    const [last, setLast] = useState(false)
    const [noMore, setnoMore] = useState(false)
    const [url, setUrl] = useState("url");

    const handlePlay = (url) => {
        setCurrentUrl(url);
    };


    useEffect(() => {
        if (id === "url") {
            setUrl("")
        }
        else {
            setUrl(id)
        }
        dispatch(offMic())
    }, [])

    useEffect(() => {
        async function fetchData1() {
            try {
                if (id !== "url" && id) {
                    const vidData = await axios.get(`https://video-streaming-app-backend-r6e3.onrender.com/api/shorts/${id}`)
                    setvidData(vidData.data)
                }
            }
            catch (err) {
                navigate("/notFound")
                console.log(err.message)
            }
        }
        fetchData1()
    }, [])
    useEffect(() => {
        async function fetchData() {
            try {
                const videosData = await axios.get(`https://video-streaming-app-backend-r6e3.onrender.com/api/shorts/?limit=${5}&skip=${0}`)

                // console.log(videosData.data)
                if (videosData.data.length !== 0) {
                    if(videoData.length!==0){
                        videoData.pop()
                    }
                    // console.log(arr)
                    setvideoData([...videoData, ...videosData.data, "Loading"])
                    setLast(true)
                }
                else {
                    setnoMore(true)
                }
            }
            catch (err) {
                // navigate("/notFound")
                console.log(err.message)
            }
        }
        fetchData()
    }, [skip])

    useEffect(() => {
        if (currentUrl !== null) {
            navigate(`/shorts/${currentUrl}`)
        }
        const handlePopState = (event) => {
            if (window.location.pathname !== '/') {
                navigate('/');
            }
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [currentUrl])

    function handleScroll() {
        let divHeight = lastVid.current.offsetHeight
        let scrollHeight = lastVid.current.scrollHeight
        let scroll = lastVid.current.scrollTop
        if (Math.floor(divHeight + scroll) >= Math.floor(scrollHeight) - 100) {
            if (last && noMore === false) {
                setSkip(skip + 2)
                setLast(false)
            }
        }
    }

    return (
        <div className={styles.bigBox} style={theme ? darkTheme : lightTheme}>
            <div className={styles.mainLogo}>
                <a href="/" className={styles.logoDetail} style={theme ? { color: "white" } : { color: "black" }}>
                    <img src={logo} alt="logoImg" height="25px" />
                    <span>YouTube</span>
                </a>
            </div>
            <div className={styles.nav}>
                <Navbar></Navbar>
            </div>
            <div className={styles.main}>
                <div className={styles.sidenav}>
                    <Sidenav></Sidenav>
                </div>
                <div className={styles.box}>
                    <div className={styles.videoBox} ref={lastVid} onScroll={handleScroll}>
                        {url !== "" &&
                            <div className={styles.card}>
                                <VideoCard data={url ? vidData : "url"} index={-1} onPlay={handlePlay}></VideoCard>
                            </div>}
                        {videoData.map((shorts, index, length) =>
                            <div key={index} className={styles.card}>
                                <VideoCard data={shorts} index={index + 1} onPlay={handlePlay} length={length.length} noMore={noMore}></VideoCard>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

