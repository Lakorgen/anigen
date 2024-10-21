import React, { useState } from "react";

const SidebarCatalog = ({ categoryActive, setCategoryActive }) => {
  const categoriesList = {
    Все: "",
    Онгоинг: "ongoing",
    Завершён: "released",
    Анонс: "anons",
  };

  return (
    <div className="sidebar">
      <span>Списки</span>
      <div className="sidebar__menu">
        {Object.keys(categoriesList).map((categorieName, index) => (
          <div
            key={index}
            onClick={() => setCategoryActive(index)} // Вызов функции для изменения категории
            className={
              "sidebar__menu-item " +
              (categoryActive === index ? "sidebar__menu-item--active" : "")
            }
          >
            {categorieName}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SidebarCatalog;