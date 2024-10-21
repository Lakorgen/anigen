import React from "react";

import PopularCard from "../components/PopularCard";
import "../scss/app.scss";

const Home = () => {
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    fetch(
      "https://shikimori.one/api/animes?order=ranked&status=ongoing&season=2024&limit=10"
    ).then((res) => res.json().then((json) => setItems(json)));
  }, []);
  return (
    <>
      <div className="popular__cards">
        {items.map((item) => {
          return item && <PopularCard key={item.id} {...item} />;
        })}
      </div>
      <p>тут что-то когда-то будет, а пока перейдите в каталог или профиль</p>
    </>
  );
};

export default Home;
