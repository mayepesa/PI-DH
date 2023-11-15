import styles from "../../styles_modules/styles.buscador.module.css";

const Buscador = () => {
  return (
    <>
      <div className={styles.buscador_content}>
        <div className={styles.search_container}>
          <input
            className={styles.search_input}
            placeholder="Ingresa un producto..."
            type="text"
          />
          <button className={styles.search_btn}>
            Buscar
          </button>
        </div>
      </div>
    </>
  );
};

export default Buscador;
