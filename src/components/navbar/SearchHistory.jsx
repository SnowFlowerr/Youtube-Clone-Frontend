import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from "./SearchHistory.module.css";

export default function SearchHistory({ handleSuggestion, sea, setSea }) {
    const [search,setSearch]=useState([]);

    useEffect(()=>{
        async function getSearch() {
            try {
                const userData = await axios.get("https://honeststillness-production.up.railway.app/api/users/getsearchHistory",
                    { withCredentials: true });
                // console.log(userData.data)
                setSearch(userData?.data)
            }
            catch (err) {
                console.log(err)
            }
        }
        getSearch()
    },[sea])
    async function delSearch(ele) {
        try {
            const userData = await axios.delete(`https://honeststillness-production.up.railway.app/api/users/removesearchHistory/${ele}`,
                { withCredentials: true });
            setSea(!sea)
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            {search.length !== 0 &&
                <div className={styles.mainBox}>
                    {search.toReversed().map((ele, ind) =>
                        <div key={ind}  className={styles.searches}>
                            <div onClick={() => handleSuggestion(ele)} className={styles.searchText}>
                            <div><i className="fa-solid fa-magnifying-glass"></i></div> <div>{ele}</div>
                            </div>
                            <div className={styles.delete} onClick={() => delSearch(ele)}>
                                <i className="fa-solid fa-xmark"></i>
                            </div>
                        </div>
                    )}
                </div>
            }
        </>
    )
}
