import styles from "../styles_modules/styles.header.module.css";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Menu, MenuItem } from "@mui/material";
import { useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const stringUserData = sessionStorage.getItem("user");
  const userData = JSON.parse(stringUserData);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    sessionStorage.removeItem("user");
    navigate("/");
  };

  const handleAdmin = () => {
    setAnchorEl(null);
    navigate("/administrador");
  };

  const getInitials = (firstName, lastName) => {
    if (firstName && lastName) {
      const firstInitial = firstName.charAt(0).toUpperCase();
      const lastInitial = lastName.charAt(0).toUpperCase();
      return `${firstInitial}${lastInitial}`;
    } else if (firstName) {
      return firstName.charAt(0).toUpperCase();
    } else if (lastName) {
      return lastName.charAt(0).toUpperCase();
    } else {
      return "";
    }
  };

  return (
    <div className={styles.header}>
      <div className={styles.flex_content_main}>
        <div className={styles.img_cont}>
          <Link to="/">
            {" "}
            <img className={styles.logo_header} src="/img/1.png" alt="logo" />
          </Link>
          <p className={styles.lema}>Your ideal look</p>
        </div>
        {userData ? (
          <div className={styles.avatar_container}>
            <h3 className={styles.user_name} variant="h6">
              {userData?.firstName + userData?.lastName}
            </h3>
            <Avatar
              sx={{ backgroundColor: "#867070" }}
              alt="User Avatar"
              onClick={handleMenuOpen}
            >
              {getInitials(userData.firstName, userData.lastName)}
            </Avatar>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              className={styles.menu}
              disableScrollLock={true}
            >
              {userData.isAdmin && <MenuItem onClick={handleAdmin}>Admin</MenuItem>}
              <MenuItem onClick={handleLogout}>Cerrar Sesión</MenuItem>
            </Menu>
          </div>
        ) : (
          <div className={styles.buttons_cont}>
            <div className={styles.button_cont_register}>
              <button className={styles.button_register} onClick={()=>navigate('/Register')}>Crear Cuenta</button>
            </div>
            <div className={styles.button_cont_login}>
              <button
                className={styles.button_login}
                onClick={() => navigate("/login")}
              >
                Iniciar Sesión
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
