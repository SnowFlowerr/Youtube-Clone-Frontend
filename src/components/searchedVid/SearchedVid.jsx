import React, { useEffect, useState } from 'react'
import styles from "./SearchVid.module.css"
import Navbar from '../navbar/Navbar'
import Sidenav from '../navbar/Sidenav'
import { offMic } from '../../redux/Data/micSlice'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

export default function SearchedVid() {
    const [searchedVid, setsearchedVid] = useState([3, 3, 3, 3, 3, 3, 3, 3])
    const dispatch = useDispatch()
    const { search } = useParams()
    useEffect(() => {
        dispatch(offMic())
    }, [])
    return (
        <div className={styles.main}>
            <Navbar></Navbar>
            <div className={styles.bigBox}>
                <div className={styles.Sidenav}>
                    <Sidenav />
                </div>
                <div className={styles.box}>
                    <div className={styles.searchFor}>
                        Showing results for <b>{search}</b>
                    </div>
                    {
                        searchedVid.map((video, index) =>
                            <>
                            <div key={index} className={styles.singleVideo}>
                                <div className={styles.video}>
                                    dcscs
                                </div>
                                <div className={styles.detail}>
                                    fsegetth
                                </div>
                            </div>
                            {
                                index===0 &&
                                <div>refwafe</div>
                            }
                            </>
                        )}
                </div>
            </div>
        </div>
    )
}
