import React, { useEffect, useState } from "react";
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
    <div className="anime">
      <div className="anime__header">
        <img
          src={`https://shikimori.one${item.image.original}`}
          alt={item.name}
          className="anime__image"
        />
        <div className="anime__title">
          <h1>
            {item.name} ({item.russian})
          </h1>
          <p>Рейтинг: {item.score}</p>
          <p>Статус: {item.status}</p>
          <p>
            Эпизоды: {item.episodes} ({item.episodes_aired} вышло)
          </p>
        </div>
      </div>
      <div className="anime__status">
        <label htmlFor="statusSelect">Добавить в список:</label>
        <select
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
      </div>
      <div className="anime__description">
        <h2>Описание</h2>
        <div dangerouslySetInnerHTML={{ __html: item.description_html }} />
      </div>
      <div className="anime__genres">
        <h2>Жанры</h2>
        <ul>
          {item.genres.map((genre) => (
            <li key={genre.id}>
              {genre.russian} ({genre.name})
            </li>
          ))}
        </ul>
      </div>
      <br />
      <div className="aniime_player">
        <h2>Смотреть онлайн</h2>
        {!item.genres.some((genre) => genre.name === "Hentai") ? (
          <KinoboxPlayer title={item.name} />
        ) : (
          <h2 className="not-available">
            Просмотр не доступен! <br />
            Аниме содержит недопустимый контент.
          </h2>
        )}
      </div>
      <div className="anime__screenshots">
        <h2>Скриншоты</h2>
        <div className="anime__screenshots-grid">
          {item.screenshots.map((screenshot, index) => (
            <img
              key={index}
              src={`https://shikimori.one${screenshot.preview}`}
              alt={`Screenshot ${index + 1}`}
              className="anime__screenshot"
            />
          ))}
        </div>
      </div>
      <div className="anime__similar">
        <h2>Похожие</h2>
        <div className="anime__similar-cards">
          {similar.map((item) => (
            <Card key={item.id} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default transition(Anime);
