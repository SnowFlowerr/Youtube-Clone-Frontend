import React from 'react'
import styles from "./PageNotFound.module.css"
import { useSelector } from 'react-redux'

export default function PageNotFound() {
    const theme = useSelector((state) => state.theme.value)
    return (
        <div className={styles.main}>
            <div className={styles.code}>
                404
            </div>
            <div className={styles.message}>
                Page Not Found
            </div>
            <div>
                <a href="/" style={theme?{color:"white"}:{color:"black"}}>
                <button>Return to Home Page</button>
                </a>
            </div>
        </div>
    )
}
