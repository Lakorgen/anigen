import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Anime = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    fetch(`https://shikimori.one/api/animes/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((json) => {
        setItem(json);
      })
      .catch((error) => {
        console.error("Ошибка при получении данных:", error);
      });
  }, [id]);

  if (!item) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="anime">
      <div className="anime__header">
        <img src={`https://shikimori.one${item.image.original}`} alt={item.name} className="anime__image" />
        <div className="anime__title">
          <h1>{item.name} ({item.russian})</h1>
          <p>Рейтинг: {item.score}</p>
          <p>Статус: {item.status}</p>
          <p>Эпизоды: {item.episodes} ({item.episodes_aired} вышло)</p>
        </div>
      </div>
      <div className="anime__description">
        <h2>Описание</h2>
        <p>{item.description}</p>
      </div>
      <div className="anime__genres">
        <h2>Жанры</h2>
        <ul>
          {item.genres.map((genre) => (
            <li key={genre.id}>{genre.russian} ({genre.name})</li>
          ))}
        </ul>
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