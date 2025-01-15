import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import transition from "../transition";
import { UiButton } from "../components/uikit/UiButton";

const AnimeRoulette = () => {
  const [animeList, setAnimeList] = useState([]); // Список аниме
  const [activeItem, setActiveItem] = useState(null); // Выбранное аниме
  const userId = useSelector((state) => state.user.id); // ID пользователя
  const intervalRef = useRef(null); // Ссылка на интервал

  // Функция получения данных из Firestore
  useEffect(() => {
    const fetchAnime = async () => {
      if (!userId) {
        console.warn("User ID is not defined"); // Логируем предупреждение
        return; // Если userId не определен, выходим из функции
      }

      try {
        const animeRef = collection(db, "users", userId, "anime");
        const q = query(animeRef, where("status", "==", "В планах"));
        const querySnapshot = await getDocs(q);
        const animeData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setAnimeList(animeData);
        if (animeData.length > 0) {
          setActiveItem(animeData[0]); // Установить первое аниме по умолчанию
        } else {
          setActiveItem(null); // Устанавливаем активный элемент в null, если нет аниме
        }
      } catch (error) {
        console.error("Error fetching anime data: ", error); // Логируем ошибку, если есть
      }
    };

    fetchAnime();
  }, [userId]);

  // Функция для начала изменения аниме
  const startSpin = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current); // Очистить предыдущий интервал, если он существует
    }

    const totalTime = 3000; // Общее время в миллисекундах
    const intervalTime = 400; // Время изменения в миллисекундах

    intervalRef.current = setInterval(() => {
      if (animeList.length > 0) {
        const randomIndex = Math.floor(Math.random() * animeList.length); // Генерация случайного индекса
        setActiveItem(animeList[randomIndex]); // Устанавливаем случайное аниме
      }
    }, intervalTime);

    // Очистка интервала по завершении
    setTimeout(() => {
      clearInterval(intervalRef.current);
      intervalRef.current = null; // Обнулить ссылку
    }, totalTime);
  };

  // Очистка интервала при размонтировании компонента
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <>
      <Helmet>
        <meta name="description" content="Catalog page in anigen" />
        <title>Random anime – Anigen</title>
      </Helmet>
      <div className="flex flex-col items-center justify-center p-5 bg-white dark:bg-zinc-900 border border-solid border-zinc-300 dark:border-zinc-800 w-72 mx-auto rounded-lg shadow-sm ">
        <h2 className="font-bold mb-3 text-lg text-zinc-800 dark:text-zinc-100">
          Рулетка Аниме
        </h2>
        {activeItem && (
          <Link to={`/anime/${activeItem.id}`}>
            <div className="relative pt-[140%] max-w-full w-48 rounded-md overflow-hidden">
              <img
                src={`https://shikimori.one${activeItem.image}`}
                alt={activeItem.russian}
                className="absolute top-0 left-0 w-full h-full block object-cover object-center opacity-100 transition-opacity"
              />
            </div>
          </Link>
        )}
        <UiButton onClick={startSpin} className="mt-4">
          Крутить
        </UiButton>
      </div>
    </>
  );
};

export default transition(AnimeRoulette);
