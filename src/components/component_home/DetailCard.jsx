import React from "react";
import styles from "../../styles_modules/styles.detailcard.module.css";

const DetailCard = ({ img, title, subtitle }) => {
  return (
      <div className={styles.container}>
        <img className={styles.img} src={img} alt={title} />
        <div className={styles.info_container}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
      </div>
  );
};

export default DetailCard;
