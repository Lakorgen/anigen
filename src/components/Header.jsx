import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 text-zinc-950 dark:text-white w-[100vw] min-h-14 h-14 bg-white dark:bg-zinc-950 !bg-opacity-30 dark:!bg-opacity-80 backdrop-blur-md shadow-md max-[640px]:hidden">
      <div className="grid items-center grid-cols-[150px_1fr_30px] h-full container">
        <Link to="/" className="text-3xl font-semibold text-start">
          AniGen
        </Link>
        <ul className="flex items-center mx-auto gap-8">
          <li className="font-semibold">
            <Link
              className="p-1 rounded-lg transition-all relative block before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-0.5 
           dark:before:bg-white before:bg-zinc-950 before:transition-all hover:before:w-full"
              to="/catalog"
            >
              Каталог
            </Link>
          </li>
        </ul>
        <Link
          to="/profile"
          className="p-2 rounded-lg transition-all relative flex items-center justify-center before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-0.5 dark:before:bg-white before:bg-zinc-950 before:transition-all hover:before:w-full"
        >
          <svg
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 45.532 45.532"
          >
            <g>
              <path
                d="M22.766,0.001C10.194,0.001,0,10.193,0,22.766s10.193,22.765,22.766,22.765c12.574,0,22.766-10.192,22.766-22.765
		S35.34,0.001,22.766,0.001z M22.766,6.808c4.16,0,7.531,3.372,7.531,7.53c0,4.159-3.371,7.53-7.531,7.53
		c-4.158,0-7.529-3.371-7.529-7.53C15.237,10.18,18.608,6.808,22.766,6.808z M22.761,39.579c-4.149,0-7.949-1.511-10.88-4.012
		c-0.714-0.609-1.126-1.502-1.126-2.439c0-4.217,3.413-7.592,7.631-7.592h8.762c4.219,0,7.619,3.375,7.619,7.592
		c0,0.938-0.41,1.829-1.125,2.438C30.712,38.068,26.911,39.579,22.761,39.579z"
              />
            </g>
          </svg>
        </Link>
      </div>
    </header>
  );
};

export default Header;
