import React, { useState } from "react";
import clsx from "clsx";

const Sidebar = ({ setSelectedCategory }) => {
  const [categoryActive, setCategoryActive] = useState(0);
  const categoriesList = [
    "Все",
    "Смотрю",
    "В планах",
    "Просмотренно",
    "Брошено",
  ];

  const handleCategoryClick = (index, category) => {
    setCategoryActive(index);
    setSelectedCategory(category); // Вызов функции из родительского компонента
  };

  return (
    <div className="sticky top-0 bg-white dark:bg-zinc-900 border border-solid border-zinc-300 dark:border-zinc-800 rounded-lg px-2 py-2 z-20 max-[600px]:relative min-w-full">
      <span className="inline-flex items-center gap-5 px-2 relative ml-2 text-xs select-none text-zinc-400 dark:text-zinc-500">
        Списки
      </span>
      <div className="p-1">
        {categoriesList.map((categorieName, index) => (
          <div
            key={index}
            onClick={() => handleCategoryClick(index, categorieName)}
            className={clsx(
              "relative flex items-center px-3 py-2 text-zinc-800 dark:text-zinc-100 text-sm rounded-lg whitespace-nowrap transition-colors cursor-pointer hover:bg-fuchsia-200 dark:hover:bg-fuchsia-500 font-semibold",
              categoryActive === index &&
                "bg-fuchsia-400 hover:bg-fuchsia-400 dark:bg-fuchsia-600 dark:hover:bg-fuchsia-600 !text-white"
            )}
          >
            {categorieName}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
