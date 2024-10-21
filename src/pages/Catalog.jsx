import React, { useState, useEffect } from "react";
import ProfileCard from "../components/ProfileCard";
import SidebarCatalog from "../components/SidebarCatalog";

const Catalog = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true); // Состояние загрузки
  const [error, setError] = useState(null); // Состояние для обработки ошибок
  const [page, setPage] = useState(1); // Текущая страница для загрузки
  const [isFetching, setIsFetching] = useState(false); // Для предотвращения повторных запросов
  const [activeCategory, setActiveCategory] = useState(0); // Состояние активной категории

  // Маппинг категорий на статус
  const categoriesStatusMap = {
    0: "",          // Все
    1: "ongoing",   // Онгоинг
    2: "released",  // Завершён
    3: "anons",     // Анонс
  };

  const fetchItems = (page, status) => {
    setIsFetching(true); // Начинаем новый запрос
    fetch(
      `https://shikimori.one/api/animes?order=ranked&status=${status}&limit=30&page=${page}`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Ошибка загрузки данных");
        }
        return res.json();
      })
      .then((json) => {
        setItems((prevItems) => [...prevItems, ...json]); // Добавляем новые данные к существующим
        setLoading(false); // Отключаем индикатор загрузки
        setIsFetching(false); // Завершаем запрос
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
        setIsFetching(false);
      });
  };

  useEffect(() => {
    const status = categoriesStatusMap[activeCategory]; // Получаем статус по активной категории
    fetchItems(page, status); // Загрузка первой страницы при монтировании компонента
  }, [page, activeCategory]); // Добавляем activeCategory в зависимости

  const handleScroll = () => {
    // Проверяем, достиг ли пользователь конца страницы
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    // Если пользователь достиг конца страницы
    if (scrollTop + clientHeight >= scrollHeight - 5 && !isFetching) {
      setPage((prevPage) => prevPage + 1); // Увеличиваем номер страницы для подгрузки новых данных
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll); // Добавляем слушатель скролла
    return () => window.removeEventListener("scroll", handleScroll); // Убираем слушатель при размонтировании компонента
  }, [isFetching]); // Срабатывает при изменении состояния `isFetching`

  // Функция обработки изменения категории
  const handleCategoryChange = (index) => {
    setActiveCategory(index); // Устанавливаем новую активную категорию
    setItems([]); // Очищаем предыдущие элементы
    setPage(1); // Сбрасываем номер страницы
  };

  return (
    <div>
      <div className="profile">
        <div className="profile__wrapper">
          <SidebarCatalog 
            categoryActive={activeCategory} 
            setCategoryActive={handleCategoryChange} // Передаем новую функцию
          />
          <div className="profile__content">
            <div className="profile__cards">
              {loading && <div>Загрузка...</div>} {/* Индикатор загрузки */}
              {error && <div>Ошибка: {error}</div>} {/* Сообщение об ошибке */}
              {items.map((item) => {
                return item && <ProfileCard key={item.id} {...item} />;
              })}
            </div>
            {isFetching && <div>Загружаем ещё...</div>}{" "}
            {/* Индикатор загрузки следующей страницы */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalog;