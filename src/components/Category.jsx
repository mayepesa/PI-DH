import React, { useEffect, useState } from "react";
import styles from "../styles_modules/styles.category.module.css";
import { useParams } from "react-router-dom";

const Category = () => {
  const [products, setProducts] = useState([]);
  const params = useParams();

  useEffect(() => {
    setProducts([]);
    console.log("prods");
  }, [params.category]);

  return (
    <div
      className={styles.container}
      style={{
        height: products?.length !== 0 ? "" : "100%",
      }}
    >
      {params?.category}
    </div>
  );
};

export default Category;
