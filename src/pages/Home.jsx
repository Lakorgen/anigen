import React from "react";
import Card from "../components/Card";
import TrailerBanner from "../components/TrailerBanner";
import "../scss/app.scss";
import SkeletonProfile from "../components/Skeleton";
import transition from "../transition";

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

  const bannerData = {
    title: "Атака титанов",
    description: "Эпическая битва людей против титанов.",
  };

  return (
    <>
      <TrailerBanner {...bannerData} />
      <div className="popular__cards">
        {isLoading
          ? // Отображаем скелетоны, пока данные загружаются
            [...Array(10)].map((_, index) => (
              <SkeletonProfile key={index} backgroundColor="#f3f3f3" />
            ))
          : // Отображаем данные, когда они загружены
            items.map((item) => <Card key={item.id} {...item} />)}
      </div>
      <p className="home__info">
        тут что-то когда-то будет, а пока перейдите в <b>каталог</b> или{" "}
        <b>профиль</b>
      </p>
    </>
  );
};

export default transition(Home);
