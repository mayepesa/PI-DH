import React, { useState } from "react";
import styles from "../styles_modules/styles.register.module.css";
import { TextField, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formValues, setFormvalues] = useState({
    email: "",
    nombre: "",
    apellido: "",
    password: "",
  });

  const [emailErr, setEmailErr] = useState(false);
  const [nombreErr, setNombreErr] = useState(false);
  const [apellidoErr, setApellidoErr] = useState(false);
  const [passErr, setPassErr] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [registerErr, setRegisterErr] = useState(false);

  // Expresión regular para validar el correo electrónico
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const registrarUsuario = async (data) => {
    try {
      await axios.post("http://3.149.241.92:8080/register", data);
      setFormvalues({
        email: "",
        nombre: "",
        apellido: "",
        password: "",
      });
      setRegisterSuccess(true);
    } catch (err) {
      setRegisterErr(true);
      setRegisterSuccess(false);
    }
  };

  const handleRegister = () => {
    // Validación de todos los campos vacíos
    if (
      formValues.email === "" &&
      formValues.nombre === "" &&
      formValues.apellido === "" &&
      formValues.password === ""
    ) {
      setEmailErr(true);
      setNombreErr(true);
      setApellidoErr(true);
      setPassErr(true);
      return;
    }

    // Validación del correo electrónico
    if (!emailRegex.test(formValues.email)) {
      setEmailErr(true);
    }

    // Validación de la contraseña
    if (
      formValues.password.length < 8 ||
      !/(?=.*[a-záéíóúüñ])(?=.*[A-ZÁÉÍÓÚÜÑ])(?=.*\d)/.test(formValues.password)
    ) {
      setPassErr(true);
    }

    // Validación del nombre
    if (/[^a-zA-Z]/.test(formValues.nombre) || formValues.nombre.length < 3) {
      setNombreErr(true);
    }

    // Validación del apellido
    if (
      /[^a-zA-Z]/.test(formValues.apellido) ||
      formValues.apellido.length < 3
    ) {
      setApellidoErr(true);
    }

    const valoresUsuario = {
      firstName: formValues.nombre,
      lastName: formValues.apellido,
      login: formValues.email,
      password: formValues.password,
      admin: false,
    };
    registrarUsuario(valoresUsuario);
  };

  const handleOnChange = (e) => {
    const { value, name } = e.target;

    // Validación del nombre
    if (name === "nombre") {
      if (/[^a-zA-Z]/.test(value) || value.length < 3) {
        setNombreErr(true);
      } else {
        setNombreErr(false);
      }
    }

    // Validación del apellido
    if (name === "apellido") {
      if (/[^a-zA-Z]/.test(value) || value.length < 3) {
        setApellidoErr(true);
      } else {
        setApellidoErr(false);
      }
    }

    // Validación del correo electrónico
    if (name === "email") {
      if (!emailRegex.test(value)) {
        setEmailErr(true);
      } else {
        setEmailErr(false);
      }
    }

    // Validación de la contraseña
    if (name === "password") {
      if (
        value.length < 8 ||
        !/(?=.*[a-záéíóúüñ])(?=.*[A-ZÁÉÍÓÚÜÑ])(?=.*\d)/.test(value)
      ) {
        setPassErr(true);
      } else {
        setPassErr(false);
      }
    }

    setFormvalues({ ...formValues, [name]: value });
  };

  return (
    <div className={styles.container}>
      <div className={styles.form_container}>
        <h3>Registrarse</h3>
        <TextField
          required
          id="nombre"
          name="nombre"
          value={formValues.nombre}
          label="Nombre"
          placeholder="Ingresa su nombre"
          className={styles.input}
          onChange={(e) => handleOnChange(e)}
          error={nombreErr}
          helperText={
            nombreErr &&
            "El campo no puede estar vacio y debe tener mas de 2 caracteres"
          }
        />
        <TextField
          required
          id="apellido"
          name="apellido"
          value={formValues.apellido}
          label="Apellido"
          placeholder="Ingresa su Apellido"
          className={styles.input}
          onChange={(e) => handleOnChange(e)}
          error={apellidoErr}
          helperText={
            apellidoErr &&
            "El campo no puede estar vacio y debe tener mas de 2 caracteres"
          }
        />
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
          helperText={emailErr && "Ingresa un correo válido (email@email)"}
        />

        <TextField
          required
          id="password"
          type="password"
          name="password"
          value={formValues.password}
          label="Contraseña"
          placeholder="Ingresa tu contraseña"
          className={styles.input}
          onChange={(e) => handleOnChange(e)}
          error={passErr}
          helperText={passErr && "Contraseña inválida (Debe tener por lo menos 8 caracteres y contener una mayuscula, una minuscula y un número"}
        />
        {registerErr && (
          <p className={styles.errorText}>
            El registro ha fallado, inténtelo de nuevo más tarde.
          </p>
        )}

        <Button
          variant="contained"
          className={styles.btn}
          style={{ backgroundColor: "#867070" }}
          onClick={(e) => handleRegister(e)}
        >
          Registrarse
        </Button>
        {registerSuccess && (
          <p>
            Se ha registrado con éxito, ya puede
            <b onClick={() => navigate("/login")}> iniciar sesión</b>
          </p>
        )}
      </div>
    </div>
  );
};

export default Register;