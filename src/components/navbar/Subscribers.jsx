import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./Subscribers.module.css";

export default function Subscribers() {

    const [subsc, setSubsc] = useState([]);
    const navigate=useNavigate()

    useEffect(() => {
        async function getSubs() {
            try {
                const userData = await axios.get("https://video-streaming-app-backend-r6e3.onrender.com/api/users/getsubscriber",
                    { withCredentials: true });
                // console.log(userData.data)
                setSubsc(userData.data)

            }
            catch (err) {
                console.log(err)
            }
        }
        getSubs()
    }, [])

    return (
        <div className={styles.mainBox}>
            {
                subsc.map((subs) =>
                    <div key={subs.channelId} >
                        <div className={styles.main} onClick={()=>navigate(`/channels/${subs.channelId._id}/featured`)}>
                            <div className={styles.Channelicon}>
                                <img src={subs?.channelId?.img} alt="icon" height="100%" width="100%"/>
                            </div>
                            <div>
                                {subs?.channelId?.name}
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
