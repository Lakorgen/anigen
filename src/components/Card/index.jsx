import React from "react";
import { Link } from "react-router-dom";
import styles from "./Card.module.scss"; // Импорт стилей

const Card = ({ id, russian, image, kind, score }) => {
  return (
    <Link to={`/anime/${id}`} className={styles.card}>
      <div className={styles["card-img"]}>
        <img 
          src={`https://shikimori.one/${image.original || image}`} 
          alt={russian || "Anime image"} 
        />
      </div>
      <div className={styles["card-text"]}>
        <p className={styles["card-title"]}>{russian}</p>
        <p className={styles["card-category"]}>{kind}</p>
      </div>
      <div className={styles["card-score"]}>{score}</div>
    </Link>
  );
};

export default Card;