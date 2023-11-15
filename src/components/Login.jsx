import * as React from "react";
import styles from "../styles_modules/styles.login.module.css";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Lajinari
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Login() {
  const navigate = useNavigate();
  const [formValues, setFormvalues] = useState({
    email: "",
    password: "",
  });
  const [emailErr, setEmailErr] = useState(false);
  const [passErr, setPassErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginErr, setLoginErr] = useState("");

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
      setLoginErr("Por favor, completa todos los campos correctamente.");
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
      } else if (error?.response?.data?.message === "Invalid password") {
        setLoginErr("Contraseña incorrecta. Verifica la contraseña ingresada.");
      } else {
        setLoginErr(
          error?.response?.data?.message ||
            "Ocurrió un error. Por favor, inténtalo de nuevo."
        );
      }
    } finally {
      setLoading(false);
    }
  };

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
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src="/img/1.png"
              alt="logo"
              width={"128px"}
              height={"128px"}
              style={{
                backgroundColor: "white",
                borderRadius: "64px",
                marginBottom: "32px",
              }}
            />
            <Typography component="h1" variant="h5">
              Bienvenido a {" "}
              <span
                style={{
                  textDecoration: "underline",
                  fontWeight: "bold",
                  fontStyle: "italic",
                }}
              >
                 Lajinari
              </span>
            </Typography>
            <Box sx={{ mt: 1, width: "100%" }}>
              <TextField
                margin="normal"
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
              />
              <TextField
                margin="normal"
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
              />
              {loginErr !== "" && (
                <p className={styles.errorText}>{loginErr}</p>
              )}
              <Button
                onClick={handleLogin}
                fullWidth
                className={styles.btn}
                style={{ backgroundColor: "#867070" }}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Iniciar sesión
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    ¿Olvidaste tu contraseña?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"¿Todavia no tienes cuenta? Registrate!"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
