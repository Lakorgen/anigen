import React from "react";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import Form from "./Form";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/userSlice";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (email, password) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.accessToken,
          })
        );
        navigate("/");
      })
      .catch(console.error);
  };
  const handleGoogleLogin = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      dispatch(
        setUser({
          email: user.email,
          id: user.uid,
          token: user.accessToken,
        })
      );
      navigate("/profile");
    } catch (error) {
      console.error("Ошибка аутентификации через Google", error);
    }
  };
  return (
    <Form
      title={"Зарегистрироватся"}
      handleClick={handleLogin}
      handleGoogleLogin={handleGoogleLogin}
    />
  );
};

export default SignUp;
