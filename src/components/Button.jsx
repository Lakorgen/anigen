import React from "react";
import { Link } from "react-router-dom";

const Button = ({ label, onClick, link, className = "", children }) => {
  return (
    <Link
      to={link}
      onClick={onClick}
      className={`flex text-fuchsia-500 border justify-center items-center border-solid border-fuchsia-500 
        hover:border-fuchsia-600 text-sm md:text-lg
        py-2 px-4 rounded-lg transition duration-300 hover:bg-fuchsia-600 hover:text-white 
        focus:outline-none focus:ring-2 focus:ring-fuchsia-400 dark:bg-fuchsia-600
         dark:text-white dark:border-fuchsia-600 dark:hover:bg-fuchsia-700
         dark:hover:border-fuchsia-700 ${className}`}
    >
      {children}
      {label}
    </Link>
  );
};

export default Button;
