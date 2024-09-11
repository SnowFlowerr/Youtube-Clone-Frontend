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
                const userData = await axios.get("https://honest-stillness-production.up.railway.app/api/users/getsubscriber",
                    { withCredentials: true });
                // console.log(userData.data?.followedUser)
                setSubsc(userData.data?.followedUser)

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
                subsc?.map((subs, index) =>
                    <div key={index} >
                        {subs._id &&
                        <div className={styles.main} onClick={()=>navigate(`/channels/${subs._id}/featured`)}>
                            <div className={styles.Channelicon}>
                                <img src={subs?.img} alt="" height="100%" width="100%"/>
                            </div>
                            <div>
                                {subs?.name}
                            </div>
                        </div>}
                    </div>
                )
            }
        </div>
    )
}
