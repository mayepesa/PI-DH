import React from "react";
import styles from "../../styles_modules/styles.simplecard.module.css";

const SimpleCard = ({ img, title, subtitle }) => {
  return (
    <div className={styles.card_container}>
      <img className={styles.card_img} src={img} alt={title} />
      <div className={styles.info_container}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
    </div>
  );
};

export default SimpleCard;
