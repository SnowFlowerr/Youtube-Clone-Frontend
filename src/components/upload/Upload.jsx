import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { darkTheme, lightTheme } from '../../themes'
import styles from "./Upload.module.css"
// import Progress from './Progress'
import axios from 'axios'
import VideoDetail from './VideoDetail'

export default function Upload({ isUpload, setisUpload }) {
    const theme = useSelector((state) => state.theme.value)
    const [progress, setProgress] = useState(0)
    const [uploaded, setUploaded] = useState(false)
    const [isShort, setisShort] = useState(false)
    const [data, setData] = useState({})
    const [video, setVideo] = useState({ name: "" })
    const [err, setErr] = useState("")


    function handleChange(e) {
        const file = e.target.files[0]
        if (file) {
            if (file.type === "video/mp4") {
                setErr("")
                setVideo(file)
                // handleConfirm(file)

                var video = document.createElement('video')
                video.src = window.URL.createObjectURL(file);
                video.addEventListener('loadedmetadata', event => {
                    // console.log(video.videoWidth / video.videoHeight, video.duration)
                    let shorts=false
                    if(video.videoWidth / video.videoHeight <= 0.6 && Math.floor(video.duration)<=60){
                        setisShort(true)
                        shorts=true
                    }
                    else{
                        setisShort(false)
                        shorts=false
                    }
                    handleConfirm(file, shorts)
                });
                


            }
            else {
                setData("")
                setErr("Formate is not correct")
            }
        }
    }

    async function handleConfirm(file, shorts) {
        if (file) {
            setUploaded(() => true)
            const formData = new FormData();
            formData.append('file', file)
            formData.append('folder', shorts?"Shorts":"Videos")
            formData.append("upload_preset", process.env.REACT_APP_API_PRESET)
            try {
                const data = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_API_NAME}/auto/upload`, formData, {
                    onUploadProgress: event => {
                        setProgress(Math.round(100 * event.loaded / event.total))
                    }
                })
                setProgress(() => 100)
                handleCreate(data.data, shorts)
            } catch (err) {
                setProgress("X")
                console.log(err)
            }
        }
    }

    async function handleCreate(datas, shorts) {
        console.log(shorts)

        try {
            const data = await axios.post(`https://honest-stillness-production.up.railway.app/api/${shorts?"shorts":"videos"}/`, { title: datas.display_name, videoUrl: datas.secure_url, duration: datas.duration, imageUrl: datas.secure_url.slice(0, -3) + "jpg" }, { withCredentials: true })
            setData(data.data)
            // console.log(data.data)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            {isUpload && <div className={styles.uploadVid} onClick={() => setisUpload(false)}>
            </div>}
            {isUpload &&
                <div className={styles.uploadArea} style={theme ? {} : { backgroundColor: "#dadada" }}>
                    {uploaded ?
                        <>
                            <VideoDetail progress={progress} video={video.name.slice(0, -4)} data={data} isShort={isShort}/>
                        </>
                        :
                        <>
                            <div className={styles.options}>
                                <div><b>Upload Video</b></div>
                                <div className={styles.cross} onClick={() => setisUpload(false)}><i className="fa-solid fa-xmark"></i></div>
                            </div>
                            <div className={styles.inputDiv}>
                                <div className={styles.uploadLogo}>
                                    <div></div>
                                    <div>
                                        <div className={styles.logo} style={theme ? darkTheme : lightTheme}><i className="fa-solid fa-upload"></i></div>
                                        <div>Drag and drop video files or click on <br />
                                            button below to upload

                                        </div>
                                        <div>
                                            <button className={styles.uploadBtn}>
                                                <label htmlFor="inp">Select files</label>
                                            </button>
                                        </div>
                                        <div>

                                            <span style={{ color: "red" }}>{err}</span>
                                        </div>

                                    </div>
                                    <div>
                                        By submitting your videos to StreamSphere, you acknowledge that you agree to StreamSphere's Terms of Service and Community Guidelines.
                                        <br />
                                        Please be sure not to violate other's copyright or privacy rights. Learn more
                                    </div>
                                </div>
                                <input type="file" className={styles.uploadInp} onChange={handleChange} id='inp' accept="video/mp4" title='upload your video' />
                            </div>
                        </>

                    }
                </div>
            }
        </div>
    )
}
