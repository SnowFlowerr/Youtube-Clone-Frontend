import React, { useEffect, useRef } from "react";
import styles from "./Progress.module.css"
import { useSelector } from "react-redux";

export default function Progress({progress}) {

    const progressRef=useRef(null)
    const theme = useSelector((state) => state.theme.value)
    useEffect(()=>{
        progressRef.current.style.background=`conic-gradient(${theme?"black":"white"} ${progress}%,${theme?"white":"black"} 0)`
    },[progress,theme])

    return (
        <>
            <div className={styles.progress} ref={progressRef} style={theme?{borderColor:"white"}:{borderColor:"black"}}>
                <div className={styles.progressnum}  style={theme?{borderColor:"black",backgroundColor:"black"}:{borderColor:"white",backgroundColor:"white"}}>
                {progress!==100 ? `${progress}%` : <i className="fa-solid fa-circle-check" style={{fontSize:"300%"}}></i>}
                </div>
            </div>
        </>
    );
}
