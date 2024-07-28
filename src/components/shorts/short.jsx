import React, { useRef, useEffect } from 'react';
import styles from "./Shorts.module.css"
import video from "./videoplayback.mp4"
import { useNavigate } from 'react-router-dom'
export const VideoCard = ({ src, index, onPlay }) => {
    const navigate = useNavigate()
    const videoRef = useRef(null);

    useEffect(() => {
        const handlePlayStop = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    videoRef.current.currentTime = 0; // Reset video to the beginning
                    videoRef.current.play().then(() => {
                        onPlay(index);  // Notify parent component that this video is playing
                    }).catch((error) => {
                        console.error('Error trying to play video:', error);
                    });
                } else {
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
    }, [index, onPlay]);


    return <video className={styles.video} ref={videoRef} src={video} controls onPlay={() => navigate(`/shorts/${src}`)} />;
};