import styles from "../../styles_modules/styles.categorias.module.css";
import { Link } from "react-router-dom";

const Categorias = ({ categoryInfo }) => {
  return (
    <div className={styles.categorias_content}>
      <div className={styles.grid_container}>
        <div className={styles.card_container}>
          {categoryInfo.map((item, index) => (
            <Link
              key={index}
              to={`/categoria/${item.category}`}
              className={styles.link}
            >
              {item.category}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categorias;
