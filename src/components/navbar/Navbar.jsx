import React, { useRef, useState } from 'react'
import styles from "./Navbar.module.css"
import logo from "../assets/Logo.png"

export default function Navbar({ showMenu, setshowMenu }) {
    const [isSearch, setisSearch] = useState(true)
    const inputRef = useRef(null);
    async function searchInp(){
            setisSearch(false)
            setTimeout(()=>{
                inputRef.current.focus();
            },0)
    }
    return (
        <div className={styles.mainNav}>
            <div className={styles.navbar}>
                {
                    isSearch ?
                        <>
                            <div className={styles.logoDetail}>
                                <div className={styles.menu}>
                                    {showMenu ?
                                        <i className="fa-solid fa-xmark" onClick={() => setshowMenu(!showMenu)}></i>
                                        :
                                        <i className="fa-solid fa-bars" onClick={() => setshowMenu(!showMenu)}></i>}
                                </div>
                                <a href="/" className={styles.logoDetail}>
                                    <img src={logo} alt="logoImg" height="30px" />
                                    <span>Stream Sphere</span>
                                </a>
                            </div>
                            <div className={styles.search}>
                                <div>
                                    <input type="text" placeholder='Search here...' id='search'/>
                                    <label htmlFor='search'><span><i className="fa-solid fa-magnifying-glass"></i></span></label>
                                </div>
                            </div>
                            <div className={styles.profile}>
                                <div className={styles.search2}>
                                    <span><i className="fa-solid fa-magnifying-glass" onClick={searchInp}></i></span>
                                </div>
                                <span className={styles.pro}></span>
                            </div>
                        </>
                        :
                        <div className={styles.smallSearch}>
                            <div className={styles.back} onClick={() => setisSearch(true)}>
                                <i className="fa-solid fa-xmark" ></i>
                            </div>
                            <div className={styles.searchInp}>
                                <input type="text" id='searchBtn' placeholder='Search here...' ref={inputRef}/>
                                <span><i className="fa-solid fa-magnifying-glass"></i></span>
                            </div>
                        </div>
                }
            </div>

        </div>
    )
}
