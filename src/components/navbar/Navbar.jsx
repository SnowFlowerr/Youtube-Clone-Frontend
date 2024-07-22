import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showMenu } from '../../redux/Data/menuSlice'
import logo from "../assets/Logo.png"
import styles from "./Navbar.module.css"

export default function Navbar() {
    const [isSearch, setisSearch] = useState(true)
    const inputRef = useRef(null);
    const menu = useSelector((state) => state.menu.value)
    const dispach = useDispatch();



    function searchInp(){
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
                                    {menu ?
                                        <i className="fa-solid fa-xmark" onClick={() => dispach(showMenu())}></i>
                                        :
                                        <i className="fa-solid fa-bars" onClick={() => dispach(showMenu())}></i>}
                                </div>
                                <a href="/" className={styles.logoDetail}>
                                    <img src={logo} alt="logoImg" height="30px" />
                                    <span>Stream Sphere</span>
                                </a>
                            </div>
                            <div className={styles.search}>
                                <div>
                                    <input type="text" placeholder='Search here...'/>
                                    <span><i className="fa-solid fa-magnifying-glass"></i></span>
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
                            <div className={styles.searchInp}>
                                <input type="text" id='searchBtn' placeholder='Search here...' ref={inputRef}/>
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
