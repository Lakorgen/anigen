import React from "react";
import Card from "../components/Card";
import TrailerBanner from "../components/TrailerBanner";
import "../scss/app.scss";
import Skeleton from "../components/Skeleton";
import transition from "../transition";
import { animeAPI } from "../api/api";

const Home = () => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    animeAPI.getPopularAnime().then((data) => {
      setItems(data.data);
      setIsLoading(false);
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
              <Skeleton key={index} backgroundColor="#f3f3f3" />
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
