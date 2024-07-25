import React, { useRef, useState } from 'react'
import { showMenu } from '../../redux/Data/menuSlice'
import { changeTheme } from '../../redux/Data/themeSlice'
import logo from "../assets/Logo.png"
import styles from "./Navbar.module.css"
import { useDispatch, useSelector } from 'react-redux'
import { lightTheme,darkTheme } from '../../themes'

export default function Navbar() {
    const [isSearch, setisSearch] = useState(true)
    const [isSign, setisSign] = useState(false)
    const inputRef = useRef(null);
    const menu = useSelector((state) => state.menu.value)
    const theme = useSelector((state) => state.theme.value)
    const dispach = useDispatch();



    function searchInp() {
        setisSearch(false)
        setTimeout(() => {
            inputRef.current.focus();
        }, 0)
    }
    return (
        <div className={styles.mainNav}>
            <div className={styles.navbar} style={theme?darkTheme:lightTheme}>
                {
                    isSearch ?
                        <>
                            <div className={styles.logoDetail}>
                                <div className={styles.menu}>
                                    {menu ?
                                        <i className="fa-solid fa-xmark" onClick={() => dispach(showMenu())}></i>
                                        :
                                        <i className="fa-solid fa-bars" onClick={() => dispach(showMenu())}></i>}
                                </div>
                                <a href="/" className={styles.logoDetail}  style={theme?darkTheme:lightTheme}>
                                    <img src={logo} alt="logoImg" height="30px" />
                                    <span>StreamSphere</span>
                                </a>
                            </div>
                            <div className={styles.search} >
                                <form>
                                    <input type="text" placeholder='Search here...'  style={theme?darkTheme:lightTheme}/>
                                    <span style={theme?{}:{backgroundColor:"rgb(220, 220, 220)",color:"black"}}><i className="fa-solid fa-magnifying-glass"></i></span>
                                </form>
                            </div>
                            <div className={styles.profile}>
                                <div className={styles.search2} >
                                    <span style={theme?darkTheme:lightTheme}>
                                        <i className="fa-solid fa-magnifying-glass" onClick={searchInp} ></i>
                                    </span>
                                </div>
                                <div className={styles.lastNav}>
                                    <div className={styles.theme} onClick={() => dispach(changeTheme())}>
                                        <i class="fa-solid fa-moon"></i>
                                    </div>
                                    <div className={styles.upload}>
                                        <i class="fa-solid fa-upload"></i>
                                    </div>
                                    {isSign ?
                                        <span className={styles.pro}></span>
                                        :
                                        <a href="/signin" style={theme?darkTheme:lightTheme}><div className={styles.signin}>Sign in</div></a>
                                    }
                                </div>
                            </div>
                        </>
                        :
                        <div className={styles.smallSearch}>
                            <div className={styles.searchInp}>
                                <input type="text" id='searchBtn' placeholder='Search here...' ref={inputRef} style={theme?darkTheme:lightTheme}/>
                                <span><i className="fa-solid fa-magnifying-glass"></i></span>
                            </div>
                            <div className={styles.back} onClick={() => setisSearch(true)}>
                                <i className="fa-solid fa-xmark" ></i>
                            </div>
                        </div>
                }
            </div>

        </div>
    )
}
