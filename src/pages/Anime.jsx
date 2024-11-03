import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import KinoboxPlayer from "../components/KinoboxPlayer";
import { doc, getDoc, setDoc } from "firebase/firestore"; // Firestore methods
import { db } from "../firebase"; // импорт Firestore из firebase.js
import { useSelector } from "react-redux"; // для получения текущего пользователя

const Anime = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [status, setStatus] = useState("");
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const fetchAnimeData = async () => {
      try {
        const response = await fetch(`https://shikimori.one/api/animes/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const json = await response.json();
        setItem(json);
        
        // Проверяем, есть ли аниме в Firestore
        if (user.id) {
          const animeRef = doc(db, "users", user.id, "anime", id); // путь к документу аниме для пользователя
          const animeDoc = await getDoc(animeRef);
          if (animeDoc.exists()) {
            const animeData = animeDoc.data();
            setStatus(animeData.status); // Устанавливаем статус из Firestore
          }
        }
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    };

    fetchAnimeData();
  }, [id, user.id]); // Добавляем user.id в зависимости

  const handleStatusChange = async (newStatus) => {
    if (!user.id) {
      console.error("Пользователь не авторизован");
      return;
    }

    const animeRef = doc(db, "users", user.id, "anime", id); // путь к документу аниме для пользователя
    try {
      const animeDoc = await getDoc(animeRef);
      if (animeDoc.exists()) {
        // Если аниме уже есть в Firestore, обновляем статус
        await setDoc(animeRef, { status: newStatus }, { merge: true });
      } else {
        // Если аниме еще нет, добавляем новый документ с данными
        await setDoc(animeRef, {
          id,
          status: newStatus,
          russian: item.russian || item.name,
          image: item.image.original,
          kind: item.kind,
          score: item.score,
        });
      }
      setStatus(newStatus); // Обновляем локальное состояние статуса
      console.log("Статус аниме обновлен");
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
        <p>{item.description}</p>
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
        <KinoboxPlayer title={item.name} />
      </div>
      <div className="anime__videos">
        <h2>Тизеры</h2>
        {item.videos.map((video) => (
          <div key={video.id} className="anime__video">
            <h3>{video.name}</h3>
            <iframe
              width="560"
              height="315"
              src={video.player_url}
              title={video.name}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ))}
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
    </div>
  );
};

export default Anime;