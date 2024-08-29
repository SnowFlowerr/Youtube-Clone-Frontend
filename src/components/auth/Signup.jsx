import axios from "axios"
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSignin } from '../../redux/Data/signSlice'
import logo from "../assets/Logo.png"
import google from "../assets/google.svg"
import Progress from "../upload/Progress"
import styles from "./Signup.module.css"
import { signInWithGooglePopup } from "./firebase"


export default function Signup() {
    const [viewPass, setviewPass] = useState(false);
    const theme = useSelector((state) => state.theme.value)
    const [user, setUser] = useState({ name: "", username: "", email: "", password: "" });
    const [err, setErr] = useState("");
    const [icon, setIcon] = useState("");
    const [tc, setTc] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [prog, setProg] = useState(0)


    function handleChange(e) {
        setUser({ ...user, [e.target.id]: e.target.value.trim() })
        setErr("")
    }
    async function uploadThumbnail(e) {
        const file = e.target.files[0]
        if (file) {
            const formData = new FormData();
            formData.append('file', file)
            formData.append('folder', "userIcon")
            formData.append("upload_preset", process.env.REACT_APP_API_PRESET)
            try {
                const data = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_API_NAME}/auto/upload`, formData, {
                    onUploadProgress: event => {
                        setProg(Math.round(100 * event.loaded / event.total))
                    }
                })
                setProg(() => 100)
                // console.log(data?.data?.secure_url)
                setIcon(data?.data)
            } catch (err) {
                setProg("X")
                console.log(err)
            }
        }
    }
    async function handleSubmit(e) {
        e.preventDefault();
        if (user.name === "") {
            return setErr("Fill the Name")
        }
        else if (user.username === "") {
            return setErr("Fill the Username")
        }
        else if (user.email === "") {
            return setErr("Fill the Email")
        }
        else if (user.password === "") {
            return setErr("Fill the Password")
        }
        else if (tc === false) {
            return setErr("Agree to the Terms and Policy")
        }
        try {
            const userData = await axios.post("http://localhost:8000/api/auth/signup", { name: user.name, username: user.username, email: user.email, password: user.password, img: icon?.secure_url }, { withCredentials: true });

            dispatch(setSignin(userData.data))
            console.log("User signed up")
            navigate("/")
        }
        catch (err) {
            setErr(err?.response?.data?.message)
        }
    }

    const logGoogleUser = async () => {
        try{
            const response = await signInWithGooglePopup();
            // console.log(response.user);
            GoogleLogin(response.user)
        }
        catch(err){
            console.log(err)
        }
    }
    const GoogleLogin = async (data) => {
        try{
            setLoading(()=>true)
            const response = await axios.post(`http://localhost:8000/api/auth/googlelogin`,
                {name:data.displayName, username:data.displayName, email:data.email, img:data.photoURL},
                {withCredentials:true},
            )
            dispatch(setSignin(response.data))
            console.log("User signed in")
            // console.log(userData)
            navigate("/")
            setLoading(()=>false)
            // console.log(response.user);

        }
        catch(err){
            console.log(err)
        }
    }

    return (
        <div className={styles.mainBox} style={theme?{backgroundColor:"white"}:{backgroundColor:"black"}}>
            {/* <Progress progress={prog}></Progress> */}

            <div className={styles.bigBox} style={theme?{backgroundColor:"black",color:"white"}:{}}>
                <div className={styles.box}>
                    <div className={styles.logo}>
                        <img src={logo} alt="logo" height="50px" />
                    </div>
                    <div className={styles.main}>
                        <div className={styles.text}>
                            <span className={styles.bigText}>Get Started Now</span>

                            <br />
                            <span className={styles.smallText}>Enter Your Details to create an Account</span>
                        </div>
                        <div className={styles.signBtn}>
                            <button style={theme?{backgroundColor:"black",color:"white"}:{}} onClick={logGoogleUser}>
                                <img src={google} alt="googleImg" height="50%" /> Sign In with Google</button>
                            <label htmlFor="channelIcon" className={styles.iconlabel}>
                                {prog !== 0 &&
                                    <div className={styles.progress}>
                                        <Progress progress={prog}></Progress>
                                    </div>
                                }
                                <div className={styles.iconName}>{icon ? icon?.display_name : "Choose an Icon"}</div>
                            </label>
                            <input type="file" accept='image/jpg, image/jpeg,, image/png, image/svg, image/webp, image/avif' className={styles.uploadThumb} id='channelIcon' onChange={uploadThumbnail} />
                        </div >
                        <div className={styles.line}>
                            <hr />or <hr />
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className={styles.inpData}>
                                <div className={styles.name}>
                                    <label htmlFor="name">Name</label>
                                    <br />
                                    <input type="text" id='name' placeholder='Enter Your Name Here' onChange={handleChange} required style={theme?{color:"white"}:{}}/>
                                </div>
                                <div className={styles.username}>
                                    <label htmlFor="username">Username</label>
                                    <br />
                                    <input type="text" id='username' placeholder='Enter Your Username Here' onChange={handleChange} required style={theme?{color:"white"}:{}}/>
                                </div>
                                <div className={styles.email}>
                                    <label htmlFor="email">Email Address</label>
                                    <br />
                                    <input type="email" id='email' placeholder='Enter Your Email Here' onChange={handleChange} required style={theme?{color:"white"}:{}}/>
                                </div>
                                <div className={styles.password}>
                                    <div className={styles.forg}>
                                        <label htmlFor="password">Password</label>
                                    </div>
                                    <br />
                                    <div className={styles.viewPass}>
                                        <input type={viewPass ? "text" : "password"} id='password' placeholder='Enter Your Password Here' onChange={handleChange} required style={theme?{color:"white"}:{}}/>
                                        <button type='button' onClick={(e) => { e.preventDefault(); setviewPass(!viewPass) }}>{viewPass ? <i className="fa-solid fa-eye-slash"></i> : <i className="fa-solid fa-eye"></i>}</button>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.tandc}>
                                <input type="checkbox" onClick={() => { setTc(!tc); setErr("") }} />
                                <span>I agree to the <u>Terms & Policy </u></span>
                            </div>
                            <div className={styles.submit}>
                                {err && <div className={styles.error}>{err}</div>}
                                <button type='submit' onClick={handleSubmit}>Sign Up</button>
                            </div>
                        </form>
                        <div className={styles.haveAcc}>
                            Have an account ? <a href="./signin">Sign In</a>
                        </div>
                    </div>
                    <div className={styles.rights}>2024, All Rights Reserved</div>
                    {loading &&
                <div className={styles.loading}>
                    <div className={styles.loadingBar} style={theme?{}:{borderColor:"black"}}>
                    </div>
                        {loading}
                </div>}
                </div>



                <div className={styles.detail}>
                    <div className={styles.func} style={theme?{backgroundColor:"white",color:"black"}:{}}>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}
