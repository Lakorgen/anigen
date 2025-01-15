import React from "react";
import { NavLink } from "react-router-dom";

const MobileMenu = () => {
  return (
    <div className="flex sm:hidden mx-2.5 bg-white dark:bg-zinc-900 border border-solid border-zinc-300 dark:border-zinc-800 fixed z-50 bottom-2.5 right-1.5 left-1.5 h-14 rounded-lg items-center">
      <ul
        className="text-zinc-800 dark:text-zinc-100
      w-full flex items-end justify-around gap-2.5"
      >
        <li className="text-xs">
          <NavLink
            to="/catalog"
            className="flex gap-1 flex-col items-center justify-center transition-all outline-0 group aria-[current=page]:-translate-y-0.5"
          >
            <svg
              className="w-4 h-4 group-aria-[current=page]:opacity-100 opacity-30"
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="layer-group"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              fill="currentColor"
            >
              <path d="M264.5 5.2c14.9-6.9 32.1-6.9 47 0l218.6 101c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 149.8C37.4 145.8 32 137.3 32 128s5.4-17.9 13.9-21.8L264.5 5.2zM476.9 209.6l53.2 24.6c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 277.8C37.4 273.8 32 265.3 32 256s5.4-17.9 13.9-21.8l53.2-24.6 152 70.2c23.4 10.8 50.4 10.8 73.8 0l152-70.2zm-152 198.2l152-70.2 53.2 24.6c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 405.8C37.4 401.8 32 393.3 32 384s5.4-17.9 13.9-21.8l53.2-24.6 152 70.2c23.4 10.8 50.4 10.8 73.8 0z"></path>
            </svg>
            Каталог
          </NavLink>
        </li>
        <li className="text-xs">
          <NavLink
            to="/"
            className="flex gap-1 flex-col items-center justify-center transition-all outline-0 group aria-[current=page]:-translate-y-0.5"
          >
            <svg
              className="w-4 h-4 group-aria-[current=page]:opacity-100 opacity-30"
              viewBox="0 0 16 16"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1 6V15H6V11C6 9.89543 6.89543 9 8 9C9.10457 9 10 9.89543 10 11V15H15V6L8 0L1 6Z" />
            </svg>
            Главная
          </NavLink>
        </li>
        <li className="text-xs">
          <NavLink
            to="/profile"
            className="flex gap-1 flex-col items-center justify-center transition-all outline-0 group aria-[current=page]:-translate-y-0.5"
          >
            <svg
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 group-aria-[current=page]:opacity-100 opacity-30"
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
            Профиль
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default MobileMenu;
