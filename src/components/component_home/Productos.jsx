import React from "react";
import DetailCard from "./DetailCard";
import styles from "../../styles_modules/styles.productos.module.css";
import { Link } from "react-router-dom";

const Productos = ({ products }) => {
  return (
    <div className={styles.recomendados_content}>
      <h2 className={styles.title}>Productos</h2>
      <div className={styles.grid_container}>
        <div className={styles.card_grid}>
          {products.map((item, index) => (
            <Link
              key={index}
              to={`/detalle/${item.codigo}`}
              className={styles.link}
            >
              <DetailCard
                key={index}
                id={item.codigo}
                img={item.imagenes[0]}
                title={item.nombre}
                subtitle={item.descripcion}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Productos;
