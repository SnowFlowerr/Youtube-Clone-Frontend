import React, { useEffect, useState } from 'react'
import styles from "./Shorts.module.css"
import Navbar from '../navbar/Navbar'
import Sidenav from '../navbar/Sidenav'
import { useNavigate, useParams } from 'react-router-dom'
import { VideoCard } from './short'
import { darkTheme, lightTheme } from '../../themes'
import { useSelector } from 'react-redux'

export default function Shorts() {
    const arr = [3, 4, 4, 4, 3, 3, 33, 3]
    let { id } = useParams();
    const navigate = useNavigate()
    const [currentVideoIndex, setCurrentVideoIndex] = useState(null);
    const theme = useSelector((state) => state.theme.value)
    const handlePlay = (index) => {
        setCurrentVideoIndex(index);
    };
    useEffect(() => {
        navigate(`/shorts/${currentVideoIndex}`)
        const handlePopState = (event) => {
            if (window.location.pathname !== '/') {
                navigate('/'); // Redirect to root
            }
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [currentVideoIndex])

    return (
        <div className={styles.bigBox} style={theme?darkTheme:lightTheme}>
            <div className={styles.nav}>
                <Navbar></Navbar>
            </div>
            <div className={styles.main}>
                <div className={styles.sidenav}>
                    <Sidenav></Sidenav>
                </div>
                <div className={styles.box}>
                    <div className={styles.videoBox}>
                        <div className={styles.card}>
                            <VideoCard src={id} onPlay={handlePlay}></VideoCard>
                        </div>
                        {arr.map((shorts, index) =>
                            <div key={index} className={styles.card}>
                                <VideoCard src={index} onPlay={handlePlay}></VideoCard>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

