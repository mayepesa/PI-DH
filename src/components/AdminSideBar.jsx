import React from "react";
import { List, ListItem, ListItemText } from "@mui/material";
import styles from "../styles_modules/styles.adminSideBar.module.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className={styles.container}>
      <List>
      <ListItem>
          <Link to={`/administrador`} className={styles.link}>
            <ListItemText primary="Inicio" />
          </Link>
        </ListItem>
        <ListItem>
          <Link to={`/administrador/productos`} className={styles.link}>
            <ListItemText primary="Listar productos" />
          </Link>
        </ListItem>
        <ListItem>
          <Link to={`/administrador/registrar-producto`} className={styles.link}>
            <ListItemText primary="Registrar producto" />
          </Link>
        </ListItem>
        <ListItem>
          <Link to={`/administrador/caracteristicas`} className={styles.link}>
            <ListItemText primary="Administrar Características" />
          </Link>
        </ListItem>
        <ListItem>
          <Link to={`/administrador/users`} className={styles.link}>
            <ListItemText primary="Users" />
          </Link>
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;
