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
  const [loading, setLoading] = useState(false);
  const [loginErr, setLoginErr] = useState('');

  const handleLogin = async () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    let formValid = true;

    if (formValues.email === "" || !emailRegex.test(formValues.email)) {
      setEmailErr(true);
      formValid = false;
    } else {
      setEmailErr(false);
    }

    if (formValues.password === "") {
      setPassErr(true);
      formValid = false;
    } else {
      setPassErr(false);
    }

    if (!formValid) {
      setLoginErr('Por favor, completa todos los campos correctamente.');
      return;
    }

    try {
      setLoading(true);

      
      const res = await axios.post("http://3.149.241.92:8080/login", {
        login: formValues.email, 
        password: formValues.password,
      });

      const loggedUser = {
        firstName: res.data?.firstName,
        lastName: res.data?.lastName,
        isAdmin: res.data?.admin,
      };

      // Para el logueo son dos opciones, es lo mismo. Esta comentada que trae directo como esta con el mensaje en ingles(invalid password y unknown user)
      /*sessionStorage.setItem("user", JSON.stringify(loggedUser));
      navigate("/");
    } catch (error) {
      setLoginErr(
        error?.response?.data?.message ||
          "Ocurrió un error. Por favor, inténtalo de nuevo."
      );
    } finally {
      setLoading(false);
    }
  };*/

  //Con este codigo aparece lo mismo pero en español 
  sessionStorage.setItem("user", JSON.stringify(loggedUser));
      navigate("/");
    } catch (error) {
      if (error?.response?.status === 404) {
        setLoginErr("Usuario incorrecto, verifica tu correo electrónico.");
      } else if (error?.response?.status === 401) {
        setLoginErr("Contraseña incorrecta. Verifica la contraseña ingresada.");
      }else if (
        error?.response?.data?.message === "Invalid password"
      ) {
        setLoginErr("Contraseña incorrecta. Verifica la contraseña ingresada.");
      }else {
        setLoginErr(
          error?.response?.data?.message ||
            "Ocurrió un error. Por favor, inténtalo de nuevo."
        );
      }
    } finally {
      setLoading(false);
    }}

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setLoginErr(""); 

    if (name === "email") {
      setEmailErr(false);
    } else if (name === "password") {
      setPassErr(false);
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
          placeholder="Ingresa un correo válido"
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
        {loginErr !== "" && <p className={styles.errorText}>{loginErr}</p>}
        <Button
          variant="contained"
          className={styles.btn}
          style={{ backgroundColor: "#867070" }}
          onClick={(e) => handleLogin(e)}
          disabled={loading}
        >
          {loading ? 'Cargando...' : 'Iniciar sesión'}
        </Button>
      </form>
    </div>
  );
};

export default Login;