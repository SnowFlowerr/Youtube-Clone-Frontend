import React, { useRef, useEffect } from 'react';
import styles from "./Shorts.module.css"
import video from "./videoplayback.mp4"
import { useSelector } from 'react-redux'
import Share from '../Share/Share';
export const VideoCard = ({ src, onPlay, data }) => {
    const videoRef = useRef(null);
    const theme = useSelector((state) => state.theme.value)

    useEffect(() => {
        const handlePlayStop = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    onPlay(src);  // Notify parent component that this video is playing
                    videoRef.current.currentTime = 0; // Reset video to the beginning
                    videoRef.current.play().then(() => {
                    }).catch((error) => {
                        console.error('Error trying to play video:', error);
                    });
                } else {
                    if (videoRef.current === null) {
                        return
                    }
                    videoRef.current.pause();
                    videoRef.current.currentTime = 0; // Stop video and reset to the beginning
                }
            });
        };

        const observer = new IntersectionObserver(handlePlayStop, { threshold: 0.5 });

        if (videoRef.current) {
            observer.observe(videoRef.current);
        }

        return () => {
            if (videoRef.current) {
                observer.unobserve(videoRef.current);
            }
        };
    }, [src, onPlay]);


    return (
        <>
            <span className={styles.span}>
                <video className={styles.video} ref={videoRef} src={video} autoPlay controls />
                <div className={styles.name}>
                    <div className={styles.icon}>

                    </div>
                    <div>
                        {data?.title}
                    </div>
                    <div className={styles.subs}>
                        Subscribe
                    </div>
                </div>
            </span>
            <div className={styles.details}>
                <div className={styles.first}>
                    <div className={styles.span1} style={theme ? {} : { backgroundColor: "rgb(220, 220, 220)" }}>
                        <i className="fa-solid fa-thumbs-up"></i>
                    </div>
                    like
                </div>
                <div className={styles.first}>
                    <div className={styles.span1} style={theme ? {} : { backgroundColor: "rgb(220, 220, 220)" }}>
                        <i className="fa-solid fa-thumbs-down fa-flip-horizontal"></i>
                    </div>
                    Dislike
                </div>
                <div className={styles.first}>
                    <div className={styles.span1} style={theme ? {} : { backgroundColor: "rgb(220, 220, 220)" }}>
                        <i className="fa-solid fa-comment"></i>
                    </div>
                    Comment
                </div>
                <Share
                    text={data?.title}
                    title={data?.title}
                    url={window.location.href}
                    share={<div className={styles.first}>
                        <div className={styles.span1} style={theme ? {} : { backgroundColor: "rgb(220, 220, 220)" }}>
                            <i className="fa-solid fa-share"></i>
                        </div>
                        Share
                    </div>}
                />
                <div>
                    <div className={styles.span2} style={theme ? {} : { backgroundColor: "rgb(220, 220, 220)" }}>
                    </div>
                </div>
            </div>
        </>
    )
};