import React, { useEffect, useState } from 'react'
import styles from "./Shorts.module.css"
import Navbar from '../navbar/Navbar'
import Sidenav from '../navbar/Sidenav'
import { useNavigate, useParams } from 'react-router-dom'
import { VideoCard } from './short'
import { darkTheme, lightTheme } from '../../themes'
import { useDispatch, useSelector } from 'react-redux'
import logo from "../assets/Logo.png"
import { offMic } from '../../redux/Data/micSlice'
import axios from 'axios'

export default function Shorts() {
    
    const [videoData, setvideoData] = useState([{ title: "Title" },{ title: "Title" }])
    // const arr=[2,2,2,2,2,2,2,2]
    const [vidData, setvidData] = useState({ title: "Title" })
    let { id } = useParams();
    const navigate = useNavigate()
    const [currentVideoIndex, setCurrentVideoIndex] = useState(null);
    const dispatch=useDispatch()
    const theme = useSelector((state) => state.theme.value)
    const handlePlay = (index) => {
        setCurrentVideoIndex(index);
    };
    const [url, setUrl] = useState("url");
    useEffect(()=>{
        if(id==="nulll"){
            setUrl("")
        }
        else{
            setUrl(id)
        }
        dispatch(offMic())
    },[])

    useEffect(() => {
        async function fetchData() {
            try {
                if(id!=="nulll"){
                    const vidData = await axios.get(`http://localhost:8000/api/shorts/${id}`)
                    setvidData(vidData.data)
                }
                const videosData = await axios.get(`http://localhost:8000/api/shorts`)
                setvideoData(videosData.data)
            }
            catch (err) {
                console.log(err.message)
            }
        }
        fetchData()
    }, [])
    
    useEffect(() => {
        if (currentVideoIndex !== null) {
            navigate(`/shorts/${currentVideoIndex}`)
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
    }, [currentVideoIndex])

    return (
        <div className={styles.bigBox} style={theme ? darkTheme : lightTheme}>
            <div className={styles.mainLogo}>
                <a href="/" className={styles.logoDetail} style={theme ? {color:"white"} : {color:"black"}}>
                    <img src={logo} alt="logoImg" height="30px" />
                    <span>StreamSphere</span>
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
                    <div className={styles.videoBox}>
                        {url!=="" &&
                        <div className={styles.card}>
                            <VideoCard data={url?vidData:"url"} index={-1} onPlay={handlePlay}></VideoCard>
                        </div>}
                        {videoData.map((shorts, index) =>
                            <div key={index} className={styles.card}>
                                <VideoCard data={shorts} index={index} onPlay={handlePlay}></VideoCard>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

