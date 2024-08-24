import React, { useRef, useState } from 'react'
import { showMenu } from '../../redux/Data/menuSlice'
import { changeTheme } from '../../redux/Data/themeSlice'
import logo from "../assets/Logo.png"
import styles from "./Navbar.module.css"
import { useDispatch, useSelector } from 'react-redux'
import { lightTheme, darkTheme } from '../../themes'
import { useNavigate } from 'react-router-dom'
import Speech from '../Speech/Speech'
import { offMic } from '../../redux/Data/micSlice'
import Cookies from 'js-cookie';
import Upload from '../upload/Upload'

export default function Navbar() {

    const [isSearch, setisSearch] = useState(true)
    const [signBtn, setSignBtn] = useState(false)
    const [isUpload, setisUpload] = useState(false)
    const inputRef = useRef(null);
    const inputRef2 = useRef(null);
    const suggRef = useRef(null);
    const suggRef2 = useRef(null);
    const menu = useSelector((state) => state.menu.value)
    const theme = useSelector((state) => state.theme.value)
    const sign = useSelector((state) => state.sign.value)
    const [searchInput, setsearchInput] = useState("")
    const dispach = useDispatch();
    const navigate = useNavigate()
    const arr = ['3', '3', '46', '575', '6', '76', "575", '56', '765', '7', '655', '657', '56', '676', '65', '7', '6', '5', '67']

    function handleSearch(e) {
        e.preventDefault();
        setsearchInput(e.target.value)
    }
    function handleSubmit(e) {
        if (searchInput.trim() !== "") {
            navigate(`/searchedvideo/${searchInput}`)
        }
        dispach(offMic())
        suggRef.current.style.visibility = 'hidden';
        suggRef2.current.style.visibility = "hidden"
    }

    function handleClearAll(e) {
        setsearchInput("")
        if (e.target.id === "search" || e.target.id === "search3") {
            inputRef2.current.focus();
            suggRef.current.style.visibility = "visible"
            suggRef2.current.style.visibility = "visible"
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
    function handleSuggestion(ele) {
        setsearchInput(ele)
        inputRef2.current.focus();
    }
    function handleSignMenu() {
        setSignBtn(!signBtn)
        if (signBtn) {
            suggRef2.current.style.visibility = "hidden"
        }
        else {
            suggRef2.current.style.visibility = "visible"
        }
    }
    function handleLogout() {
        Cookies.remove('access_token', { path: '/' });
        localStorage.removeItem("userData")
        window.location.reload()
    }
    return (
        <div className={styles.mainNav}>
            <div className={styles.navbar} style={theme ? darkTheme : lightTheme} >
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
                                    <input type="text" placeholder='Search here...' ref={inputRef2} style={theme ? darkTheme : lightTheme} onChange={handleSearch} onClick={() => { suggRef.current.style.visibility = "visible"; suggRef2.current.style.visibility = "visible" }} spellCheck="true" value={searchInput} />

                                    <div className={styles.suggestion} ref={suggRef} style={theme ? {} : { backgroundColor: "#dadada" }}>
                                        {arr.map((ele, ind) =>
                                            <div key={ind} onClick={() => handleSuggestion(ele)}>{ele}</div>
                                        )}
                                    </div>

                                    {searchInput &&
                                        <span className={styles.clear} style={theme ? {} : { backgroundColor: "rgb(220, 220, 220)", color: "black" }} onClick={handleClearAll} id="search"><i className="fa-solid fa-xmark" style={theme ? { color: "white" } : { color: "black" }} id='search3'></i>
                                        </span>}
                                    <span style={theme ? {} : { backgroundColor: "rgb(220, 220, 220)", color: "black" }} onClick={handleSubmit} ><i className="fa-solid fa-magnifying-glass"></i></span>
                                </form>
                                <Speech setsearchInput={setsearchInput} input1={inputRef2} input2={suggRef} input3={suggRef2}></Speech>

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
                                    <div className={styles.upload} onClick={() => setisUpload(true)}>
                                        <i className="fa-solid fa-upload"></i>
                                    </div>
                                    <div>
                                        {sign.status ?
                                            <>
                                                <div className={styles.pro} onClick={handleSignMenu}>{sign.data.img === "img" ? sign.data.name.substr(0, 1) :
                                                    <img src={sign.data.img} height="100%" width="100%" />}
                                                </div>
                                                {signBtn &&
                                                <div className={styles.signMenu} style={theme ? {} : { backgroundColor: "#dadada" }}>
                                                    <div className={styles.menuProfile}>
                                                        <div className={styles.pro2}>
                                                            {sign.data.img === "img" ? sign.data.name.substr(0, 1) : <img src={sign.data.img} height="100%" width="100%" />}
                                                        </div>
                                                        <div>
                                                            <div className={styles.channelName}>{sign.data.name}</div>
                                                            <div className={styles.username}>@{sign.data.username}</div>
                                                            <div className={styles.myChannel}><a href="/">view your channel</a></div>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div>fesf</div>
                                                    <div>sfdv</div>
                                                    <div>fdvsvf</div>
                                                    <div onClick={handleLogout}>Logout</div>
                                                </div>}
                                            </>
                                            :
                                            <a href="/signin" style={theme ? darkTheme : lightTheme}>
                                                <div className={styles.signin}>Sign in</div>
                                            </a>
                                        }
                                    </div>
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
                            <Speech setsearchInput={setsearchInput} input={inputRef}></Speech>
                            {!searchInput && <div className={styles.back} onClick={() => setisSearch(true)}>
                                <i className="fa-solid fa-xmark" ></i>
                            </div>}
                        </div>
                }
            </div>
            <div className={styles.suggCont} ref={suggRef2} onClick={() => { suggRef.current.style.visibility = "hidden"; suggRef2.current.style.visibility = "hidden"; setSignBtn(false) }}></div>
            <div>
                <Upload isUpload={isUpload} setisUpload={setisUpload}></Upload>
            </div>
        </div>
    )
}
