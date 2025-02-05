import React from 'react'
import styles from "./Queue.module.css"
import Cards from './Cards'

export default function Queue({toClose, queue, id}) {
    
    return (
        <div className={styles.box}>
            <div className={styles.heading}>
                <div className={styles.mainHeading}>
                    Queue
                </div>
                <div className={styles.cross} onClick={() => toClose(false)}>
                    <i className="fa-solid fa-xmark"></i>
                </div>
            </div>
            <div className={styles.videos}>
                {queue.map((video)=>
                <div key={video._id} className={id==video._id ? styles.selected:styles.notSelected} >
                    <Cards video={video} ></Cards>
                </div>)}
            </div>
        </div>
    )
}
