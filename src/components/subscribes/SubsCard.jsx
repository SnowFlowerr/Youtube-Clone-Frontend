import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { darkTheme, lightTheme } from '../../themes'
import styles from "./Subscribes.module.css"

export default function SubsCard({ channel }) {
    const theme = useSelector((state) => state.theme.value)
    const [isSubs, setisSubs] = useState(true)
    const [subs, setSubs] = useState(channel.followers)
    const navigate=useNavigate()

    async function handleSubscribe() {
        try {
            if (isSubs) {
                await axios.delete(`http://localhost:8000/api/users/unsubscribe/${channel._id}`,
                    
                    { withCredentials: true }
                );
                setSubs(subs - 1)
                console.log("Unsubscribe")
            }
            else {
                await axios.put(`http://localhost:8000/api/users/subscribe/${channel._id}`,
                    {},
                    { withCredentials: true }
                );
                setSubs(subs + 1)
                console.log("Subscribe")
            }
            setisSubs(!isSubs)
            // console.log("err?.response?.data")
        }
        catch (err) {
            console.log(err?.response?.data)
        }

    }
    return (
        <div className={styles.singleChannel}>
            <div className={styles.channelIcon} onClick={()=>navigate(`/channels/${channel._id}/featured`)}>
                <img src={channel?.img} alt="" height="100%" width="100%" />
            </div>
            <div className={styles.channelDetail} onClick={()=>navigate(`/channels/${channel._id}/featured`)}>
                <div className={styles.channelName}>
                    {channel.name}
                </div>
                <div className={styles.channelDesc}>
                    <span>@{channel.username}</span> . <span> {subs} Subscribers</span>
                </div>
                <div className={styles.channelInfo}>
                    {channel.channelInfo}
                </div>
            </div>
            <div className={styles.btns}>
                <div className={styles.channelBtn} style={theme ? isSubs ? { backgroundColor: "#2e2e2e", color: "white" } : lightTheme : isSubs ? { backgroundColor: "rgb(220, 220, 220)", color: "black" } : darkTheme} onClick={handleSubscribe}>
                    {isSubs ?
                        "Subscribed"
                        :
                        "Subscribe"
                    }
                </div>
            </div>
        </div>
    )
}
