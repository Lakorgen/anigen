import React, { useState, useEffect } from "react";
import ProfileCard from "../components/ProfileCard";
import SkeletonProfile from "../components/ProfileCard/SkeletonProfile";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../store/slices/userSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.user.email);
  const { isAuth, email } = useAuth();
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
      {/* {!isAuth ? <Navigate to="/login" /> : ""} */}
      <div className="profile">
        <div className="profile__top">
          <div className="profile__img">
            <img
              src="img/scale_2400.jpg"
              alt="Аватар пользователя"
              loading="lazy"
            />
          </div>
          <div className="profile__info">
            <strong className="profile__name">{userEmail || "Аноним"}</strong>
            <div className="profile__lvl">Уровень 999 • Топ 3</div>
          </div>

          {isAuth ? (
            <button className="profile__btn" onClick={() => dispatch(removeUser())}>
              Выйти из аккаунта
            </button>
          ) : (
            <Link className="profile__btn" to={"/login"}>Войти в аккаунт</Link>
          )}
        </div>

        <div className="profile__wrapper">
          <Sidebar />
          <div className="profile__content">
            <div className="profile__cards">
              {loading &&
                [...Array(6)].map((_, index) => (
                  <SkeletonProfile key={index} />
                ))}{" "}
              {/* Отображаем скелетоны во время загрузки */}
              {error && <div>Ошибка: {error}</div>} {/* Сообщение об ошибке */}
              {items.map((item) => (
                <ProfileCard key={item.id} {...item} />
              ))}
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
