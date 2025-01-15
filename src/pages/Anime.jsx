import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import KinoboxPlayer from "../components/KinoboxPlayer";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useSelector } from "react-redux";
import Card from "../components/Card";
import transition from "../transition";
import { animeAPI } from "../api/api";

const Anime = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [similar, setSimilar] = React.useState([]);
  const [status, setStatus] = useState("");
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [animeRes, similarRes] = await Promise.all([
          animeAPI.getAnimeById(id),
          animeAPI.getSimilarAnime(id),
        ]);

        const animeData = await animeRes.data;
        const similarData = await similarRes.data;

        setItem(animeData);
        setSimilar(similarData);

        // Firestore проверка
        if (user.id) {
          const animeRef = doc(db, "users", user.id, "anime", id);
          const animeDoc = await getDoc(animeRef);
          if (animeDoc.exists()) {
            setStatus(animeDoc.data().status);
          }
        }
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      }
    };

    fetchData();
  }, [id, user.id]);

  const handleStatusChange = async (newStatus) => {
    if (!user.id) {
      console.error("Пользователь не авторизован");
      return;
    }

    const animeRef = doc(db, "users", user.id, "anime", id);
    try {
      const animeDoc = await getDoc(animeRef);
      if (animeDoc.exists()) {
        await setDoc(animeRef, { status: newStatus }, { merge: true });
      } else {
        await setDoc(animeRef, {
          id,
          status: newStatus,
          russian: item.russian || item.name,
          image: item.image.original,
          kind: item.kind,
          score: item.score,
        });
      }
      setStatus(newStatus);
    } catch (error) {
      console.error("Ошибка при обновлении статуса аниме:", error);
    }
  };

  if (!item) {
    return <div>Загрузка...</div>;
  }

  return (
    <>
      <Helmet>
        <meta name="description" content="Login page in anigen" />
        <title>{item.russian} – Anigen</title>
      </Helmet>
      <div className="max-w-[800px] mx-auto p-5 bg-white dark:bg-zinc-900 border border-solid border-zinc-300 dark:border-zinc-800 rounded-2xl text-zinc-800 dark:text-zinc-100 shadow-sm">
        <div className="flex items-center flex-col sm:flex-row mb-5">
          <img
            src={`https://shikimori.one${item.image.original}`}
            alt={item.name}
            className="max-w-40 rounded mr-0 sm:mr-5"
          />
          <div className="text-zinc-400 dark:text-zinc-500">
            <h1 className="text-2xl m-0 font-bold text-fuchsia-500 dark:text-fuchsia-600 opacity-100">
              {item.name} ({item.russian})
            </h1>
            <p>Рейтинг: {item.score}</p>
            <p>Статус: {item.status}</p>
            <p>
              Эпизоды: {item.episodes} ({item.episodes_aired} вышло)
            </p>
          </div>
        </div>

        <label htmlFor="statusSelect">Добавить в список:</label>
        <select
          className="border border-solid border-fuchsia-500 dark:border-fuchsia-600 bg-fuchsia-500 dark:bg-fuchsia-600 text-white font-bold text-center p-2.5 rounded-lg ml-2"
          id="statusSelect"
          value={status}
          onChange={(e) => handleStatusChange(e.target.value)}
        >
          <option value="">Выберите статус</option>
          <option value="Просмотренно">Просмотренно</option>
          <option value="В планах">В планах</option>
          <option value="Смотрю">Смотрю</option>
          <option value="Брошено">Брошено</option>
        </select>

        <div className="mt-5">
          <h2 className="font-bold mb-5 text-fuchsia-500 dark:text-fuchsia-600">
            Описание
          </h2>
          <div
            className="description"
            dangerouslySetInnerHTML={{ __html: item.description_html }}
          />
        </div>
        <div className="mt-5">
          <h2 className="font-bold mb-5 text-fuchsia-500 dark:text-fuchsia-600">
            Жанры
          </h2>
          <ul className="list-none p-0 flex flex-wrap gap-x-4 gap-y-1">
            {item.genres.map((genre) => (
              <li
                key={genre.id}
                className="text-center font-bold p-3 my-1.5 rounded bg-fuchsia-500 dark:bg-fuchsia-600 text-white -tracking-wide"
              >
                {genre.russian} ({genre.name})
              </li>
            ))}
          </ul>
        </div>
        <br />

        <h2 className="font-bold mb-5 text-fuchsia-500 dark:text-fuchsia-600">
          Смотреть онлайн
        </h2>
        {!item.genres.some((genre) => genre.name === "Hentai") ? (
          <KinoboxPlayer title={item.name} />
        ) : (
          <h2 className="text-3xl text-center text-red-500 font-bold py-20 px-10">
            Просмотр не доступен! <br />
            Аниме содержит недопустимый контент.
          </h2>
        )}

        <div className="mt-5">
          <h2 className="font-bold mb-5 text-fuchsia-500 dark:text-fuchsia-600">
            Скриншоты
          </h2>
          <div className="grid [grid-template-columns:repeat(auto-fill,minmax(150px,1fr))] gap-x-10 gap-y-5">
            {item.screenshots.map((screenshot, index) => (
              <img
                key={index}
                src={`https://shikimori.one${screenshot.preview}`}
                alt={`Screenshot ${index + 1}`}
                className="w-full rounded object-cover"
              />
            ))}
          </div>
        </div>
        <div className="mt-5">
          <h2 className="font-bold mb-5 text-fuchsia-500 dark:text-fuchsia-600">
            Похожие
          </h2>
          <div className="flex gap-4 px-4 py-5 rounded-xl my-5 bg-white dark:bg-zinc-900 h-full max-h-80 overflow-scroll shadow-sm">
            {similar.map((item) => (
              <Card key={item.id} {...item} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default transition(Anime);
