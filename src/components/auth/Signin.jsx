import axios from "axios"
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSignin } from '../../redux/Data/signSlice'
import logo from "../assets/Logo.png"
import google from "../assets/google.svg"
import styles from "./Signin.module.css"
import { signInWithGooglePopup } from "./firebase"

export default function Signin() {
    const [viewPass, setviewPass] = useState(false);
    const [user, setUser] = useState({ username: "", password: "" });
    const [err, setErr] = useState("");
    const [tc, setTc] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const theme = useSelector((state) => state.theme.value)


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
            const response = await axios.post(`https://honest-stillness-production.up.railway.app/api/auth/googlelogin`,
                {name:data.displayName, username:data.displayName, email:data.email, img:data.photoURL},
                {withCredentials:true}
            )
            dispatch(setSignin(response.data))
            console.log("User signed in")
            // console.log(userData)
            navigate("/")
            // console.log(response.user);

        }
        catch(err){
            console.log(err)
        }
    }


    function handleChange(e) {
        setUser({ ...user, [e.target.id]: e.target.value.trim() })
        setErr("")
    }
    async function handleSubmit(e) {
        e.preventDefault();
        if (user.username === "") {
            return setErr("Fill the Username")
        }
        else if (user.password === "") {
            return setErr("Fill the Password")
        }
        else if (tc === false) {
            return setErr("Agree to the Terms and Policy")
        }
        try {
            const userData = await axios.post("https://honest-stillness-production.up.railway.app/api/auth/login", { username: user.username, password: user.password }, { withCredentials: true });

            dispatch(setSignin(userData.data))
            console.log("User signed in")
            // console.log(userData)
            navigate("/")
        }
        catch (err) {
            setErr(err?.response?.data?.message)
        }
    }

    return (
        <div className={styles.mainBox} style={theme?{backgroundColor:"white"}:{backgroundColor:"black"}}>
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
                                <img src={google} alt="googleImg" height="75%" /> Sign In with Google</button>
                            {/* <button style={theme?{backgroundColor:"black",color:"white"}:{}}>
                                <img src={theme?applew:apple} alt="googleImg" height="75%"/> Sign In with Apple</button> */}
                        </div >
                        <div className={styles.line}>
                            <hr />or <hr />
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className={styles.inpData}>
                                <div className={styles.username}>
                                    <label htmlFor="username">Username</label>
                                    <br />
                                    <input type="text" id='username' placeholder='Enter Your Username Here' onChange={handleChange} required style={theme?{color:"white"}:{}}/>
                                </div>
                                <div className={styles.password}>
                                    <div className={styles.forg}>
                                        <label htmlFor="password">Password</label><span className={styles.forgot}>Forgot password?</span>
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
                            Do'nt have an account ? <a href="./signup">Sign Up</a>
                        </div>
                    </div>
                    <div className={styles.rights}>2024, All Rights Reserved</div>
                </div>



                <div className={styles.detail}>
                    <div className={styles.func} style={theme?{backgroundColor:"white",color:"black"}:{}}>
                    </div>
                </div>
            </div>
        </div>
    )
}
