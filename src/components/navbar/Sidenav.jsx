import React, { useState } from 'react'
import styles from "./Sidenav.module.css"
import { useSelector } from 'react-redux'
import { darkTheme, lightTheme } from '../../themes'


export default function Sidenav() {
    const menu = useSelector((state) => state.menu.value)
    const theme = useSelector((state) => state.theme.value)
    return (
        <>
            <div className={menu ? styles.main2 : styles.main} style={theme?darkTheme:lightTheme}>
                {menu ? <div className={styles.menuList2}>
                    <a href="/" style={theme?darkTheme:lightTheme} >
                        <div>
                            <i className="fa-solid fa-house"></i>
                            <span>Home</span>
                        </div>
                    </a>
                    <a href="shorts/jhv" style={theme?darkTheme:lightTheme}>
                        <div>
                            <i className="fa-solid fa-video"></i>
                            <span>Shorts</span>
                        </div>
                    </a>
                    <a href="/" style={theme?darkTheme:lightTheme}>
                        <div>
                            <i className="fa-solid fa-music"></i>
                            <span>Music</span>
                        </div>
                    </a>
                    <a href="/" style={theme?darkTheme:lightTheme}>
                        <div>
                            <i className="fa-solid fa-download"></i>
                            <span>Download</span>
                        </div>
                    </a>
                    <a href="/" style={theme?darkTheme:lightTheme}>
                        <div>
                            <i className="fa-solid fa-clock-rotate-left"></i>
                            <span>History</span>
                        </div>
                    </a>
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
                    <div className={styles.menuList} style={theme?darkTheme:lightTheme}>
                        <a href="/" style={theme?darkTheme:lightTheme}>
                            <div>
                            <i className="fa-solid fa-house"></i><br />
                            <span>Home</span>
                            </div>
                        </a>
                        <a href="/shorts/jhv" style={theme?darkTheme:lightTheme}>
                            <div>
                            <i className="fa-solid fa-video"></i><br />
                            <span>Shorts</span>
                            </div>
                        </a>
                        <a href="/" className={styles.upload} style={theme?darkTheme:lightTheme}>
                            <div>
                            <i className="fa-solid fa-upload"></i><br />
                            <span>Upload</span>
                            </div>
                        </a>
                        <a href="/" style={theme?darkTheme:lightTheme}>
                            <div>
                            <i className="fa-solid fa-music"></i><br />
                            <span>Music</span>
                            </div>
                        </a>
                        <a href="/" style={theme?darkTheme:lightTheme}>
                            <div>
                            <i className="fa-solid fa-tv"></i><br />
                            <span>Subscription</span>
                            </div>
                        </a>
                        <a href="/" className={styles.download} style={theme?darkTheme:lightTheme}>
                            <div>
                            <i className="fa-solid fa-download" ></i><br />
                            <span>Download</span>
                            </div>
                        </a>
                    </div>}

            </div>
            <div className={menu ? styles.main3 : styles.main4}>
            </div>
        </>
    )
}
