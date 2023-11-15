import React from "react";
import { Icon } from "@mui/material";
import styles from '../styles_modules/styles.productCharacteristics.module.css'

const ProductCharacteristics = ({characteristics}) => {
  const caracteristicas = [
    { icono: "local_offer", descripcion: "Camiseta de algodón" },
    { icono: "check_circle", descripcion: "Camisa de vestir" },
  ];

  return (
    <div>
      <h2>Características</h2>
      <div className={styles.characteristics}>
        {caracteristicas?.map((item, index) => (
          <div key={index} className={styles.charac_container}>
            <Icon >{item.icono}</Icon>
            <p>{item.descripcion}</p>
          </div>
        ))}
        {characteristics?.map((item, index) => (
          <div key={index} className={styles.charac_container}>
            <Icon >{item.icono}</Icon>
            <p>{item.descripcion}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCharacteristics;
