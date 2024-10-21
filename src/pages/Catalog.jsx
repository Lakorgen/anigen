import React, { useState, useEffect } from "react";
import ProfileCard from "../components/ProfileCard";
import SkeletonProfile from "../components/ProfileCard/SkeletonProfile";
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
    setLoading(true); // Включаем индикатор загрузки при смене категории
    setPage(1); // Сбрасываем номер страницы
    fetchItems(1, status); // Загружаем первую страницу при смене категории
  }, [activeCategory]); // Добавляем activeCategory в зависимости

  useEffect(() => {
    const status = categoriesStatusMap[activeCategory]; // Получаем статус по активной категории
    if (page > 1) {
      fetchItems(page, status); // Загружаем данные при изменении страницы
    }
  }, [page, activeCategory]); // Запрос при изменении page или activeCategory

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 5 && !isFetching) {
      setPage((prevPage) => prevPage + 1); // Увеличиваем номер страницы для подгрузки новых данных
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll); // Добавляем слушатель скролла
    return () => window.removeEventListener("scroll", handleScroll); // Убираем слушатель при размонтировании компонента
  }, [isFetching]); // Срабатывает при изменении состояния `isFetching`

  const handleCategoryChange = (index) => {
    setActiveCategory(index); // Устанавливаем новую активную категорию
    setItems([]); // Очищаем предыдущие элементы при смене категории, если это нужно
  };

  return (
    <div>
      <div className="profile">
        <div className="profile__wrapper">
          <SidebarCatalog 
            categoryActive={activeCategory} 
            setCategoryActive={handleCategoryChange} 
          />
          <div className="profile__content">
            <div className="profile__cards">
              {/* Отображаем скелетоны во время загрузки */}
              {loading && 
                [...Array(6)].map((_, index) => <SkeletonProfile key={index} />)
              }
              {/* Отображаем карточки профиля, когда данные загружены */}
              {!loading &&
                items.map((item) => <ProfileCard key={item.id} {...item} />)
              }
              {error && <div>Ошибка: {error}</div>} {/* Сообщение об ошибке */}
            </div>
            {isFetching && <div>Загружаем ещё...</div>} {/* Индикатор загрузки следующей страницы */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalog;