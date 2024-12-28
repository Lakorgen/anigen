import React from "react";
import { Helmet } from "react-helmet";
import styles from "./LoginPage.module.scss";
import { Link } from "react-router-dom";

import Login from "../../components/Login";

const LoginPage = () => {
  return (
    <>
      <Helmet>
        <meta name="description" content="Login page in anigen" />
        <title>Login – Anigen</title>
      </Helmet>
      <div className={styles.container}>
        <div className={styles.loginBox}>
          <h2>Вход в аккаунт</h2>

          <Login />

          <div className={styles.registerPrompt}>
            Нет аккаунта?{" "}
            <Link to="/register" className={styles.registerLink}>
              Создайте
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
