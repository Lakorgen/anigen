import React from "react";
import { Link } from "react-router-dom";

const Card = ({ id, russian, image, kind, score }) => {
  return (
    <Link
      to={`/anime/${id}`}
      className="group relative block w-full max-w-[140px] shrink-0 self-start transition-transform duration-300 hover:-translate-y-2"
    >
      <div className="relative aspect-[1/1.4] w-full overflow-hidden rounded-lg">
        <img
          src={`https://shikimori.one/${image.original || image}`}
          alt={russian || "Anime image"}
          className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-fuchsia-500/50 via-fuchsia-500/20 dark:from-fuchsia-600/50 dark:via-fuchsia-600/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="absolute left-2 top-2 rounded bg-fuchsia-500 dark:bg-fuchsia-600 px-1.5 py-0.5 text-xs font-bold text-white">
          {score}
        </div>
      </div>

      <div className="mt-2 space-y-1">
        <h3 className="line-clamp-2 text-sm font-semibold leading-tight text-zinc-900 transition-colors group-hover:text-fuchsia-500 dark:text-zinc-100 dark:group-hover:text-fuchsia-600">
          {russian}
        </h3>
        <p className="text-xs uppercase text-zinc-500 dark:text-zinc-400">
          {kind}
        </p>
      </div>
    </Link>
  );
};

export default Card;
