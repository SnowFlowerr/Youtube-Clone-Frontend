import Home from "./components/home/Home";
import { Routes, Route } from "react-router-dom";
import { lightTheme, darkTheme } from "./themes";
import Signin from "./components/auth/Signin";
import Signup from "./components/auth/Signup";
import VideoPlay from "./components/videoplay/VideoPlay";
import SearchedVid from "./components/searchedVid/SearchedVid";
import styles from "./App.module.css"
import { useEffect } from "react";
import { useSelector } from 'react-redux'

function App() {
  const theme = useSelector((state) => state.theme.value)
  useEffect(()=>{
    if(localStorage.getItem('theme')===null){
      localStorage.setItem('theme',true)
    }
  },[])
  return (
    <div className={styles.mainBox} style={theme?darkTheme:lightTheme}>
      
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/player/:id' element={<VideoPlay />} />
          <Route path='/searchedvideo' element={<SearchedVid />} />
        </Routes>
    </div>
  );
}

export default App;
