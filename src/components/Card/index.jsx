import React from "react";
import { Link } from "react-router-dom";

const Card = ({ id, russian, image, kind, score }) => {
  return (
    <Link
      to={`/anime/${id}`}
      className="group relative block shrink-0 w-full max-w-[140px] min-w-px self-start text-zinc-800 dark:text-zinc-100 hover:text-fuchsia-500 dark:hover:text-fuchsia-500 hover:-translate-x-1 hover:-translate-y-2.5 transition-all"
    >
      <div
        className="relative pt-[140%] max-w-full rounded-md overflow-hidden after:absolute after:top-0 after:left-0 after:w-full after:h-full hover:after:bg-card-gradient
      after:opacity-0 group-hover:after:opacity-100 after:transition-opacity"
      >
        <img
          src={`https://shikimori.one/${image.original || image}`}
          alt={russian || "Anime image"}
          className="absolute top-0 left-0 w-full h-full block object-cover object-center opacity-100 transition-all"
        />
      </div>
      <div className="pt-2 max-h-14 text-sm leading-4">
        <p className=" font-semibold line-clamp-2 ">{russian}</p>
        <p className="text-xs uppercase text-zinc-500 dark:text-zinc-400">
          {kind}
        </p>
      </div>
      <div className="absolute top-2 left-2 bg-fuchsia-500 dark:bg-fuchsia-600 text-white px-1 py-0.5 rounded font-bold text-xs">
        {score}
      </div>
    </Link>
  );
};

export default Card;
