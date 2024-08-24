import React, { useRef } from 'react'
import styles from "./SimilarVideos.module.css"
import { useSelector } from 'react-redux'
import { lightTheme, darkTheme } from '../../themes'

export default function SimilarVideos({userData1}) {
    const userData=[1,2,3,4,5,6,5,5]
    const theme = useSelector((state) => state.theme.value)
    const scrollRef=useRef(null)
    function getDuration(duration) {
        duration=Math.floor(duration)
        let sec= Math.floor(duration % 60)
        let min= Math.floor(duration / 60)
        let hr= Math.floor(duration / 3600)
        if(hr){
            return hr+":"+min+":"+sec
        }
        else if(min){
            return min+":"+sec
        }
        else{
            return min+":"+sec
        }
    }
    return (
        <div>
            <div className={styles.watched} ref={scrollRef}>
                {
                    // userData?.toReversed().map((video, index) =>
                    userData?.map((video, index) =>
                        <div className={styles.container} key={index}>
                            <div className={styles.thumbnail} >
                                <a href={`player/${video?._id}`}>
                                    <img src={"https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg"} width="100%" height="100%" alt="thumbnail" />
                                </a>
                                <div className={styles.duration}>{getDuration(20)}</div>
                            </div>
                            <div className={styles.videoDetail} style={theme ? darkTheme : lightTheme}>
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
        </div>
    )
}
