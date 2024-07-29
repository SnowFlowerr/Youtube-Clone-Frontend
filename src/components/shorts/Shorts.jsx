import React from 'react'
import styles from "./Shorts.module.css"
import Navbar from '../navbar/Navbar'
import Sidenav from '../navbar/Sidenav'
import { useParams } from 'react-router-dom'
import { VideoCard } from './short'

export default function Shorts() {
    const arr=[3,4,4,4,3,3,33,3]
    let { id } = useParams();
    
    return (
        <div className={styles.bigBox}>
            <div className={styles.nav}>
                <Navbar></Navbar>
            </div>
            <div className={styles.main}>
                <div className={styles.sidenav}>
                    <Sidenav></Sidenav>
                </div>
                <div className={styles.box}>
                    <div className={styles.videoBox}>
                        {arr.map((shorts, index) =>
                            <div key={index} className={styles.card}>
                                <VideoCard src={index}></VideoCard>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

