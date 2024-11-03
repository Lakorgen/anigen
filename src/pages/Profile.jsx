import React, { useState, useEffect } from "react";
import ProfileCard from "../components/ProfileCard";
import SkeletonProfile from "../components/ProfileCard/SkeletonProfile";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../store/slices/userSlice";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const Profile = () => {
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.user.email);
  const userId = useSelector((state) => state.user.id);
  const { isAuth } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("Все"); // Состояние для выбранной категории

  const fetchUserAnime = async () => {
    try {
      const userAnimeCollection = collection(db, "users", userId, "anime");
      const animeSnapshot = await getDocs(userAnimeCollection);

      const animeList = animeSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setItems(animeList);
      setLoading(false);
      console.log(animeList);
    } catch (error) {
      console.error("Ошибка при загрузке данных из Firestore:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuth) {
      fetchUserAnime();
    }
  }, [isAuth]);

  // Функция для фильтрации элементов по категории
  const filteredItems = items.filter((item) => {
    if (selectedCategory === "Все") return true; // Все
    return item.status === selectedCategory; // Фильтрация по статусу
  });

  return (
    <div>
      <div className="profile">
        <div className="profile__top">
          <div className="profile__left">
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
          </div>

          {isAuth ? (
            <button
              className="profile__btn"
              onClick={() => dispatch(removeUser())}
            >
              Выйти
            </button>
          ) : (
            <Link className="profile__btn" to={"/login"}>
              Войти
            </Link>
          )}
        </div>

        <div className="profile__wrapper">
          <Sidebar setSelectedCategory={setSelectedCategory} />{" "}
          {/* Передача функции для выбора категории */}
          <div className="profile__content">
            {isAuth ? (
              <div className="profile__cards">
                {loading &&
                  [...Array(6)].map((_, index) => (
                    <SkeletonProfile key={index} />
                  ))}
                {error && <div>Ошибка: {error}</div>}
                {filteredItems.map((item) => (
                  <ProfileCard key={item.id} {...item} />
                ))}
              </div>
            ) : (
              <div className="profile__content-info">Нужно войти в аккаунт</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
