import React from "react";
import { Link } from "react-router-dom";


const PopularCard = ({ russian, image, kind, score }) => {
  return (
    <Link to="#" className="popular__card">
      <div className="popular__card-img">
        <img src={"https://shikimori.one/"+image.original} alt="" />
      </div>
      <div className="popular__card-text">
        <p className="popular__card-title">{russian}</p>
        <p className="popular__card-category">{kind}</p>
      </div>
      <div className="popular__card-score">
        {score}
      </div>
    </Link>
  );
};

export default PopularCard;
