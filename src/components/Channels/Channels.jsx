import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { darkTheme, lightTheme } from "../../themes";
import Cards from "../home/Cards";
import Navbar from "../navbar/Navbar";
import Sidenav from "../navbar/Sidenav";
import styles from "./Channels.module.css";
import ShortsCard from "./ShortsCard";

export default function Channels() {
  const [user, setUser] = useState("");
  let { id } = useParams();
  let { category } = useParams();
  const navigate = useNavigate();
  const theme = useSelector((state) => state.theme.value);
  const [shorts, setShorts] = useState([])
  const [videos, setVideos] = useState([])
  const sign = useSelector((state) => state.sign?.value)


  useEffect(() => {
    currentUser();
    currentShorts();
    currentVideos()
  }, [category]);
  async function currentUser() {
    try {
      const userD = await axios.get(
        `https://honest-stillness-production.up.railway.app/api/users/get/${id}`,
        { withCredentials: true }
      );
      setUser(userD.data);
    } catch (err) {
      navigate("/notfound");
      console.log(err);
    }
  }

  async function currentShorts() {
    try {
      const short = await axios.get(
        `https://honest-stillness-production.up.railway.app/api/shorts/allcurrentshorts/${id}?limit=${category === "shorts" ? 20 : 6}`,
        { withCredentials: true }
      );
      setShorts(short.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function currentVideos() {
    try {
      const short = await axios.get(
        `https://honest-stillness-production.up.railway.app/api/videos/allcurrentvideos/${id}?limit=20`,
        { withCredentials: true }
      );
      setVideos(short.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={styles.main}>
      <div>
        <Navbar></Navbar>
      </div>
      <div className={styles.mainbox}>
        <div className={styles.Sidenav}>
          <Sidenav></Sidenav>
        </div>
        <div className={styles.box}>
          {id === sign._id ?
            <div className={styles.banner}>
              <img src="https://t4.ftcdn.net/jpg/04/13/46/95/360_F_413469574_7DUYB9rlik6Ua7lM7SXJ6IpUxq5sGUOE.jpg" alt="" width="100%" height="100%"/>
              <div className={styles.addBanner}>
                weibckjwac
              </div>
            </div>
            :
            <>
            {
              user.bannerImg &&
                <div className={styles.banner}>
                  <img
                    src={user.bannerImg}
                    alt="banner"
                    width="100%"
                    height="100%"
                  />
                </div>
            }
            </>
          }
          <div className={styles.userDetails}>
            <div className={styles.userIcon}>
              <img src={user.img} alt="userIcon" width="100%" height="100%" />
            </div>
            <div className={styles.userDet}>
              <div className={styles.name}>
                {user?.name}
              </div>
              <div className={styles.username}>
                <span>@{user?.username}</span> .{" "}
                <span>{user?.followers} subscribers</span>
              </div>
              <div className={styles.about}>
                about{" "}
                <span>
                  <i className="fa-solid fa-pen-to-square"></i>
                </span>
              </div>
              <div className={styles.userLink}>
                <a href={`https://streamsphere-streaming.vercel.app/channels/${id}/featured`}>
                  streamsphere-streaming.vercel.app/channels/{id}/featured
                </a>
              </div>
              <div className={styles.subscribe} style={theme ? lightTheme : darkTheme}>
                Subscribe
              </div>
            </div>
          </div>
          <div className={styles.option}>
            <div style={theme ? category === "featured" ? { borderColor: "white" } : {} : category === "featured" ? { borderColor: "black", color: "black" } : { color: "black" }} onClick={() => navigate(`/channels/${user._id}/featured`)}>
              Home
            </div>
            <div style={theme ? category === "videos" ? { borderColor: "white" } : {} : category === "videos" ? { borderColor: "black", color: "black" } : { color: "black" }} onClick={() => navigate(`/channels/${user._id}/videos`)}>
              Videos
            </div>
            <div style={theme ? category === "shorts" ? { borderColor: "white" } : {} : category === "shorts" ? { borderColor: "black", color: "black" } : { color: "black" }} onClick={() => navigate(`/channels/${user._id}/shorts`)}>
              Shorts
            </div>
          </div>
          <hr />
          <div className={styles.allOptions}>
            {
              category === "featured" &&
              <div className={styles.featured}>
                <div className={styles.shortsLogo} style={theme ? { backgroundColor: "white", color: "black" } : { backgroundColor: "black", color: "white" }}>
                  <i className="fa-solid fa-circle-play"></i> Shorts
                </div>
                <div className={styles.shorts}>
                  {
                    shorts.map((video, index) =>
                      <ShortsCard video={video} key={index} index={index} category={category} />
                    )
                  }
                </div>
                <hr />
                <div className={styles.shortsLogo} style={theme ? { backgroundColor: "white", color: "black" } : { backgroundColor: "black", color: "white" }}>
                  <i className="fa-solid fa-video"></i> Video
                </div>
                <div className={styles.video}>
                  {
                    videos.map((video, index) =>
                      <Cards video={video} key={index} index={index} />
                    )
                  }
                </div>
              </div>
            }
            {
              category === "videos" &&
              <div className={styles.featured}>
                <div className={styles.shortsLogo} style={theme ? { backgroundColor: "white", color: "black" } : { backgroundColor: "black", color: "white" }}>
                  <i className="fa-solid fa-video"></i> Video
                </div>
                <div className={styles.video}>
                  {
                    videos.map((video, index) =>
                      <Cards video={video} key={index} index={index} />
                    )
                  }
                </div>
              </div>
            }
            {
              category === "shorts" &&
              <div className={styles.featured}>
                <div className={styles.shortsLogo} style={theme ? { backgroundColor: "white", color: "black" } : { backgroundColor: "black", color: "white" }}>
                  <i className="fa-solid fa-circle-play"></i> Shorts
                </div>
                <div className={styles.shorts}>
                  {
                    shorts.map((video, index) =>
                      <ShortsCard video={video} key={index} index={index} />
                    )
                  }
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}
