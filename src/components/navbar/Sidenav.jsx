import React, { useState } from 'react'
import styles from "./Sidenav.module.css"


export default function Sidenav({showMenu}) {
    
    return (
        <>
        <div className={showMenu ? styles.main2 : styles.main}>
            {showMenu ? <div className={styles.menuList2}>
                <div>
                    <i class="fa-solid fa-house"></i>
                    <span>Home</span>
                </div>
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
                    <div>
                        <i class="fa-solid fa-house"></i><br />
                        <span>Home</span>
                    </div>
                    <div>
                        <i class="fa-solid fa-video"></i><br />
                        <span>Shorts</span>
                    </div>
                    <div className={styles.upload}>
                        <i class="fa-solid fa-upload"></i><br />
                        <span>Upload</span>
                    </div>
                    <div>
                        <i class="fa-solid fa-music"></i><br />
                        <span>Music</span>
                    </div>
                    <div>
                        <i class="fa-solid fa-tv"></i><br />
                        <span>Subscription</span>
                    </div>
                    <div className={styles.download}>
                        <i class="fa-solid fa-download"></i><br />
                        <span>Download</span>
                    </div>
                </div>}
                
        </div>
        <div className={showMenu ? styles.main3 : styles.main4}>
        </div>
        </>
    )
}
