import React, { useEffect, useRef, useState } from 'react'
import { showMenu } from '../../redux/Data/menuSlice'
import { changeTheme } from '../../redux/Data/themeSlice'
import logo from "../assets/Logo.png"
import styles from "./Navbar.module.css"
import { useDispatch, useSelector } from 'react-redux'
import { lightTheme, darkTheme } from '../../themes'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
    const [isSearch, setisSearch] = useState(true)
    const [isSign, setisSign] = useState(true)
    const inputRef = useRef(null);
    const inputRef2 = useRef(null);
    const menu = useSelector((state) => state.menu.value)
    const theme = useSelector((state) => state.theme.value)
    const dispach = useDispatch();
    const navigate = useNavigate()

    const [searchInput, setsearchInput] = useState("")
    function handleSearch(e) {
        e.preventDefault();
        setsearchInput(e.target.value)
    }
    function handleSubmit(e) {
        if (searchInput.trim()) {
            navigate(`searchedvideo/${searchInput}`)
        }
    }
    useEffect(() => {

    }, [])
    function handleClearAll(e) {
        setsearchInput("")
        if (e.target.id === "search" || e.target.id === "search3") {
            inputRef2.current.focus();
        }
        else if (e.target.id === "search2") {
            inputRef.current.focus();
        }
    }

    function searchInp() {
        setisSearch(false)
        setTimeout(() => {
            inputRef.current.focus();
        }, 0)
    }
    return (
        <div className={styles.mainNav}>
            <div className={styles.navbar} style={theme ? darkTheme : lightTheme}>
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
                                <a href="/" className={styles.logoDetail} style={theme ? darkTheme : lightTheme}>
                                    <img src={logo} alt="logoImg" height="30px" />
                                    <span>StreamSphere</span>
                                </a>
                            </div>
                            <div className={styles.search} >
                                <form onSubmit={handleSubmit}>
                                    <input type="text" placeholder='Search here...' ref={inputRef2} style={theme ? darkTheme : lightTheme} onChange={handleSearch} value={searchInput} />
                                    {searchInput &&
                                        <span className={styles.clear} style={theme ? {} : { backgroundColor: "rgb(220, 220, 220)", color: "black" }} onClick={handleClearAll} id="search"><i className="fa-solid fa-xmark" style={theme ? { color: "white" } : { color: "black" }} id='search3'></i>
                                        </span>}
                                    <span style={theme ? {} : { backgroundColor: "rgb(220, 220, 220)", color: "black" }} onClick={handleSubmit}><i className="fa-solid fa-magnifying-glass"></i></span>
                                </form>
                            </div>
                            <div className={styles.profile}>
                                <div className={styles.search2} >
                                    <span style={theme ? darkTheme : lightTheme}>
                                        <i className="fa-solid fa-magnifying-glass" onClick={searchInp} ></i>
                                    </span>
                                </div>
                                <div className={styles.lastNav}>
                                    <div className={styles.theme} onClick={() => dispach(changeTheme())}>
                                        {theme ? <i className="fa-solid fa-sun"></i> : <i className="fa-solid fa-moon"></i>}
                                    </div>
                                    <div className={styles.upload}>
                                        <i className="fa-solid fa-upload"></i>
                                    </div>
                                    {isSign ?
                                        <span className={styles.pro}></span>
                                        :
                                        <a href="/signin" style={theme ? darkTheme : lightTheme}><div className={styles.signin}>Sign in</div></a>
                                    }
                                </div>
                            </div>
                        </>
                        :
                        <div className={styles.smallSearch}>
                            <form className={styles.searchInp} onSubmit={handleSubmit}>
                                <input type="text" id='searchBtn' placeholder='Search here...' ref={inputRef} style={theme ? darkTheme : lightTheme} onChange={handleSearch} value={searchInput} />
                                <div className={styles.clearAll}>
                                    {searchInput && <i className="fa-solid fa-xmark" style={theme ? { color: "white" } : { color: "black" }} onClick={handleClearAll} id="search2"></i>}
                                    <i className="fa-solid fa-magnifying-glass" style={theme ? { color: "white" } : { color: "black" }} onClick={handleSubmit}></i>

                                </div>
                            </form>
                            {!searchInput && <div className={styles.back} onClick={() => setisSearch(true)}>
                                <i className="fa-solid fa-xmark" ></i>
                            </div>}
                        </div>
                }
            </div>

        </div>
    )
}
