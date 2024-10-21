import React from "react";
import PopularCard from "../components/PopularCard";
import SkeletonPopular from "../components/PopularCard/SkeletonPopular";
import "../scss/app.scss";

const Home = () => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetch(
      "https://shikimori.one/api/animes?order=ranked&status=ongoing&season=2024&limit=10"
    )
      .then((res) => res.json())
      .then((json) => {
        setItems(json);
        setIsLoading(false); // Данные загружены, выключаем состояние загрузки
      });
  }, []);

  return (
    <>
      <div className="popular__cards">
        {isLoading ? (
          // Отображаем скелетоны, пока данные загружаются
          [...Array(10)].map((_, index) => <SkeletonPopular key={index} />)
        ) : (
          // Отображаем данные, когда они загружены
          items.map((item) => <PopularCard key={item.id} {...item} />)
        )}
      </div>
      <p>
        тут что-то когда-то будет, а пока перейдите в <b>каталог</b> или{" "}
        <b>профиль</b>
      </p>
    </>
  );
};

export default Home;