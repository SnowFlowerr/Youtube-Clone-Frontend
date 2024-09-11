import React, { useEffect, useState } from 'react'
import styles from "./Emoji.module.css"
import EmojiPicker from 'emoji-picker-react';
import { useSelector } from 'react-redux';
import { SuggestionMode } from 'emoji-picker-react';


export default function Emoji({ setIsemoji, isEmoji, setComment, comment, commentRef }) {
    const theme = useSelector((state) => state.theme.value)

    useEffect(() => {
        setTimeout(() => {
            commentRef.current.focus()
        }, 0)
    }, [isEmoji])

    async function setCursor(ind) {
        await commentRef.current.focus()
        commentRef.current.setSelectionRange(ind, ind)
    }
    async function handleEmoji(data) {
        const index = commentRef.current.selectionStart
        let string = comment.slice(0, index) + data.emoji + comment.slice(index, comment.length);
        setComment(()=>string)
        setCursor(index + 2)
    }
    return (
        <div className={styles.emoji}>
            <EmojiPicker theme={theme ? "dark" : "light"} reactionsDefaultOpen={true} open={isEmoji} onEmojiClick={(emojiData) => handleEmoji(emojiData)} width={"100%"}/>
        </div>
    )
}
