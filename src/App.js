import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Catalog from "./pages/Catalog";
import Anime from "./pages/Anime";
import MobileMenu from "./components/MobileMenu";
import LoginPage from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { useDispatch } from "react-redux";
import { setUser } from "./store/slices/userSlice";
import AnimeRoulette from "./pages/AnimeRoulette";

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    // Проверяем, есть ли пользователь в localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      // Если данные есть, парсим их и сохраняем в Redux
      dispatch(setUser(JSON.parse(storedUser)));
    }
  }, [dispatch]);
  return (
    <div>
      <MobileMenu />
      <Header />
      <div className="content">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/random" element={<AnimeRoulette />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/anime/:id" element={<Anime />} />
            {/* <Route path="*" element={<NotFinded />} /> */}
          </Routes>
        </div>
      </div>
      <footer></footer>
    </div>
  );
}

export default App;
