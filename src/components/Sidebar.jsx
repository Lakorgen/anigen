import React, { useState } from "react";

const Sidebar = () => {
  const [categoryActive, setCategoryActive] = useState(0);
  const categoriesList = ["Все", "Смотрю", "Запланировано", "Просмотрено"];

  return (
    <div className="sidebar">
      <span>Списки</span>
      <div className="sidebar__menu">
        {categoriesList.map((categorieName, index) => (
          <div
            key={index}
            onClick={() => setCategoryActive(index)}
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

export default Sidebar;
