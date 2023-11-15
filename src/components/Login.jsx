import React, { useState } from "react";
import styles from "../styles_modules/styles.login.module.css";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [formValues, setFormvalues] = useState({
    email: "",
    password: "",
  });
  const [emailErr, setEmailErr] = useState(false);
  const [passErr, setPassErr] = useState(false);
  const [loginErr, setLoginErr] = useState('');

  const handleLogin = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (formValues.email === "" && !emailRegex.test(formValues.email)) {
      setEmailErr(true);
      return;
    }
    if (formValues.password === "") {
      setPassErr(true);
      return;
    }

    if (
      formValues.email !== "" &&
      formValues.password !== "" &&
      emailRegex.test(formValues.email)
    ) {
      const userData = {
        login: formValues.email,
        password: formValues.password,
      };
      const fetchData = () => {
        axios
          .post("http://3.149.241.92:8080/login", userData)
          .then(function (res) {
            const loggedUser = {
              firstName: res.data?.firstName,
              lastName: res.data?.lastName,
              isAdmin: res.data?.admin,
            };
            sessionStorage.setItem("user", JSON.stringify(loggedUser));
            navigate("/");
          })
          .catch(function (error) {
            setLoginErr(error?.response?.data?.message);
            console.log("[LOGIN_ERROR]:", error?.response?.data);
          });
      };
      fetchData();
    }
  };

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    if (name === "email") {
      setEmailErr(false);
      setLoginErr('');
    } else {
      setPassErr(false);
      setLoginErr('');
    }
    setFormvalues({ ...formValues, [name]: value });
  };

  return (
    <div className={styles.container}>
      <form className={styles.form_container}>
        <h3>Iniciar Sesión</h3>
        <TextField
          required
          id="email"
          name="email"
          value={formValues.email}
          label="Correo"
          placeholder="Ingresa un emal válido"
          className={styles.input}
          onChange={(e) => handleOnChange(e)}
          error={emailErr}
          helperText={emailErr && "Ingresa un correo válido"}
          autoComplete="current-email"
        />
        <TextField
          required
          id="password"
          name="password"
          value={formValues.password}
          label="Contraseña"
          placeholder="Ingresa tu contraseña"
          className={styles.input}
          onChange={(e) => handleOnChange(e)}
          error={passErr}
          helperText={passErr && "Ingresa una contraseña"}
          type="password"
          autoComplete="current-password"
        />
        {loginErr !== "" && <p className={styles.errorText}>El usuario que has introducido no está conectado a una cuenta.</p>}
        <Button
          variant="contained"
          className={styles.btn}
          style={{ backgroundColor: "#867070" }}
          onClick={(e) => handleLogin(e)}
        >
          Iniciar sesión
        </Button>
      </form>
    </div>
  );
};

export default Login;
