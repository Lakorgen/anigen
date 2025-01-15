import React, { useState, useEffect, useCallback } from "react";
import { Helmet } from "react-helmet";
import Card from "../components/Card";
import Skeleton from "../components/Skeleton";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../hooks/use-auth";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../store/slices/userSlice";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import transition from "../transition";
// import Search from "../components/Search";
import ProfileTop from "../components/ProfileTop";

const Profile = () => {
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.user.email);
  const userId = useSelector((state) => state.user.id);
  const { isAuth } = useAuth();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("Все"); // Состояние для выбранной категории

  const fetchUserAnime = useCallback(async () => {
    try {
      const userAnimeCollection = collection(db, "users", userId, "anime");
      const animeSnapshot = await getDocs(userAnimeCollection);

      const animeList = animeSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setItems(animeList);
      setLoading(false);
    } catch (error) {
      console.error("Ошибка при загрузке данных из Firestore:", error);
      setError(error.message);
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (isAuth) {
      fetchUserAnime();
    }
  }, [isAuth, fetchUserAnime]);

  // Функция для фильтрации элементов по категории
  const filteredItems = items.filter((item) => {
    if (selectedCategory === "Все") return true; // Все
    return item.status === selectedCategory; // Фильтрация по статусу
  });

  const toggleTheme = useCallback(() => {
    // const currentTheme = document.body.getAttribute("data-theme");
    // const newTheme = currentTheme === "dark" ? "light" : "dark";
    // document.body.setAttribute("data-theme", newTheme);
    // localStorage.setItem("theme", newTheme);
    const currentTheme = document.body.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    document.body.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  }, []);

  const handleLogout = useCallback(() => {
    dispatch(removeUser());
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <meta name="description" content="Profile page in anigen" />
        <title>{userEmail || "Profile"} – Anigen</title>
      </Helmet>

      <div className=" relative mt-5 mb-5">
        <ProfileTop
          userEmail={userEmail}
          onThemeToggle={toggleTheme}
          isAuth={isAuth}
          onLogout={handleLogout}
        />
        <div className="profile__wrapper">
          <Sidebar setSelectedCategory={setSelectedCategory} />{" "}
          {/* Передача функции для выбора категории */}
          <div className="profile__content">
            {isAuth ? (
              <>
                {/* <Search /> */}
                <div className="profile__cards">
                  {loading &&
                    [...Array(6)].map((_, index) => (
                      <Skeleton key={index} backgroundColor="#fff" />
                    ))}
                  {error && <div>Ошибка: {error}</div>}
                  {filteredItems.map((item) => (
                    <Card key={item.id} {...item} />
                  ))}
                </div>
              </>
            ) : (
              <div className="profile__content-info">Нужно войти в аккаунт</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default transition(Profile);
