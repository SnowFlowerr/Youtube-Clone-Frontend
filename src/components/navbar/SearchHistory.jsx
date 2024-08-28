import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from "./SearchHistory.module.css";

export default function SearchHistory({ handleSuggestion }) {
    const [search,setSearch]=useState([]);

    useEffect(()=>{
        async function getSearch() {
            try {
                const userData = await axios.get("https://honest-stillness-production.up.railway.app/api/users/getsearchHistory",
                    { withCredentials: true });
                console.log(userData.data)
                setSearch(userData?.data)
            }
            catch (err) {
                console.log(err)
            }
        }
        getSearch()
    },[])

    return (
        <>
            {search.length !== 0 &&
                <div className={styles.mainBox}>
                    {search.toReversed().map((ele, ind) =>
                        <div key={ind}  className={styles.searches}>
                            <div onClick={() => handleSuggestion(ele)} className={styles.searchText}>
                                {ele}
                            </div>
                            <div className={styles.delete}>
                                <i class="fa-solid fa-xmark"></i>
                            </div>
                        </div>
                    )}
                </div>
            }
        </>
    )
}
