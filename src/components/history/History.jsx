import React, { useRef, useState } from 'react'
import styles from './History.module.css'
import { useSelector } from 'react-redux'
import { lightTheme, darkTheme } from '../../themes'

export default function History({ userData }) {
    const theme = useSelector((state) => state.theme.value)
    const scrollRef = useRef()
    const widthRef = useRef()
    const thumbnailRef = useRef()
    const [scroll,setScroll]=useState(true)

    function scrollRight() {
        scrollRef.current.scrollLeft += widthRef.current.clientWidth
    }
    function scrollLeft() {
        scrollRef.current.scrollLeft -= widthRef.current.clientWidth
    }
    function getDuration(duration) {
        duration = Math.floor(duration)
        let sec = Math.floor(duration % 60)
        let min = Math.floor((duration % 3600) / 60)
        let hr = Math.floor(duration / 3600)
        sec = sec <= 9 ? "0" + sec : sec
        min = min <= 9 ? "0" + min : min
        if (hr) {
            return hr + ":" + min + ":" + sec
        }
        else if (min) {
            return min + ":" + sec
        }
        else {
            return min + ":" + sec
        }
    }
    return (
        <div className={styles.main}>


            <div className={styles.watched} ref={scrollRef}>
                {
                    userData?.toReversed().map((video, index) =>
                        <div className={styles.container} key={index} ref={widthRef}>
                            <div className={styles.thumbnail} ref={thumbnailRef}>
                                <a href={`player/${video?._id}`}>
                                    <img src={video?.imageUrl} width="100%" height="100%" alt="thumbnail" />
                                </a>
                                <div className={styles.duration}>{getDuration(video?.duration)}</div>
                            </div>
                            <div className={styles.videoDetail} style={theme ? darkTheme : lightTheme}>
                                {/* <div className={styles.icon}>
                                    <a href="/userDetail/userid">
                                        <img src={"https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmF0dXJlfGVufDB8MHwwfHx8MA%3D%3D"} width="100%" height="100%" alt="icon" />
                                    </a>
                                </div> */}
                                <div className={styles.details}>
                                    <a href={`/player/${video?._id}`} style={theme ? { color: "white" } : { color: "black" }}>
                                        <div className={styles.title}>
                                            {video?.title}
                                        </div>
                                        <div className={styles.channel}>
                                            <div className={styles.channelNames}>
                                                {video?.name}
                                            </div>
                                            <div>
                                                {video?.views} Views
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>

            {userData &&
                <><div className={styles.arrowRight} onClick={scrollRight} style={theme ? { backgroundColor: "rgb(60, 60, 60)", color: "white" } : { backgroundColor: "rgb(220, 220, 220)", color: "black" }}>
                    <i className="fa-solid fa-chevron-right"></i>
                </div>
                    <div className={styles.arrowLeft} onClick={scrollLeft} style={theme ? { backgroundColor: "rgb(60, 60, 60)", color: "white" } : { backgroundColor: "rgb(220, 220, 220)", color: "black" }}>
                        <i className="fa-solid fa-chevron-left"></i>
                    </div>
                </>}
        </div>
    )
}
