import React, { useEffect, useRef, useState } from 'react'
import styles from "./Shorts.module.css"
import Navbar from '../navbar/Navbar'
import Sidenav from '../navbar/Sidenav'
import video from "./videoplayback.mp4"
import { useNavigate, useParams } from 'react-router-dom'

export default function Shorts() {
    let arr = [2, 3, 4, 4, 4, 4, 4, 4]
    const [vid, setVid] = useState(false)
    const [scr, setScr] = useState("")
    const navigate = useNavigate()
    const ref = useRef();
    const ref2 = useRef();
    const dotRef = useRef();
    let { id } = useParams();
    useEffect(() => {
        // const handlePermissionRequest = async () => {
        //     try {
        //         const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        //         //   setPermissionDenied(false);
        //         console.log('Audio permission granted:', stream);
        //     } catch (error) {
        //         console.error('Error getting audio permission:', error);
        //     }
        // };
        // handlePermissionRequest()
        document.getElementById(`shorts${id}`).scrollIntoView()
    }, [id])
    useEffect(() => {
        const posDiv = ref2.current.getBoundingClientRect().y;
        const pos = dotRef.current.getBoundingClientRect().y;
        if (posDiv >= 50 && posDiv <= pos) {
            // if (id !== 0) {
                stop()
                // play()
            // }
        }
        else {
            // console.log("fsdc")
            // if (id !== 0) {
                stop()
                // play()
            // }
        }
    }, [scr])
    useEffect(() => {
        const a = document.getElementById("iii").scrollTop
        setScr(a)
        console.log(a)
    }, [id])
    function play() {
        ref.current.play()
    }
    function stop() {
        // ref.current.focus()
        ref2.current.pause()
    }
    return (
        <div className={styles.bigBox}>
            <Navbar></Navbar>
            <div className={styles.main}>
                <div className={styles.sidenav}>
                    <Sidenav></Sidenav>
                </div>
                <div className={styles.box}>
                    <div className={styles.videoBox} id='iii'>
                        {arr.map((shorts, index) =>
                            <div key={index} onMouseEnter={() => { navigate(`/shorts/${index}`) }}>
                                <video
                                    className={styles.video}
                                    id={`shorts${index}`}
                                    // {...()=>console.log(index)}
                                    ref={`${index}` === id ? ref : ref2}
                                    // ref={ref}
                                    // muted

                                    // onFocusCapture={()=>console.log(index)}
                                    autoPlay
                                    controls
                                    poster="">
                                    <source
                                        src={video}
                                        type='video/mp4'
                                    />
                                </video>
                            </div>
                        )}
                        <div className={styles.dot} ref={dotRef}>
                        </div>
                    </div>
                </div>
                {/* <button onClick={() => { setVid(!vid); play() }}>{JSON.stringify(vid)}{id}</button> */}
            </div>
        </div>
    )
}

