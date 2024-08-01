import React, { useEffect, useState } from 'react';
import useSpeechToText from 'react-hook-speech-to-text';
import styles from "./Speech.module.css"
import { useDispatch, useSelector } from 'react-redux'
import { setMic } from '../../redux/Data/micSlice';


export default function Speech({ setsearchInput,input }) {
  const theme = useSelector((state) => state.theme.value)
  const mic = useSelector((state) => state.mic.value)
  const dispatch = useDispatch()
  const {
    error,
    interimResult,
    isRecording,
    // results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });
  function handleMic() {
    dispatch(setMic())
    if (mic) {
      stopSpeechToText()
    }
    else {
      startSpeechToText()
      input.current.focus()
    }
  }
  
  useEffect(()=>{
    if (!mic) {
      try{
        stopSpeechToText()
      }
      catch(err){
        console.log(err)
      }
    }
  },[mic])
  if (error) {
    return (<></>)
  }

    return (
      <>
        <div className={styles.btn} onClick={handleMic} style={theme ? {} : { background: "white" }}>
          {mic ? <i class="fa-solid fa-microphone-slash"></i> : <i class="fa-solid fa-microphone"></i>}
        </div>
        {/* <ul> */}
        {/* {results.map((result) => ( */}
        {/* //   <li key={result.timestamp}>{result.transcript}</li> */}
        {/* ))} */}
        {/* <textarea value={interimResult} /> */}
        {interimResult ? setsearchInput(interimResult) : ""}
        {/* </ul> */}
      </>
    );
  }
