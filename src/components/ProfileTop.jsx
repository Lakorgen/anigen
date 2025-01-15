import React from "react";
import ThemeToggle from "./ThemeToggle";
import { UiButton } from "./uikit/UiButton";

const ProfileTop = ({ userEmail, isAuth, onLogout }) => {
  return (
    <div className="flex flex-col sm:flex-row rounded-lg py-5 px-6 bg-white dark:bg-zinc-900 border border-solid border-zinc-200 dark:border-zinc-800 shadow-md items-center shrink-0 gap-4 mb-5 justify-between ">
      <div className="flex items-center shrink-0 gap-4">
        <div className="relative overflow-hidden rounded-lg">
          <img
            className="w-12 h-12 object-cover object-center"
            src="img/profile.webp"
            alt="Аватар пользователя"
            loading="lazy"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <strong className="text-xs whitespace-nowrap text-ellipsis overflow-hidden max-w-54 font-bold text-fuchsia-500 dark:text-fuchsia-600">
            {userEmail || "Аноним"}
          </strong>
          <div className="w-full text-zinc-400 dark:text-zinc-500 text-xs">
            Уровень 999 • Топ 3
          </div>
        </div>
      </div>
      <div className="flex gap-2.5">
        <ThemeToggle />
        <UiButton link="/random">
          <svg
            fill="currentColor"
            version="1.1"
            id="Uploaded to svgrepo.com"
            xmlns="http://www.w3.org/2000/svg"
            width="20px"
            height="20px"
            viewBox="0 0 32 32"
          >
            <path
              d="M19,19h-2v-2h2V19z M27,17h-2v2h2V17z M27,25h-2v2h2V25z M19,25h-2v2h2V25z M23,21h-2v2h2V21z M15,5
  	h-2v2h2V5z M5,15h2v-2H5V15z M9,11h2V9H9V11z M31,14v16c0,0.552-0.448,1-1,1H14c-0.552,0-1-0.448-1-1V19H2c-0.552,0-1-0.448-1-1V2
  	c0-0.552,0.448-1,1-1h16c0.552,0,1,0.448,1,1v11h11C30.552,13,31,13.448,31,14z M3,17h11v-3h3V3H3V17z M29,15H15v14h14V15z"
            />
          </svg>
        </UiButton>
        {isAuth ? (
          <UiButton onClick={onLogout}>Выйти</UiButton>
        ) : (
          <UiButton link="/login" label="Войти" />
        )}
      </div>
    </div>
  );
};

export default ProfileTop;
