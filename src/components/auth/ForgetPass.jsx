import axios from "axios";
import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { setSignin } from "../../redux/Data/signSlice";
import logo from "../assets/Logo.png";
import styles from "./ForgetPass.module.css";

export default function ForgetPass() {
    const [userInp, setUserInp] = useState({ email: "", otp: "" });
    const [userPass, setUserPass] = useState({ pass: "", cpass: "" });
    const [err1, setErr1] = useState("");
    const [err2, setErr2] = useState("");
    const [err3, setErr3] = useState("");
    const [resend, setResend] = useState(true);
    const [isOtp, setIsOtp] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const theme = useSelector((state) => state.theme.value)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    function handleChange(e) {
        setUserInp({ ...userInp, [e.target.id]: e.target.value.trim() })
        setErr1("")
        setErr2("")
    }
    function handlePassword(e) {
        setUserPass({ ...userPass, [e.target.id]: e.target.value })
        setErr3("")
    }
    async function handleSubmitEmail(e) {
        e.preventDefault();
        if (userInp.email === "" || !userInp.email.includes("@")) {
            return setErr1("Enter the Email or Correct Email")
        }
        try {
            const userData = await axios.post("https://video-streaming-app-backend-r6e3.onrender.com/api/auth/forget",
                { email: userInp.email },
                { withCredentials: true });
            setResend(false)
            setIsOtp(true)
            setTimeout(() => {
                setResend(true)
            }, 60000)
        }
        catch (err) {
            setErr1(err?.response?.data?.message)
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (userInp.otp === "") {
            return setErr2("Enter the OTP")
        }
        try {
            const userData = await axios.post("https://video-streaming-app-backend-r6e3.onrender.com/api/auth/match",
                { email: userInp.email, otp: userInp.otp },
                { withCredentials: true });
            setIsCorrect(true)
            dispatch(setSignin(userData.data))

        }
        catch (err) {
            setErr2(err?.response?.data?.message)
        }
    }
    async function handleFinalSubmit(e) {
        e.preventDefault();
        if (userPass.pass != userPass.cpass) {
            return setErr3("Both Passwords are not same")
        }
        try {
            const userData = await axios.put("https://video-streaming-app-backend-r6e3.onrender.com/api/users/updatePass",
                { password: userPass.pass },
                { withCredentials: true });
            navigate("/")
        }
        catch (err) {
            setErr3(err?.response?.data?.message)
        }
    }


    return (
        <div className={styles.mainBox} style={theme ? { backgroundColor: "white" } : { backgroundColor: "black" }}>
            <div className={styles.bigBox} style={theme ? { backgroundColor: "black", color: "white" } : {}}>
                <div className={styles.box}>
                    <div className={styles.logo}>
                        <img src={logo} alt="logo" height="50px" />
                    </div>
                    <div className={styles.main}>
                        <div className={styles.text}>
                            <span className={styles.bigText}>Account</span>
                            <br />
                            <span className={styles.smallText}>Fill the details Reset to You Password</span>
                        </div>
                        <div className={styles.line}>
                            {/* <hr />or <hr /> */}
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className={styles.inpData}>
                                <div className={styles.username}>
                                    <label htmlFor="email">Email</label>
                                    <br />
                                    <input type="email" id='email' placeholder='Enter Your Email Here' onChange={handleChange} required style={theme ? { color: "white" } : {}} />
                                    {resend && <div className={styles.submit}>
                                        {err1 && <div className={styles.error}>{err1}</div>}
                                        <button type='submit' onClick={handleSubmitEmail}>Send OTP</button>
                                    </div>}
                                </div>
                                {isOtp && <div className={styles.password}>
                                    <div className={styles.forg}>
                                        <label htmlFor="password">OTP</label>
                                    </div>
                                    <br />
                                    <div className={styles.viewPass}>
                                        <input type="text" id='otp' placeholder='Enter Your OTP Here' onChange={handleChange} required style={theme ? { color: "white" } : {}} />
                                    </div>
                                </div>}
                            </div>
                            {isOtp && !isCorrect &&<div className={styles.submit}>
                                {err2 && <div className={styles.error}>{err2}</div>}
                                <button type='submit' onClick={handleSubmit}>Submit</button>
                            </div>}
                            {isCorrect && <>
                            <div className={styles.inpData}>
                                <div className={styles.username}>
                                    <label htmlFor="pass">Password</label>
                                    <br />
                                    <input type="email" id='pass' placeholder='Enter Your Password Here' onChange={handlePassword} required style={theme ? { color: "white" } : {}} />
                                    <div className={styles.submit}>
                                    </div>
                                    <div className={styles.password}>
                                        <div className={styles.forg}>
                                            <label htmlFor="cpass">Confirm Password</label>
                                        </div>
                                        <br />
                                        <div className={styles.viewPass}>
                                            <input type="text" id='cpass' placeholder='Enter Your Confirm Password Here' onChange={handlePassword} required style={theme ? { color: "white" } : {}} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {isOtp && <div className={styles.submit}>
                                {err3 && <div className={styles.error}>{err3}</div>}
                                <button type='submit' onClick={handleFinalSubmit}>Submit</button>
                            </div>}
                            </>}
                        </form>
                    </div>
                    <div className={styles.rights}>2024, All Rights Reserved</div>
                </div>
                <div className={styles.detail}>
                    <div className={styles.func} style={theme ? { backgroundColor: "white", color: "black" } : {}}>
                    </div>
                </div>
            </div>
        </div>
    )
}
