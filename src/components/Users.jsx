import styles from "../styles_modules/styles.users.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const baseURL = "http://3.149.241.92:8080/users";

const Users = () => {
  const [listUsers, setListUsers] = useState([]);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    axios.post(baseURL).then((response) => {
      setListUsers(response.data);
    });
  }, []);

  const handleChange = (event) => {
    console.log("se marco el check");
  };

  return (
    <div className={styles.content}>
      <h1 className={styles.title}>Usuarios</h1>
      <p className={styles.sub_title}>
        * Marcar para dar permisos de administrador al Usuario
      </p>
      <FormGroup>
        {listUsers.map((use) => {
          return (
            <div key={use.firstName}>
              <FormControlLabel
                className={styles.label}
                onChange={handleChange}
                control={<Checkbox />}
                label={[use.firstName + " " + use.lastName]}
              />
            </div>
          );
        })}
      </FormGroup>
    </div>
  );
};

export default Users;
