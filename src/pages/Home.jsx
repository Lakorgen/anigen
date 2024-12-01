import React from "react";
import Card from "../components/Card";
import TrailerBanner from "../components/TrailerBanner";
import "../scss/app.scss";
import Skeleton from "../components/Skeleton";
import transition from "../transition";
import { useDispatch, useSelector } from "react-redux";
import { fetchPopularAnime } from "../store/actions/animeActions";

const Home = () => {
  const dispatch = useDispatch();
  const { items, isLoading } = useSelector((state) => state.popularAnime);

  React.useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchPopularAnime());
    }
  }, [dispatch, items]);

  return (
    <>
      <TrailerBanner />
      <div className="popular__cards">
        {isLoading
          ? [...Array(10)].map((_, index) => (
              <Skeleton key={index} backgroundColor="#f3f3f3" />
            ))
          : items.map((item) => <Card key={item.id} {...item} />)}
      </div>
      <p className="home__info">
        тут что-то когда-то будет, а пока перейдите в <b>каталог</b> или{" "}
        <b>профиль</b>
      </p>
    </>
  );
};

export default transition(Home);
