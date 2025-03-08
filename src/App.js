import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useLocation } from "react-router-dom";
import styles from "./App.module.css";
import Signin from "./components/auth/Signin";
import Signup from "./components/auth/Signup";
import Channels from "./components/Channels/Channels";
import History from "./components/history/Histories";
import Home from "./components/home/Home";
import MusicHome from "./components/music/musicHome/Home";
import Player from "./components/music/musicPlayer/Player";
import MusicSearch from "./components/music/musicSearch/SearchMusic";
import PageNotFound from "./components/pageNotFound/PageNotFound";
import SearchedVid from "./components/searchedVid/SearchedVid";
import Shorts from "./components/shorts/Shorts";
import Subscribes from "./components/subscribes/Subscribes";
import VideoPlay from "./components/videoplay/VideoPlay";
import { setSignin, setSignout } from "./redux/Data/signSlice";
import { darkTheme, lightTheme } from "./themes";
import FavMusic from "./components/music/musicFavorite/FavMusic";

function App() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.value)
  const [playingVideoId, setPlayingVideoId] = useState(null);
  const [playing, setPlaying] = useState(false);
  const location = useLocation();
  
  useEffect(()=>{
    if(localStorage.getItem('theme')===null){
      localStorage.setItem('theme',true)
    }
  },[])
  useEffect(() => {
    async function currentUser() {
        try {
            const userD = await axios.get(`https://video-streaming-app-backend-r6e3.onrender.com/api/users/get`,
                { withCredentials: true }
            )
            // console.log(userD)
            if(userD?.data?.success===false){
              const userData = await axios.post("https://video-streaming-app-backend-r6e3.onrender.com/api/auth/logout", {}, { withCredentials: true });
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
          <Route path='/music' element={<MusicHome playingVideoId={playingVideoId} setPlayingVideoId={setPlayingVideoId} playing={playing} setPlaying={setPlaying}/>} />
          <Route path='/music/:id' element={<MusicSearch playingVideoId={playingVideoId} setPlayingVideoId={setPlayingVideoId} playing={playing} setPlaying={setPlaying}/>} />
          <Route path='/music/favorite/song' element={<FavMusic playingVideoId={playingVideoId} setPlayingVideoId={setPlayingVideoId} playing={playing} setPlaying={setPlaying}/>} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
        {location.pathname.includes('music') && <Player playingVideoId={playingVideoId} playing={playing} setPlaying={setPlaying}></Player>}
    </div>
  );
}

export default App;
