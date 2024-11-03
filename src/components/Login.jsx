import React from "react";
import { useNavigate } from "react-router-dom";

import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import Form from "./Form";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = (email, password) => {
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        const userData = {
          email: user.email,
          id: user.uid,
          token: user.accessToken,
        };
        // Сохраняем данные пользователя в Redux
        dispatch(setUser(userData));
        // Сохраняем данные пользователя в localStorage
        localStorage.setItem("user", JSON.stringify(userData));
        navigate("/profile");
      })
      .catch((e) => console.log(e));
  };

  const handleGoogleLogin = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userData = {
        email: user.email,
        id: user.uid,
        token: user.accessToken,
      };
      // Сохраняем данные пользователя в Redux
      dispatch(setUser(userData));
      // Сохраняем данные пользователя в localStorage
      localStorage.setItem("user", JSON.stringify(userData));
      navigate("/profile");

    } catch (error) {
      console.error("Ошибка аутентификации через Google", error);
    }
  };
  return <Form title={"Войти"} handleClick={handleLogin} handleGoogleLogin={handleGoogleLogin}/>;
};

export default Login;
