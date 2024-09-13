import React, { useState } from 'react'
import styles from "./Comment.module.css"
import { useSelector } from 'react-redux';
import axios from 'axios';

export default function Extraopt({comment}) {
    const [option, setOption] = useState(false)
    const theme = useSelector((state) => state.theme.value);
    const sign = useSelector((state) => state.sign?.value)

        async function delComment() {
            if(comment._id){
                setOption(false)
                try {
                    await axios.delete(`https://honest-stillness-production.up.railway.app/api/comments/${comment._id}`,{withCredentials:true})
                }
                catch (err) {
                    console.log(err)
                }
            }
        }

        function RepComment() {
                setOption(false)
        }

    return (
        <>
            <div className={styles.extraOpt} onClick={() => setOption(!option)}>
                <i class="fa-solid fa-ellipsis-vertical"></i>
            </div>
            {option &&
                <>
                    <div className={styles.close} onClick={() => setOption(false)}></div>
                    <div className={styles.opt} style={theme?{}:{backgroundColor:"rgb(173, 173, 173)"}}>
                        {sign._id===comment?.userId?._id&&
                        <div onClick={delComment}>
                            <i className="fa-solid fa-trash"></i> Delete
                        </div>}
                        <div onClick={RepComment}>
                        <i className="fa-solid fa-flag"></i> Report
                        </div>
                    </div>
                </>
            }
        </>
    )
}
