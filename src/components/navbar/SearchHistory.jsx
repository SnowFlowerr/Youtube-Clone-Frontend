import axios from 'axios';
import React, { useEffect } from 'react';
import styles from "./SearchHistory.module.css";

export default function SearchHistory({ handleSuggestion,search,setSearch }) {
    

    useEffect(()=>{
        async function getSearch() {
            try {
                const userData = await axios.get("https://honest-stillness-production.up.railway.app/api/users/getsearchHistory",
                    { withCredentials: true });
                // console.log(userData.data)
                    setSearch([...userData?.data])
            }
            catch (err) {
                console.log(err)
            }
        }
        getSearch()
    },[])

    async function delSearch(ele) {
        try {
            const userData = await axios.delete(`https://honest-stillness-production.up.railway.app/api/users/removesearchHistory/${ele}`,
                { withCredentials: true });
            setSearch(userData?.data)
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            {search.length !== 0 &&
                <div className={styles.mainBox}>
                    {search.map((ele, ind) =>
                        <div key={ind}  className={styles.searches}>
                            <div onClick={() =>handleSuggestion(ele)} className={styles.searchText}>
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
