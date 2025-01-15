import React from "react";
import { Helmet } from "react-helmet";
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
      <Helmet>
        <meta name="description" content="Home page in anigen" />
        <title>Home – Anigen</title>
      </Helmet>
      <TrailerBanner />
      <div className="flex gap-4 px-4 py-5 rounded-xl my-5 bg-white dark:bg-zinc-900 border border-solid border-zinc-300 dark:border-zinc-800 h-full max-h-80 overflow-scroll shadow-sm">
        {isLoading
          ? [...Array(10)].map((_, index) => (
              <Skeleton key={index} backgroundColor="#f3f3f3" />
            ))
          : items.map((item) => <Card key={item.id} {...item} />)}
      </div>
      <p className="text-zinc-800 dark:text-zinc-100">
        тут что-то когда-то будет, а пока перейдите в <b>каталог</b> или{" "}
        <b>профиль</b>
      </p>
    </>
  );
};

export default transition(Home);
