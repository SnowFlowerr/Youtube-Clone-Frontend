import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { format } from 'timeago.js'
import { darkTheme, lightTheme } from '../../themes'
import styles from './Home.module.css'


export default function Cards({ video }) {

    const theme = useSelector((state) => state.theme.value)
    const [user,setUser]=useState("")

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

    useEffect(()=>{
        async function currentUser() {
            try {
                const userD = await axios.get(`http://localhost:8000/api/users/get/${video?.userId}`,
                    { withCredentials: true }
                )
                setUser(userD.data)
            }
            catch (err) {
                console.log(err)
            }
        }
        currentUser()
    },[])

    return (
        <>
            <div className={styles.singleVid} style={theme ? darkTheme : lightTheme}>
                <div className={styles.thumbnail}>
                    <Link to={`player/${video?._id}`}>
                        <img src={video.imageUrl} width="100%" height="100%" alt="thumbnail" />
                    </Link>
                    <div className={styles.duration}>{getDuration(video?.duration)}</div>
                </div>
                <div className={styles.videoDetail} style={theme ? darkTheme : lightTheme}>
                    <div className={styles.icon}>
                        <a href="/userDetail/userid">
                            <img src={user?.img} width="100%" height="100%" alt="icon" />
                        </a>
                    </div>
                    <div className={styles.details}>
                        <Link to={`/player/${video?._id}`} style={theme ? { color: "white" } : { color: "black" }}>
                            <div className={styles.title}>
                                {video?.title}
                            </div>
                            <div className={styles.channel}>
                                <div className={styles.channelNames}>
                                    {user?.name}
                                </div>
                                <div>
                                    {video?.views} Views . {format(video.createdAt)}

                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
