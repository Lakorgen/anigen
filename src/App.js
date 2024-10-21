import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Catalog from "./pages/Catalog";
import Anime from "./pages/Anime";
import MobileMenu from "./components/MobileMenu";

function App() {
  return (
    <div>
      <MobileMenu />
      <Header />
      <div className="content">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
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
