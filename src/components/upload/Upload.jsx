import React, { useState } from 'react'
import styles from "./Upload.module.css"
import { useSelector } from 'react-redux'
import { darkTheme, lightTheme } from '../../themes'

export default function Upload({ isUpload, setisUpload }) {
    const theme = useSelector((state) => state.theme.value)
    const [data, setData] = useState("")
    const [err, setErr] = useState("")
    function handleChange(e) {
        if (e.target.value.substr(-4, 4) === (".mp4") || e.target.value.trim() === "") {
            setData(e.target.value)
            setErr("")
        }
        else {
            setData("")
            setErr("Formate is not correct")
        }
    }
    function handleCancel() {
            setErr("")
            setData("")
    }
    function handleConfirm() {
            
    }
    return (
        <div>
            {isUpload && <div className={styles.uploadVid} onClick={() => setisUpload(false)}>
            </div>}
            {isUpload && <div className={styles.uploadArea} style={theme ? {} : { backgroundColor: "#dadada" }}>
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
                                <button className={styles.uploadBtn}><label htmlFor="inp">Select files</label></button>
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
                    <input type="file" className={styles.uploadInp} value={data} onChange={handleChange} id='inp' accept="video/mp4" title='upload your video' />
                    {data &&
                    <div className={styles.confirnBtn}>
                            <div style={{ color: "green" }}>{data}
                            </div>
                            <div className={styles.buttons}>
                                <button onClick={handleCancel}>Cancel</button>
                                <button onClick={handleConfirm}>Confirm</button>
                            </div>
                    </div>
                    }
                </div>
            </div>}
        </div>
    )
}
