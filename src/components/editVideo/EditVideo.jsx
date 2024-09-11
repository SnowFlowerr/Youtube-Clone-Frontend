import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import Progress from '../upload/Progress'
import styles from "./EditVideo.module.css"

export default function EditVideo({ data, isShort, setisEditing }) {
    const textRef = useRef()
    const [copied, setCopied] = useState(false)
    const [isdone, setisdone] = useState(false)
    const [thumbnail, setThumbnail] = useState({ secure_url: data?.imageUrl })
    const [title, setTitle] = useState(data.title)
    const [description, setDescription] = useState(data.description)
    const [prog, setProg] = useState(0)
    const theme = useSelector((state) => state.theme.value)

    useEffect(() => {
        autosize()
    }, [])

    function autosize() {
        textRef.current.style.cssText = `min-height:37px; height: 37px;`;
        textRef.current.style.cssText = 'height:' + textRef.current.scrollHeight + 'px';
        textRef.current.style.color = `${theme ? "white" : "black"}`;
    }

    function handleChange(e) {
        e.preventDefault()
        if (e.target.id === "title") {
            setTitle(e.target.value)
        }
        else if (e.target.id === "description") {
            autosize()
            setDescription(e.target.value)
        }
        else if (e.target.id === "thumbnail") {
            setProg(0)
            setThumbnail({ secure_url: data?.imageUrl })
            uploadThumbnail(e.target.files[0])

        }
    }
    async function uploadThumbnail(file) {
        if (file) {
            const formData = new FormData();
            formData.append('file', file)
            formData.append('folder', "VideoThumbnails")
            formData.append("upload_preset", process.env.REACT_APP_API_PRESET)
            try {
                const data = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_API_NAME}/auto/upload`, formData, {
                    onUploadProgress: event => {
                        setProg(Math.round(100 * event.loaded / event.total))
                    }
                })
                setProg(() => 100)
                // console.log(data.data)
                setThumbnail(data.data)
            } catch (err) {
                setProg("X")
                console.log(err)
            }
        }
    }

    async function handleSubmit() {

        try {
            await axios.put(`http://localhost:8000/api/${isShort ? "shorts" : "videos"}/${data._id}`, { title, description, imageUrl: thumbnail?.secure_url || "" }, { withCredentials: true })
            window.location.reload()
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        if (data?._id && (prog === 0 || prog === 100) && title.trim()) {
            setisdone(true)
        }
        else {
            setisdone(false)
        }

    }, [title, prog, data])

    useEffect(() => {
        setThumbnail({ secure_url: data?.imageUrl })
    }, [data])

    async function handleCancel() {
        try {
            await axios.delete(`http://localhost:8000/api/${isShort ? "shorts" : "videos"}/${data._id}`, { withCredentials: true })
            console.log("Video Deleted")
            window.location.reload()

        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className={styles.mainBox}>
            <div className={styles.options} style={theme ? {} : { borderColor: "black" }}>
                <div><b>{title}</b></div>
                <div className={styles.cross} onClick={() => setisEditing(false)}>
                    <i className="fa-solid fa-xmark"></i>
                </div>
            </div>
            <div className={styles.main}>
                <div className={styles.videoDetail}>
                    <div className={styles.heading}>
                        Details
                    </div>
                    <div>
                        <span className={styles.upperMessage} style={theme ? {} : { color: "rgb(94, 94, 94)" }}>Title (required)</span>
                        <input type='text' id="title" value={title} className={styles.title} maxLength={100} required onChange={handleChange} style={theme ? { color: "white" } : { color: "black" }} />
                        <span className={styles.lowerMessage} style={theme ? {} : { color: "rgb(94, 94, 94)" }}>{title?.length} / {100}</span>
                    </div>
                    <div>
                        <span className={styles.upperMessage} style={theme ? {} : { color: "rgb(94, 94, 94)" }}>Description (optional)</span>
                        <textarea id="description" value={description} className={styles.description} maxLength={5000} ref={textRef} onChange={handleChange} style={theme ? { color: "white" } : { color: "black" }}></textarea>
                        <span className={styles.lowerMessage} style={theme ? {} : { color: "rgb(94, 94, 94)" }}>{description.length} / {5000}</span>
                    </div>
                    <div className={styles.uploadnails}>
                        <div className={styles.heading2}>
                            Thumbnail
                        </div>
                        <div className={styles.heading3}>
                            {isShort ? "You cannot set Shorts Thumbnail." : "Set a thumbnail that stands out and draws viewer's attention if not chosen a random image fron the video will be set as thumbnail."}
                        </div>
                        {!isShort &&
                            <div className={styles.allThumbnails} >
                                <div>
                                    <input type="file" accept='image/jpg, image/jpeg,, image/png, image/svg, image/webp, image/avif' className={styles.uploadThumb} id='thumbnail' onChange={handleChange} />
                                    <label htmlFor="thumbnail">
                                        <div className={styles.uploadThumbnail} style={theme ? {} : { outlineColor: "black", color: "black" }}>
                                            <i className="fa-regular fa-file-image"></i>
                                            <div className={styles.uploadImg}>
                                                {thumbnail?.display_name ? thumbnail?.display_name : "Upload"}
                                            </div>
                                            {prog !== 0 &&
                                                <div className={styles.progress}>
                                                    <Progress progress={prog}></Progress>
                                                </div>
                                            }
                                        </div>
                                    </label>
                                </div>
                                {/* <div>
                                <div className={styles.uploadThumbnail}>
                                    jvhv
                                </div>
                            </div>
                            <div>
                                <div className={styles.uploadThumbnail}>
                                    jvhv
                                </div>
                            </div> */}
                            </div>}
                    </div>

                </div>
                <div className={styles.videoPreview}>
                    <div className={styles.videoplayer}>
                        <video src={data?.videoUrl} controls poster={thumbnail?.secure_url}></video>
                        <div className={styles.previewOptions}>
                            {data?._id &&
                                <div className={styles.videoLink}>

                                    <div className={styles.heading4}>
                                        video
                                    </div>
                                    <div className={styles.link}>
                                        <a href={`https://streamsphere-streaming.vercel.app/${isShort ? "shorts" : "player"}/${data?._id}`} style={{ color: "lightblue" }}>
                                            {`streamspherestreaming.vercel.app/${isShort ? "shorts" : "player"}/${data?._id}`}
                                        </a>
                                    </div>
                                    <div className={styles.copyIcon} onClick={async () => { await navigator.clipboard.writeText(`https://streamsphere-streaming.vercel.app/${isShort ? "shorts" : "player"}/${data?._id}`); setCopied(true) }}>
                                        {copied ?
                                            <i className="fa-solid fa-circle-check"></i>
                                            :
                                            <i className="fa-regular fa-copy"></i>
                                        }
                                    </div>
                                    <div>
                                        <div className={styles.heading4}>
                                            Title
                                        </div>
                                        <div className={styles.videoName} style={theme ? {} : { color: "white" }}>
                                            {data.title}
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.options2} style={theme ? {} : { borderColor: "black" }}>
                {/* <Progress progress={progress} /> */}
                <button onClick={() => isdone ? handleCancel() : console.log("Something is missing")} style={isdone ? {} : { backgroundColor: "rgb(187, 187, 187)" }}>Delete</button>
                <div>
                    <button onClick={() => setisEditing(false)}>Cancel</button>
                    {" "}
                    <button onClick={() => isdone ? handleSubmit() : console.log("Something is missing")} style={isdone ? {} : { backgroundColor: "rgb(187, 187, 187)" }}>Done</button>
                </div>
            </div>
        </div>
    )
}

