import React, { useState } from "react";
import { TextField, Button, Icon, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

import styles from "../styles_modules/styles.administrador.characteristics.module.css";

const availableIcons = [
  "local_offer", "accessibility", "color_lens", "opacity", "check_circle",
  "texture", "style", "local_mall", "shopping_basket", "local_shipping", "eco"
];

const AdminCharacteristics = () => {
  const [characteristics, setCharacteristics] = useState([
    { icono: "local_offer", nombre: "Camiseta de algodón" },
    { icono: "accessibility", nombre: "Jeans ajustados" },
    { icono: "color_lens", nombre: "Abrigo de invierno" },
    { icono: "opacity", nombre: "Vestido elegante" },
    { icono: "check_circle", nombre: "Camisa de vestir" },
    { icono: "texture", nombre: "Shorts deportivos" },
    { icono: "style", nombre: "Gorra de béisbol" },
    { icono: "local_mall", nombre: "Calcetines de lana" },
    { icono: "shopping_basket", nombre: "Zapatos de tacón alto" },
    { icono: "local_shipping", nombre: "Bufanda de lana" },
    { icono: "eco", nombre: "Bufanda de lana" },
  ]);
  
  const [formValues, setFormValues] = useState({ icono: "", nombre: "" });
  const [editingIndex, setEditingIndex] = useState(-1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingIndex === -1) {
      setCharacteristics([...characteristics, formValues]);
    } else {
      const updatedCharacteristics = [...characteristics];
      updatedCharacteristics[editingIndex] = formValues;
      setCharacteristics(updatedCharacteristics);
      setEditingIndex(-1);
    }
    setFormValues({ icono: "", nombre: "" });
  };

  const handleEdit = (index) => {
    setFormValues(characteristics[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const updatedCharacteristics = characteristics.filter((_, i) => i !== index);
    setCharacteristics(updatedCharacteristics);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Administrar Características</h2>
      <div className={styles.formWrapper}>
        <TextField
          className={`${styles.textField} ${styles.nameField}`}
          name="nombre"
          label="Nombre"
          value={formValues.nombre}
          onChange={handleInputChange}
          variant="outlined"
        />
        <FormControl className={styles.iconSelect}>
          <InputLabel id="icon-select-label">Icono</InputLabel>
          <Select
            labelId="icon-select-label"
            id="icono"
            value={formValues.icono}
            label="Icono"
            onChange={handleInputChange}
            name="icono"
            className={styles.select}
          >
            {availableIcons.map((iconName) => (
              <MenuItem key={iconName} value={iconName}>
                <Icon>{iconName}</Icon>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          className={styles.addButton}
          type="submit"
          variant="contained"
          onClick={handleSubmit}
        >
          {editingIndex >= 0 ? "Actualizar" : "Añadir"}
        </Button>
      </div>
      <div className={styles.cardsContainer}>
        {characteristics.map((characteristic, index) => (
          <div key={index} className={styles.card}>
            <Icon className={styles.icon}>{characteristic.icono}</Icon>
            <span className={styles.description}>{characteristic.nombre}</span>
            <Button className={styles.editButton} onClick={() => handleEdit(index)}>Editar</Button>
            <Button className={styles.deleteButton} onClick={() => handleDelete(index)}>Eliminar</Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCharacteristics;