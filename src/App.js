import Home from "./components/home/Home";
import { Routes, Route } from "react-router-dom";
import { lightTheme, darkTheme } from "./themes";
import Signin from "./components/auth/Signin";
import Signup from "./components/auth/Signup";
import VideoPlay from "./components/videoplay/VideoPlay";
import SearchedVid from "./components/searchedVid/SearchedVid";
import styles from "./App.module.css"
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import Shorts from "./components/shorts/Shorts";
import History from "./components/history/Histories";
import PageNotFound from "./components/pageNotFound/PageNotFound";
import axios from "axios";
import { setSignin, setSignout } from "./redux/Data/signSlice";
import Cookies from 'js-cookie'

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
            const userD = await axios.get(`https://honest-stillness-production.up.railway.app/api/users/get`,
                { withCredentials: true }
            )
            // console.log(userD)
            if(userD?.data?.success===false){
                Cookies.remove('access_token', { path: '/' });
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
          <Route path='*' element={<PageNotFound />} />
        </Routes>
    </div>
  );
}

export default App;
