import Home from "./components/home/Home";
import { Routes, Route } from "react-router-dom";
import { lightTheme,darkTheme } from "./themes";
import Signin from "./components/auth/Signin";
import Signup from "./components/auth/Signup";
import VideoPlay from "./components/videoplay/VideoPlay";
import styles from "./App.module.css"


function App() {
  
  return (
    <div className={styles.mainBox} style={darkTheme}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/player' element={<VideoPlay />} />
      </Routes>
    </div>
  );
}

export default App;
