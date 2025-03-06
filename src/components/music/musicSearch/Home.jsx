import React from 'react'
import Navbar from '../../navbar/Navbar'
import Sidenav from '../../navbar/Sidenav'
import styles from './Home.module.css'
import Player from '../musicPlayer/Player'

export default function Home() {
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
                    <Player></Player>
                </div>
                </div>
            </div>
        </div>
    )
}
