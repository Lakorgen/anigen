import React from "react";
import { Link } from "react-router-dom";
import SignUp from "../../components/SignUp";
import styles from "./RegisterPage.module.scss";

export const RegisterPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h2>Регистрация</h2>

        <SignUp />

        <div className={styles.registerPrompt}>
          Есть аккаунт?{" "}
          <Link to="/login" className={styles.registerLink}>
            Войти
          </Link>
        </div>
      </div>
    </div>
  );
};
