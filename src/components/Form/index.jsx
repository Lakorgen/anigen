import React from "react";
import styles from "./Form.module.scss";

const Form = ({ title, handleClick, handleGoogleLogin }) => {
  const [email, setEmail] = React.useState("");
  const [pass, setPass] = React.useState("");

  return (
    <>
      <div className={styles.inputContainer}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="username"
          className={styles.input}
          placeholder=" "
        />
        <label htmlFor="username" className={styles.label}>
          Логин
        </label>
      </div>

      <div className={styles.inputContainer}>
        <input
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          id="password"
          className={styles.input}
          placeholder=" "
        />
        <label htmlFor="password" className={styles.label}>
          Пароль
        </label>
      </div>
      <button
        onClick={() => handleClick(email, pass)}
        className={styles.button}
      >
        {title}
      </button>
      <button
        onClick={handleGoogleLogin}
        className={styles.button}
      >
        Вход через Google
      </button>
    </>
  );
};

export default Form;
