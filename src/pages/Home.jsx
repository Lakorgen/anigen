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
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis aut
        itaque dignissimos nulla sint? Veniam cum dolores beatae temporibus
        commodi sint hic magni exercitationem modi obcaecati, et non numquam
        possimus impedit aliquam fugit quaerat unde aspernatur eligendi
        cupiditate quae ipsa ea! Natus culpa officia saepe earum ullam,
        repudiandae blanditiis commodi quisquam sint, amet libero id quasi iusto
        autem nihil alias eaque tempora, ea dolor doloremque nisi! Omnis quasi
        aspernatur autem sequi labore, consequatur accusantium perspiciatis modi
        quam tempore aliquid unde quia aliquam deleniti hic et culpa vero illo
        provident eveniet? Similique, soluta commodi quibusdam consectetur
        provident fugit deserunt aliquam tenetur!
      </p>
    </>
  );
};

export default Home;
