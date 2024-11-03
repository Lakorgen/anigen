import React, { useState } from "react";

const Sidebar = ({ setSelectedCategory }) => {
  const [categoryActive, setCategoryActive] = useState(0);
  const categoriesList = ["Все", "Смотрю", "В планах", "Просмотренно", "Брошено"];

  const handleCategoryClick = (index, category) => {
    setCategoryActive(index);
    setSelectedCategory(category); // Вызов функции из родительского компонента
  };

  return (
    <div className="sidebar">
      <span>Списки</span>
      <div className="sidebar__menu">
        {categoriesList.map((categorieName, index) => (
          <div
            key={index}
            onClick={() => handleCategoryClick(index, categorieName)}
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