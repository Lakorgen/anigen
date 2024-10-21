import React from "react";
import { Link } from "react-router-dom";

const ProfileCard = ({ russian, image, kind, score }) => {
  return (
    <Link to="#" className="profile__card">
      <div className="profile__card-img">
        <img src={"https://shikimori.one/" + image.original} alt="" />
      </div>
      <div className="profile__card-text">
        <p className="profile__card-title">{russian}</p>
        <p className="profile__card-category">{kind}</p>
      </div>
      <div className="profile__card-score">{score}</div>
    </Link>
  );
};
export default ProfileCard;
