import styles from "../../styles_modules/styles.recomendados.module.css";
import DetailCard from "./DetailCard";
import { Link } from "react-router-dom";

const Recomendados = ({ recommended }) => {
  return (
    <div className={styles.recomendados_content}>
      <h2 className={styles.title}>Lo más vendido</h2>
      <div className={styles.grid_container}>
        <div className={styles.card_grid}>
          {recommended.map((item, index) => (
            <Link
              key={index}
              to={`/detalle/${item.id}`}
              className={styles.link}
            >
              <DetailCard
                img={item.img}
                title={item.name}
                subtitle={item.description}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recomendados;
