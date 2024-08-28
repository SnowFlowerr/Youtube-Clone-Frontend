import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { offMic } from '../../redux/Data/micSlice'
import Navbar from '../navbar/Navbar'
import Sidenav from '../navbar/Sidenav'
import Cards from './Cards'
import styles from './Home.module.css'





export default function Home() {
    const [videos, setVideos] = useState([])
    const theme = useSelector((state) => state.theme.value)
    const lastVid = useRef(null)
    const dispatch = useDispatch()
    const [last, setLast] = useState(false)
    // const [limit,setLimit]=useState(20)
    const [skip, setSkip] = useState(0)

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                const res = await axios.get(`https://honeststillness-production.up.railway.app/api/videos/?limit=${20}&skip=${skip}`)
                // console.log(res.data)
                setVideos([...videos, ...res.data])
                if (res.data.length !== 0) {
                    setLast(true)
                }
            }
            catch (err) {
                console.log(err.message)
            }
        }
        fetchVideo();
        dispatch(offMic())
    }, [skip])

    function handleScroll() {
        let divHeight = lastVid.current.offsetHeight
        let scrollHeight = lastVid.current.scrollHeight
        let scroll = lastVid.current.scrollTop
        if (Math.floor(divHeight + scroll) >= Math.floor(scrollHeight) - 1) {
            if (last) {
                setSkip(skip + 20)
                setLast(false)
            }
        }
    }
    
    return (
        <div className={styles.mainBox} ref={lastVid} onScroll={handleScroll}>
            <div className={styles.nav}>
                <Navbar></Navbar>
            </div>
            <div className={styles.bigBox}>
                <div className={styles.Sidenav}>
                    <Sidenav></Sidenav>
                </div>
                <div className={styles.videos}>
                    {
                        videos.map((video, index) =>
                            <Cards video={video} key={index}/>
                        )
                    }

                {videos.length!==0 &&
                <div className={styles.loading}>
                    <div className={styles.loadingBar} style={theme?{}:{borderColor:"black"}}>
                    </div>
                </div>}
                    <div className={styles.bottomNav}>
                        <Sidenav></Sidenav>
                    </div>
                </div>

            </div>
        </div>
    )
}
