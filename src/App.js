import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from "react-router-dom";
import styles from "./App.module.css";
import Signin from "./components/auth/Signin";
import Signup from "./components/auth/Signup";
import Channels from "./components/Channels/Channels";
import History from "./components/history/Histories";
import Home from "./components/home/Home";
import PageNotFound from "./components/pageNotFound/PageNotFound";
import SearchedVid from "./components/searchedVid/SearchedVid";
import Shorts from "./components/shorts/Shorts";
import Subscribes from "./components/subscribes/Subscribes";
import VideoPlay from "./components/videoplay/VideoPlay";
import { setSignin, setSignout } from "./redux/Data/signSlice";
import { darkTheme, lightTheme } from "./themes";

function App() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.value)
  
  useEffect(()=>{
    if(localStorage.getItem('theme')===null){
      localStorage.setItem('theme',true)
    }
  },[])
  useEffect(() => {
    async function currentUser() {
        try {
            const userD = await axios.get(`https://video-streaming-app-backend-production.up.railway.app/api/users/get`,
                { withCredentials: true }
            )
            // console.log(userD)
            if(userD?.data?.success===false){
              const userData = await axios.post("https://video-streaming-app-backend-production.up.railway.app/api/auth/logout", {}, { withCredentials: true });
                dispatch(setSignout())
            }
            else{
                dispatch(setSignin(userD.data))
            }
        }
        catch (err) {
            
            // localStorage.removeItem("userData")
            console.log(err)
        }
    }
    currentUser()
}, [])


  return (
    <div className={styles.mainBox} style={theme?darkTheme:lightTheme}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/player/:id' element={<VideoPlay />} />
          <Route path='/searchedvideo/:search' element={<SearchedVid />} />
          <Route path='/shorts/:id' element={<Shorts />} />
          <Route path='/history' element={<History />} />
          <Route path='/subscribes' element={<Subscribes />} />
          <Route path='/channels/:id/:category' element={<Channels />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
    </div>
  );
}

export default App;
