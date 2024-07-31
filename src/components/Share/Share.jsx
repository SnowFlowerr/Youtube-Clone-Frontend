import React from 'react'
import { RWebShare } from "react-web-share";

export default function Share({share, text, url, title}) {
    return (
        <>
            <RWebShare
                data={{
                    text,
                    url,
                    title:`Share : ${title}`,
                }}
                onClick={() => console.log("shared successfully!")}
            >
                {share}
            </RWebShare>
        </>
    )
}
