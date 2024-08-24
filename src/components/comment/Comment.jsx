import React, { useEffect, useRef, useState } from 'react'
import styles from "./Comment.module.css"
import Emoji from '../emoji/Emoji'

export default function Comment() {
    const [isEmoji, setIsemoji] = useState(false)
    const [isComment, setisComment] = useState(false)
    const [comment, setComment] = useState("")
    const commentRef = useRef(null)
    const [comments, setComments] = useState([1, 2, 3, 4, 2, 3, 4, 2, 3, 4, 2, 3, 4, 2, 3, 4])

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
    return (
        <div className={styles.mainBox}>
            <div className={styles.heading}>
                Comments
            </div>
            <div className={styles.addComments}>
                <div className={styles.userIcon}>
                <img src={"https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmF0dXJlfGVufDB8MHwwfHx8MA%3D%3D"} width="100%" height="100%" alt="thumbnail" />
                </div>
                <form className={isComment ? styles.commentInput2 : styles.commentInput}>
                    <textarea type="text" placeholder='Add a comment...' value={comment} onClick={() => setisComment(true)} onChange={handleComment} ref={commentRef} />
                </form>
            </div>
            {isComment &&
                <div className={styles.commentOption}>
                    <div className={styles.emoji}>
                        <div className={styles.emojiIcon}>
                            <i className="fa-solid fa-icons" onClick={() => setIsemoji(!isEmoji)}></i>
                        </div>
                        <Emoji setIsemoji={setIsemoji} isEmoji={isEmoji} setComment={setComment} comment={comment} commentRef={commentRef}></Emoji>
                    </div>
                    <div className={styles.emojiBtn}>
                        <button onClick={handleCancel}>Cancel</button>
                        <button>Comment</button>
                    </div>
                </div>
            }
            <div className={styles.comments}>
                {
                    comments.map((data,index) =>
                        <div key={index} className={styles.singleComment}>
                            <div className={styles.userIcon}>
                            <img src={"https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmF0dXJlfGVufDB8MHwwfHx8MA%3D%3D"} width="100%" height="100%" alt="thumbnail" />
                            </div>
                            <div className={styles.userComments}>
                                <div className={styles.username}>
                                    @name
                                </div>
                                <div className={styles.commentText}>
                                    hi i am ...
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
