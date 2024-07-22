import React, { useState } from 'react'
import styles from "./Sidenav.module.css"
import { useSelector } from 'react-redux'


export default function Sidenav() {
    const menu = useSelector((state) => state.menu.value)
    return (
        <>
        <div className={menu ? styles.main2 : styles.main}>
            {menu ? <div className={styles.menuList2}>
                <a href="./">
                <div>
                    <i class="fa-solid fa-house"></i>
                    <span>Home</span>
                </div>
                </a>
                <div>
                    <i class="fa-solid fa-video"></i>
                    <span>Shorts</span>
                </div>
                <div>
                    <i class="fa-solid fa-music"></i>
                    <span>Music</span>
                </div>
                <div>
                    <i class="fa-solid fa-download"></i>
                    <span>Download</span>
                </div>
                <hr />
                <div>
                    <span>Subscription</span>
                </div>
                <hr />
                <div>
                    <span>Category</span>
                </div>
            </div>
                :
                <div className={styles.menuList}>
                    <a href="./">
                        <i class="fa-solid fa-house"></i><br />
                        <span>Home</span>
                        </a>
                    <a href="./">
                        <i class="fa-solid fa-video"></i><br />
                        <span>Shorts</span>
                    </a>
                    <a href="./" className={styles.upload}>
                        <i class="fa-solid fa-upload"></i><br />
                        <span>Upload</span>
                    </a>
                    <a href="./">
                        <i class="fa-solid fa-music"></i><br />
                        <span>Music</span>
                    </a>
                    <a href="./">
                        <i class="fa-solid fa-tv"></i><br />
                        <span>Subscription</span>
                    </a>
                    <a href="./" className={styles.download}>
                        <i class="fa-solid fa-download"></i><br />
                        <span>Download</span>
                    </a>
                </div>}
                
        </div>
        <div className={menu ? styles.main3 : styles.main4}>
        </div>
        </>
    )
}
