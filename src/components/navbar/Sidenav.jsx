import React, { useEffect, useState } from 'react'
import styles from "./Sidenav.module.css"
import { useSelector } from 'react-redux'
import { darkTheme, lightTheme } from '../../themes'
import { Link, useLocation } from 'react-router-dom'


export default function Sidenav() {
    const menu = useSelector((state) => state.menu.value)
    const theme = useSelector((state) => state.theme.value)
    const sign = useSelector((state) => state.sign.value)
    const location = useLocation();
    const [home, setHome] = useState(false)
    const [shorts, setShorts] = useState(false)
    const [history, setHistory] = useState(false)
    useEffect(() => {
        const path = location.pathname;
        if (path === '/') {
            setHome(true)
        }
        else if (path.includes('shorts')) {
            setShorts(true)
        }
        else if (path.includes('history')) {
            setHistory(true)
        }
    }, [location.pathname])
    return (
        <>
            <div className={menu ? styles.main2 : styles.main} style={theme ? darkTheme : lightTheme}>
                {menu ? <div className={styles.menuList2}>
                    <Link to="/" style={theme ? home ? { backgroundColor: "rgb(60, 60, 60)", color: "white" } : darkTheme : home ? { backgroundColor: "rgb(220, 220, 220)", color: "black" } : lightTheme} >
                        <div>
                            {home ? <i class="fa-solid fa-house fa-bounce"></i> : <i className="fa-solid fa-house"></i>}
                            <span>Home</span>
                        </div>
                    </Link>
                    <a href="/shorts/url" className={styles.shorts} style={theme ? shorts ? { backgroundColor: "rgb(60, 60, 60)", color: "white" } : darkTheme : shorts ? { backgroundColor: "rgb(220, 220, 220)", color: "black" } : lightTheme} >
                        <div>
                            {shorts ? <i className="fa-solid fa-video fa-bounce"></i> : <i className="fa-solid fa-video"></i>}
                            <span>Shorts</span>
                        </div>
                    </a>
                    <Link to="/" className={styles.music} style={theme ? darkTheme : lightTheme}>
                        <div>
                            <i className="fa-solid fa-music"></i>
                            <span>Music</span>
                        </div>
                    </Link>
                    <Link to="/" className={styles.downloads} style={theme ? darkTheme : lightTheme}>
                        <div>
                            <i className="fa-solid fa-download"></i>
                            <span>Download</span>
                        </div>
                    </Link>
                    {sign &&
                        <Link to="/history" style={theme ? history ? { backgroundColor: "rgb(60, 60, 60)", color: "white" } : darkTheme : history ? { backgroundColor: "rgb(220, 220, 220)", color: "black" } : lightTheme} >
                            <div>
                                {history ? <i className="fa-solid fa-clock-rotate-left fa-bounce"></i> : <i className="fa-solid fa-clock-rotate-left"></i>}
                                <span>History</span>
                            </div>
                        </Link>}
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
                    <div className={styles.menuList} style={theme ? darkTheme : lightTheme}>
                        <Link to="/" style={theme ? home ? { backgroundColor: "rgb(60, 60, 60)", color: "white" } : darkTheme : home ? { backgroundColor: "rgb(220, 220, 220)", color: "black" } : lightTheme}>
                            <div>
                                {home ? <i className="fa-solid fa-house fa-bounce"></i> : <i className="fa-solid fa-house"></i>}
                                <br />
                                <span>Home</span>
                            </div>
                        </Link>
                        <a href="/shorts/url" style={theme ? shorts ? { backgroundColor: "rgb(60, 60, 60)", color: "white" } : darkTheme : shorts ? { backgroundColor: "rgb(220, 220, 220)", color: "black" } : lightTheme}>
                            <div>
                                {shorts ? <i className="fa-solid fa-video fa-bounce"></i> : <i className="fa-solid fa-video"></i>}
                                <br />
                                <span>Shorts</span>
                            </div>
                        </a>
                        <Link to="/" className={styles.upload} style={theme ? darkTheme : lightTheme}>
                            <div>
                                <i className="fa-solid fa-upload"></i>
                                <br />
                                <span>Upload</span>
                            </div>
                        </Link>
                        <Link to="/" className={styles.music} style={theme ? darkTheme : lightTheme}>
                            <div>
                                <i className="fa-solid fa-music"></i>
                                <br />
                                <span>Music</span>
                            </div>
                        </Link>
                        <Link to="/" className={styles.subscribe} style={theme ? darkTheme : lightTheme}>
                            <div>
                                <i className="fa-solid fa-tv"></i>
                                <br />
                                <span>Subscription</span>
                            </div>
                        </Link>
                        {sign &&
                            <Link to="/history" className={styles.history} style={theme ? history ? { backgroundColor: "rgb(60, 60, 60)", color: "white" } : darkTheme : history ? { backgroundColor: "rgb(220, 220, 220)", color: "black" } : lightTheme}>
                                <div>
                                    {history ? <i className="fa-solid fa-clock-rotate-left fa-bounce"></i> : <i className="fa-solid fa-clock-rotate-left"></i>}
                                    <br />
                                    <span>History</span>
                                </div>
                            </Link>
                        }
                    </div>}

            </div>
            <div className={menu ? styles.main3 : styles.main4}>
            </div>
        </>
    )
}
