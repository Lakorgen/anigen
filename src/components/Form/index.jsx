import React from "react";
import styles from "./Form.module.scss";
import { useFormik } from "formik";
import * as Yup from "yup";

const CustomForm = ({ title, handleClick, handleGoogleLogin }) => {
  // const [email, setEmail] = React.useState("");
  // const [pass, setPass] = React.useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Неправильный email адрес")
        .required("Поле не может быть пустым"),
      password: Yup.string()
        .min(8, "Пароль должен содержать 8 символов")
        .required("Поле не может быть пустым"),
    }),
    onSubmit: (values) => handleClick(values.email, values.password),
    // onSubmit: () => handleClick(email, pass),
  });

  return (
    <>
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <div className={styles.inputContainer}>
          <input
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            id="email"
            name="email"
            className={styles.input}
            placeholder=" "
            onBlur={formik.handleBlur}
          />
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
        </div>
        {formik.errors.email && formik.touched.email && (
          <div className={styles.error}>{formik.errors.email}</div>
        )}

        <div className={styles.inputContainer}>
          <input
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            id="password"
            name="password"
            className={styles.input}
            placeholder=" "
            onBlur={formik.handleBlur}
          />
          <label htmlFor="password" className={styles.label}>
            Пароль
          </label>
        </div>
        {formik.errors.password && formik.touched.password && (
          <div className={styles.error}>{formik.errors.password}</div>
        )}
        <button
          type="submit"
          disabled={!formik.isValid || !formik.dirty}
          className={styles.button}
        >
          {title}
        </button>
        <button
          type="button"
          onClick={handleGoogleLogin}
          className={styles.button}
        >
          Вход через Google
        </button>
      </form>
    </>
  );
};

export default CustomForm;
