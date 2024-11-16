import styles from "./TrailerBanner.module.scss";
import { Link } from "react-router-dom";
import React from 'react'

const TrailerBanner = ({ title, description }) => {
  const videoRef = React.useRef(null);

  React.useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 20; 
    }
  }, []);
  return (
    <div className={styles.banner}>
      <video
              ref={videoRef}
        src="/media/titan.mp4"
        autoPlay
        muted
        loop
        className={styles.video}
      />
      <div className={styles.overlay}>
        <div className={styles.texts}>
          <h1 className={styles.title}>{title}</h1>
          <Link to={`/anime/40028`} className={styles.btn}>Cмотреть</Link>
        </div>
      </div>
    </div>
  );
};

export default TrailerBanner;
