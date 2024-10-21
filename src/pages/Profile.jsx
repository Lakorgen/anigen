import React, { useState, useEffect } from "react";
import ProfileCard from "../components/ProfileCard";
import Sidebar from "../components/Sidebar";

const Profile = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true); // Состояние загрузки
  const [error, setError] = useState(null); // Состояние для обработки ошибок
  const [page, setPage] = useState(1); // Текущая страница для загрузки
  const [isFetching, setIsFetching] = useState(false); // Для предотвращения повторных запросов

  const fetchItems = (page) => {
    setIsFetching(true); // Начинаем новый запрос
    fetch(
      `https://shikimori.one/api/animes?order=ranked&status=released&limit=30&page=${page}`
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
    fetchItems(page); // Загрузка первой страницы при монтировании компонента
  }, [page]);

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

  return (
    <div>
      <div className="profile">
        <div className="profile__top">
          <div className="profile__img">
            <img
              src="https://cover.imglib.info/static/images/placeholders/user_avatar.png"
              alt="Аватар пользователя"
              loading="lazy"
            />
          </div>
          <div className="profile__info">
            <strong className="profile__name">Lakorgen</strong>
            <div className="profile__lvl"> Уровень 999 • Топ 3</div>
          </div>
        </div>

        <div className="profile__wrapper">
          <Sidebar />
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

export default Profile;
