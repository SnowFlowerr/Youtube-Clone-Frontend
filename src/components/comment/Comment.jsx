import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import Emoji from '../emoji/Emoji'
import styles from "./Comment.module.css"

export default function Comment({ videoId,isshorts }) {
    const [isEmoji, setIsemoji] = useState(false)
    const [isComment, setisComment] = useState(false)
    const [comment, setComment] = useState(null)
    const commentRef = useRef(null)
    const sign = useSelector((state) => state.sign?.value)
    const theme = useSelector((state) => state.theme.value);
    const [comments, setComments] = useState([])

    useEffect(() => {
        async function getComments() {
            if(videoId){
                try {
                    const comm = await axios.get(`http://localhost:8000/api/comments/${videoId}`)
                    console.log(comm.data)
                    setComments(comm.data)
                }
                catch (err) {
                    console.log(err)
                }
            }
        }
        getComments()
    },)

    function autosize() {
        commentRef.current.style.cssText = `min-height:25px; height: 25px;`;
        commentRef.current.style.cssText = 'height:' + commentRef.current.scrollHeight + 'px';
        commentRef.current.style.color = `${theme ? "white" : "black"}`;
    }

    async function postComments(e) {
        e.preventDefault()
        if (comment) {
            try {
                await axios.post(`http://localhost:8000/api/comments/add/${videoId}`, { comment: comment }, { withCredentials: true })
            }
            catch (err) {
                console.log(err)
            }
            handleCancel(e)
        }
    }

    function handleComment(e) {
        e.preventDefault()
        setIsemoji(false)
        setComment(e.target.value)
    }
    function handleCancel(e) {
        e.preventDefault()
        setComment("")
        setisComment(false)
    }
    useEffect(() => {
        if (comment !== null) {
            autosize()
        }
    }, [comment])
    return (
        <div className={styles.mainBox}>
            <div className={styles.enterDet} style={isshorts?theme?{backgroundColor:"rgb(45, 45, 45)"}:{ backgroundColor: "rgb(220, 220, 220)" }:theme?{backgroundColor:"black"}:{backgroundColor:"white"}}>
                <div className={styles.heading}>
                    Comments
                </div>
                <div className={styles.addComments}>
                    <div className={styles.userIcon}>
                        <img src={sign?.img} width="100%" height="100%" alt="thumbnail" />
                    </div>
                    <form className={styles.commentInput}>
                        <textarea type="text" placeholder='Add a comment...' value={comment} onClick={() => setisComment(true)} onChange={handleComment} ref={commentRef} />
                    </form>
                </div>
                {isComment &&
                    <div className={styles.commentOption}>
                        <div className={styles.emoji}>
                            <div className={styles.emojiIcon}>
                                <i className="fa-solid fa-icons" onClick={() => setIsemoji(!isEmoji)}></i>
                            </div>

                        </div>
                        <div className={styles.emojiBtn}>
                            <button onClick={handleCancel}>Cancel</button>
                            <button onClick={postComments}>Comment</button>
                        </div>
                        <Emoji setIsemoji={setIsemoji} isEmoji={isEmoji} setComment={setComment} comment={comment} commentRef={commentRef}></Emoji>
                    </div>
                }
                <div className={styles.divLine}>
                    <hr />
                </div>
            </div>
            <div className={styles.comments}>
                {
                    comments.map((data, index) =>
                        <div key={index} className={styles.singleComment}>
                            <div className={styles.userIcon}>
                                <img src={data?.userId?.img} width="100%" height="100%" alt="thumbnail" />
                            </div>
                            <div className={styles.userComments}>
                                <div className={styles.username}>
                                    @{data?.userId?.username}
                                </div>
                                <div className={styles.commentText}>
                                    {data?.comment?.split("\n").map((line, index) =>
                                        <div key={index} className={styles.commLine}>{line}</div>
                                    )}
                                </div>
                                <div className={styles.likeDislike}>
                                    <div>
                                        <span><i className="fa-regular fa-thumbs-up"></i></span> 0
                                    </div>
                                    <div>
                                        <span><i className="fa-regular fa-thumbs-down fa-flip-horizontal"></i></span> 0
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
