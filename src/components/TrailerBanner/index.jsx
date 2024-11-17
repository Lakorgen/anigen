import styles from "./TrailerBanner.module.scss";
import { Link } from "react-router-dom";
import React from "react";

const TrailerBanner = ({ title, description }) => {
  const videoRef = React.useRef(null);
  const [isVideoLoaded, setIsVideoLoaded] = React.useState(false);

  React.useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 20;
    }
  }, []);

  const handleVideoLoaded = () => {
    setIsVideoLoaded(true);
  };

  return (
    <div className={styles.banner}>
      {!isVideoLoaded && (
        <img
          src="/img/attack.jpg"
          alt="Placeholder"
          className={styles.placeholder}
        />
      )}
      <video
        ref={videoRef}
        src="/media/titan.webm"
        autoPlay
        muted
        loop
        onLoadedData={handleVideoLoaded}
        className={`${styles.video} ${isVideoLoaded ? styles.visible : styles.hidden}`}
      />
      <div className={styles.overlay}>
        <div className={styles.texts}>
          {/* <h1 className={styles.title}>{title}</h1> */}
          <Link to={`/anime/40028`} className={styles.btn}>
            ATTACK ON TITAN
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TrailerBanner;