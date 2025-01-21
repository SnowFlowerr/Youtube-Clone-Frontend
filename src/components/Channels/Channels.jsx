import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { darkTheme, lightTheme } from "../../themes";
import EditVideo from "../editVideo/EditVideo";
import Navbar from "../navbar/Navbar";
import Sidenav from "../navbar/Sidenav";
import Progress from "../upload/Progress";
import Cards from "./Cards";
import styles from "./Channels.module.css";
import ShortsCard from "./ShortsCard";

export default function Channels() {
    const [user, setUser] = useState("");
    let { id } = useParams();
    let { category } = useParams();
    const navigate = useNavigate();
    const theme = useSelector((state) => state.theme.value);
    const [shorts, setShorts] = useState([])
    const [videos, setVideos] = useState([])
    const sign = useSelector((state) => state.sign?.value)
    const [prog, setProg] = useState(0)
    const [progIcon, setProgIcon] = useState(0)
    const [banner, setBanner] = useState('')
    const [icon, setIcon] = useState('')
    const [aboutChannel, setaboutChannel] = useState('')
    const [isaboutChannel, setisaboutChannel] = useState(false)
    const textRef = useRef(null)
    const [isSubs, setisSubs] = useState(false)
    const [isEditing, setisEditing] = useState(false)
    const [editingData, seteditingData] = useState("")
    const [subs, setSubs] = useState(0)
    const [isshorts, setisShorts] = useState(false)

    useEffect(() => {
        currentUser();
        issubscribe();
        currentShorts();
        currentVideos()
    }, []);

    async function currentUser() {
        try {
            const userD = await axios.get(
                `https://video-streaming-app-backend-r6e3.onrender.com/api/users/get/${id}`,
                { withCredentials: true }
            );
            setUser(userD.data);
            setSubs(userD.data.followers)
            setaboutChannel(userD.data.channelInfo)
            setBanner(userD.data.bannerImg)
            setIcon(userD.data.img)
        } catch (err) {
            navigate("/notfound");
            console.log(err);
        }
    }

    async function issubscribe() {
        try {
            const userD = await axios.get(`https://video-streaming-app-backend-r6e3.onrender.com/api/users/issubscribe/${id}`,
                { withCredentials: true }
            )
            setisSubs(userD.data)
        }
        catch (err) {
            console.log(err.message)
        }
    }

    async function updateUser(url) {
        try {
            const userD = await axios.put(
                `https://video-streaming-app-backend-r6e3.onrender.com/api/users/update/${id}`,
                { bannerImg: url },
                { withCredentials: true }
            );
            setUser(userD.data);
            setBanner(userD.data.bannerImg)
            setProg(0)
        } catch (err) {
            console.log(err);
        }
    }
    async function updateIcon(url) {
        try {
            const userD = await axios.put(
                `https://video-streaming-app-backend-r6e3.onrender.com/api/users/update/${id}`,
                { img: url },
                { withCredentials: true }
            );
            setUser(userD.data);
            setIcon(userD.data.img)
            setProg(0)
        } catch (err) {
            console.log(err);
        }
    }

    async function currentShorts() {
        try {
            const short = await axios.get(
                `https://video-streaming-app-backend-r6e3.onrender.com/api/shorts/allcurrentshorts/${id}?limit=${20}`,
                { withCredentials: true }
            );
            setShorts(short.data);
        } catch (err) {
            console.log(err);
        }
    }

    async function currentVideos() {
        try {
            const short = await axios.get(
                `https://video-streaming-app-backend-r6e3.onrender.com/api/videos/allcurrentvideos/${id}?limit=${20}`,
                { withCredentials: true }
            );
            setVideos(short.data);
        } catch (err) {
            console.log(err);
        }
    }

    async function handleChange(e) {
        e.preventDefault()
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file)
            formData.append('folder', "Banners")
            formData.append("upload_preset", process.env.REACT_APP_API_PRESET)
            try {
                const data = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_API_NAME}/auto/upload`, formData, {
                    onUploadProgress: event => {
                        setProg(Math.round(100 * event.loaded / event.total))
                    }
                })
                setProg(() => 100)
                updateUser(data.data.secure_url)
                setBanner(data.data)
            } catch (err) {
                setProg("X")
                console.log(err)
            }
        }
    }
    async function handleChangeIcon(e) {
        e.preventDefault()
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file)
            formData.append('folder', "userIcon")
            formData.append("upload_preset", process.env.REACT_APP_API_PRESET)
            try {
                const data = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_API_NAME}/auto/upload`, formData, {
                    onUploadProgress: event => {
                        setProgIcon(Math.round(100 * event.loaded / event.total))
                    }
                })
                setProgIcon(() => 100)
                setIcon(data.data.secure_url)
                updateIcon(data.data.secure_url)
            } catch (err) {
                setProgIcon("X")
                console.log(err)
            }
        }
    }

    function autosize() {
        textRef.current.style.cssText = `min-height:25px; height: 25px;`;
        textRef.current.style.cssText = 'height:' + textRef.current.scrollHeight + 'px';
        textRef.current.style.color = `${theme ? "white" : "black"}`;
    }

    function textChange(e) {
        e.preventDefault()
        autosize()
        setaboutChannel(e.target.value)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setisaboutChannel(false)
        try {
            const userD = await axios.put(
                `https://video-streaming-app-backend-r6e3.onrender.com/api/users/update/${id}`,
                { channelInfo: aboutChannel },
                { withCredentials: true }
            );
            setUser(userD.data);
        } catch (err) {
            console.log(err);
        }
        
    }

    async function handleSubscribe() {
        try {
            if (isSubs) {
                setisSubs(false)
                setSubs(subs - 1)
                await axios.delete(`https://video-streaming-app-backend-r6e3.onrender.com/api/users/unsubscribe/${id}`,
                    
                    { withCredentials: true }
                );
                console.log("Unsubscribe")
            }
            else {
                setisSubs(true)
                setSubs(subs + 1)
                await axios.put(`https://video-streaming-app-backend-r6e3.onrender.com/api/users/subscribe/${id}`,
                    {},
                    { withCredentials: true }
                );
                console.log("Subscribe")
            }
            // setisSubs(!isSubs)
            // console.log("err?.response?.data")
        }
        catch (err) {
            console.log(err?.response?.data)
        }

    }

    return (
        <div className={styles.main}>
            <div>
                <Navbar></Navbar>
            </div>
            <div className={styles.mainbox}>
                <div className={styles.Sidenav}>
                    <Sidenav></Sidenav>
                </div>
                <div className={styles.box}>
                    {id === sign._id ?
                        <div className={styles.banner}>
                            {banner &&
                                <img src={banner.secure_url || user.bannerImg} alt="" width="100%" height="100%" className={styles.newBanner} />
                            }
                            <div className={styles.addBanner}>
                                <div>
                                    <input type="file" accept='image/jpg, image/jpeg,, image/png, image/svg, image/webp, image/avif' className={styles.uploadThumb} id='banner' onChange={handleChange} />
                                    <label htmlFor="banner">
                                        <div className={styles.uploadThumbnail} style={theme ? {} : { outlineColor: "black", color: "black" }}>

                                            <div className={styles.uploadImg}>
                                                <i className="fa-regular fa-file-image"></i> {banner ? " Change Banner" : " Upload Banner"}
                                            </div>
                                            {prog !== 0 &&
                                                <div className={styles.progress}>
                                                    <Progress progress={prog}></Progress>
                                                </div>
                                            }
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>
                        :
                        <>
                            {
                                banner &&
                                <div className={styles.banner}>
                                    <img
                                        src={banner}
                                        alt="banner"
                                        width="100%"
                                        height="100%"
                                    />
                                </div>
                            }
                        </>
                    }
                    <div className={styles.userDetails}>
                        <div className={styles.userIcon}>
                            <img src={icon} alt="userIcon" width="100%" height="100%" />
                            {id===sign._id &&
                                <div className={styles.addIcon}>
                                <div>
                                    <input type="file" accept='image/jpg, image/jpeg,, image/png, image/svg, image/webp, image/avif' className={styles.uploadThumb} id='icon' onChange={handleChangeIcon} />
                                    <label htmlFor="icon">
                                        <div className={styles.uploadIcon} style={theme ? {} : { outlineColor: "black", color: "black" }}>

                                            <div className={styles.TextIcon}>
                                                <i className="fa-regular fa-file-image"></i> {user?.img ? " Change Icon" : " Upload Icon"}
                                            </div>
                                            {progIcon !== 0 &&
                                                <div className={styles.progressIcon}>
                                                    <Progress progress={progIcon}></Progress>
                                                </div>
                                            }
                                        </div>
                                    </label>
                                </div>
                            </div>}
                        </div>
                        <div className={styles.userDet}>
                            <div className={styles.name}>
                                {user?.name}
                            </div>
                            <div className={styles.username}>
                                <span>@{user?.username}</span> .{" "}
                                <span>{subs} subscribers</span> .{" "}
                                <span>{videos.length + shorts.length} videos</span>
                            </div>
                            <div className={styles.about}>
                                {isaboutChannel ?
                                    <div className={styles.textDiv}>
                                        <textarea type="text"
                                            className={styles.aboutInp}
                                            ref={textRef}
                                            onChange={textChange}
                                            value={aboutChannel}
                                            style={theme?{}:{borderColor:"black",color:"black"}}
                                        />
                                        <div className={styles.textBtn}>
                                            <button onClick={() => { setisaboutChannel(false); setaboutChannel(user.channelInfo) }}>cancel</button>
                                            <button onClick={handleSubmit}>Save</button>
                                        </div>
                                    </div>
                                    :
                                    <>
                                        {(user.channelInfo || id === sign._id) &&
                                            <div className={styles.aboutChannel}>
                                                {user.channelInfo ? user.channelInfo : "Write Something about this Channel"}
                                            </div>}
                                        {id === sign._id &&
                                            <span className={styles.pen}
                                                onClick={() => {
                                                    setisaboutChannel(() => true);
                                                    setTimeout(() => {
                                                        textRef.current &&
                                                        textRef.current.focus()
                                                        autosize();
                                                    }, 0)
                                                }
                                                }>
                                                <i className="fa-solid fa-pen-to-square"></i>
                                            </span>
                                        }
                                    </>
                                }
                            </div>
                            <div className={styles.userLink}>
                                <a href={`https://youtube-clone-snowflowerr.vercel.app/channels/${id}/featured`}>
                                    youtube-clone-snowflowerr.vercel.app/channels/{id}/featured
                                </a>
                            </div>
                            <div className={styles.subscribe} style={theme ? isSubs ? { backgroundColor: "#2e2e2e" } : lightTheme : isSubs ? { backgroundColor: "rgb(220, 220, 220)" } : darkTheme} onClick={handleSubscribe}>
                                {isSubs ? "Unsubscribe" : "Subscribe"}
                            </div>
                        </div>
                    </div>
                    <div className={styles.option}>
                        <div style={theme ? category === "featured" ? { borderColor: "white" } : {} : category === "featured" ? { borderColor: "black", color: "black" } : { color: "black" }} onClick={() => navigate(`/channels/${user._id}/featured`)}>
                            Home
                        </div>
                        {videos.length !== 0 &&
                            <div style={theme ? category === "videos" ? { borderColor: "white" } : {} : category === "videos" ? { borderColor: "black", color: "black" } : { color: "black" }} onClick={() => navigate(`/channels/${user._id}/videos`)}>
                                Videos
                            </div>}
                        {shorts.length !== 0 &&
                            <div style={theme ? category === "shorts" ? { borderColor: "white" } : {} : category === "shorts" ? { borderColor: "black", color: "black" } : { color: "black" }} onClick={() => navigate(`/channels/${user._id}/shorts`)}>
                                Shorts
                            </div>}
                    </div>
                    <hr />
                    <div className={styles.allOptions}>
                        {
                            category === "featured" &&
                            <div className={styles.featured}>
                                {shorts.length !== 0 &&
                                    <>
                                        <div className={styles.shortsLogo} style={theme ? { backgroundColor: "white", color: "black" } : { backgroundColor: "black", color: "white" }}>
                                            <i className="fa-solid fa-circle-play"></i> Shorts
                                        </div>
                                        <div className={styles.shorts}>
                                            {
                                                shorts.map((video, index) =>
                                                    index < 6 &&
                                                    <ShortsCard video={video} key={index} index={index} seteditingData={seteditingData} setisEditing={setisEditing} setisShorts={setisShorts} isfeatured={true}/>
                                                )
                                            }
                                        </div>
                                        <hr />
                                    </>}

                                {videos.length !== 0 &&
                                    <>
                                        <div className={styles.shortsLogo} style={theme ? { backgroundColor: "white", color: "black" } : { backgroundColor: "black", color: "white" }}>
                                            <i className="fa-solid fa-video"></i> Video
                                        </div>
                                        <div className={styles.video}>
                                            {
                                                videos.map((video, index) =>
                                                    <Cards video={video} key={index} index={index} seteditingData={seteditingData} setisEditing={setisEditing} setisShorts={setisShorts} />
                                                )
                                            }
                                        </div>
                                    </>}
                            </div>
                        }
                        {
                            category === "videos" &&
                            <div className={styles.featured}>
                                <div className={styles.shortsLogo} style={theme ? { backgroundColor: "white", color: "black" } : { backgroundColor: "black", color: "white" }}>
                                    <i className="fa-solid fa-video"></i> Video
                                </div>
                                <div className={styles.video}>
                                    {
                                        videos.map((video, index) =>
                                            <Cards video={video} key={index} index={index} seteditingData={seteditingData} setisEditing={setisEditing} setisShorts={setisShorts} />
                                        )
                                    }
                                </div>
                            </div>
                        }
                        {
                            category === "shorts" &&
                            <div className={styles.featured}>
                                <div className={styles.shortsLogo} style={theme ? { backgroundColor: "white", color: "black" } : { backgroundColor: "black", color: "white" }}>
                                    <i className="fa-solid fa-circle-play"></i> Shorts
                                </div>
                                <div className={styles.shorts}>
                                    {
                                        shorts.map((video, index) =>
                                            <ShortsCard video={video} key={index} index={index} seteditingData={seteditingData} setisEditing={setisEditing} setisShorts={setisShorts} />
                                        )
                                    }
                                </div>
                            </div>
                        }
                    </div>
                    {(isEditing && id === sign._id) &&
                        <div className={styles.EditVideo} >
                            <div style={theme ? { backgroundColor: "rgb(73, 73, 73)" } : { backgroundColor: "#dadada" }}>
                                <EditVideo data={editingData} setisEditing={setisEditing} isShort={isshorts} />
                            </div>
                        </div>}
                </div>
            </div>

        </div>
    );
}
