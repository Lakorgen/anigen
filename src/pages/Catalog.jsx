import React, { useEffect } from "react";
import Skeleton from "../components/Skeleton";
import SidebarCatalog from "../components/SidebarCatalog";
import Card from "../components/Card";
import transition from "../transition";
import {
  setActiveCategory,
  incrementPage,
} from "../store/slices/catalogAnimeSlice";
import { fetchCatalogAnime } from "../store/actions/animeActions";
import { useDispatch, useSelector } from "react-redux";

const Catalog = () => {
  const dispatch = useDispatch();
  const { items, isLoading, error, activeCategory, page, loadingPage } =
    useSelector((state) => state.catalogAnime);

  useEffect(() => {
    if (items.length === 0) {
      const status = ["", "ongoing", "released", "anons"][activeCategory];
      dispatch(fetchCatalogAnime({ page: 1, status }));
    }
  }, [activeCategory, dispatch]);

  useEffect(() => {
    if (page > 1 && page !== loadingPage) {
      const status = ["", "ongoing", "released", "anons"][activeCategory];
      dispatch(fetchCatalogAnime({ page, status }));
    }
  }, [page, activeCategory, dispatch]);

  function debounce(func, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  }

  const handleScroll = debounce(() => {
    if (
      document.documentElement.scrollHeight -
        (document.documentElement.scrollTop + window.innerHeight) <
      300
    ) {
      dispatch(incrementPage());
    }
  }, 300);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading, dispatch]);

  const handleCategoryChange = (index) => {
    dispatch(setActiveCategory(index));
  };

  return (
    <div>
      <div className="profile">
        <div className="profile__wrapper">
          <SidebarCatalog
            categoryActive={activeCategory}
            setCategoryActive={handleCategoryChange}
          />
          <div className="profile__content">
            <div className="profile__cards">
              {items.map((item) => (
                <Card key={item.id} {...item} />
              ))}
              {isLoading &&
                [...Array(10)].map((_, index) => (
                  <Skeleton key={index} backgroundColor="#fff" />
                ))}
              {error && <div>Ошибка: {error}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default transition(Catalog);
