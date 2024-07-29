import React, { useRef, useEffect } from 'react';
import styles from "./Shorts.module.css"
import video from "./videoplayback.mp4"
export const VideoCard = ({ src, onPlay }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        const handlePlayStop = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    videoRef.current.currentTime = 0; // Reset video to the beginning
                    onPlay(src);  // Notify parent component that this video is playing
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
                <video className={styles.video} ref={videoRef} src={video} controls />
                <div className={styles.name}>
                    ch name
                </div>
            </span>
            <div className={styles.details}>
                <div>
                    <i class="fa-solid fa-thumbs-up"></i>
                    <br />like
                </div>
                <div>
                    <i class="fa-solid fa-thumbs-down fa-flip-horizontal"></i>
                    <br />Dislike
                </div>
                <div>
                    <i class="fa-solid fa-comment"></i>
                    <br />Comment
                </div>
                <div>
                    <i class="fa-solid fa-share"></i>
                    <br />Share
                </div>
            </div>
        </>
    )
};