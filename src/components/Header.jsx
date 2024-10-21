import React from "react";
import { Link } from "react-router-dom";


const Header = () => {
  return (
    <header className="header">
      <div className="header__inner container">
        <Link to="/" className="header__logo">
          Anigen
        </Link>
        <ul className="header__list">
          <li className="header__item">
            <Link className="header__link" to="/catalog">
              Каталог
            </Link>
          </li>
          <li className="header__item">
            <Link className="header__link" to="#">
              Поиск
            </Link>
          </li>
        </ul>
        <Link to="/profile" className="header__profile">
          Профиль
        </Link>
      </div>
    </header>
  );
};

export default Header;
