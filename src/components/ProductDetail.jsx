import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../styles_modules/styles.productDetail.module.css";
import ProductCharacteristics from "./ProductCharacteristics";
import axios from "axios";

const ProductDetail = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [showMoreImgs, setShowMoreImgs] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`http://3.149.241.92:8080/producto/${params.id}`)
        .then(function (res) {
          setProduct(res.data);
          console.log(res.data);
        })
        .catch(function (error) {
          console.log("[PRODUCTDETAIL_ERROR]:", error?.response?.data);
        });
    };
    fetchData();
  }, []);

  const renderMoreImg = (img, name) => (
    <img src={img} alt={name} className={styles.img} />
  );

  const handleShowMore = () => setShowMoreImgs(true);
  const handleShowLess = () => setShowMoreImgs(false);

  return (
    <div className={styles.container}>
      <div className={styles.nav_header}>
        <img
          className={styles.back_arrow}
          src="/images/back-arrow.png"
          alt="back-arrow"
          onClick={() => navigate(-1)}
        />
      </div>

      <div className={styles.grid_container}>
        <div className={`${styles.grid} ${showMoreImgs && styles.grid_more}`}>
          <div className={styles.big_img}>
            <img
              src={"/img/accesorios/1.png"}
              alt={product.nombre}
              className={styles.img}
            />
          </div>
          <div className={styles.quarter_img1}>
            <img
              src={"/img/accesorios/1.png"}
              alt={product.nombre}
              className={styles.img}
            />
          </div>
          <div className={styles.quarter_img2}>
            <img
              src={"/img/accesorios/1.png"}
              alt={product.nombre}
              className={styles.img}
            />
          </div>
          <div className={styles.quarter_img3}>
            <img
              src={"/img/accesorios/1.png"}
              alt={product.nombre}
              className={styles.img}
            />
          </div>
          <div className={styles.quarter_img4}>
            <img
              src={"/img/accesorios/1.png"}
              alt={product.nombre}
              className={styles.img}
            />
          </div>

          {showMoreImgs && (
            <>
              <div className={styles.more_img1}>
                {renderMoreImg("/img/accesorios/1.png", product.nombre)}
              </div>
              <div className={styles.more_img2}>
                {renderMoreImg("/img/accesorios/1.png", product.nombre)}
              </div>
              <div className={styles.more_img3}>
                {renderMoreImg("/img/accesorios/1.png", product.nombre)}
              </div>
              <div className={styles.more_img4}>
                {renderMoreImg("/img/accesorios/1.png", product.nombre)}
              </div>
            </>
          )}
        </div>
      </div>

      <div className={styles.gallery_bottom}>
        {showMoreImgs ? (
          <p className={styles.more_text} onClick={handleShowLess}>
            Ver menos...
          </p>
        ) : (
          <p className={styles.more_text} onClick={handleShowMore}>
            Ver más...
          </p>
        )}
      </div>

      <div className={styles.info_container}>
        <h2>{product.nombre}</h2>
        <p>{product.descripcion}</p>
      </div>

      <div className={styles.caracteristics}>
        <ProductCharacteristics characteristics={product.caracteristicas} />
      </div>

      <div className={styles.info_container}>
        <h2>Categorías</h2>
        {product?.categorias?.map((item, index) => (
          <p key={index}>{item.nombre}</p>
        ))}
      </div>

      <div className={styles.info_container}>
        <h2>Colores</h2>
        {product?.colores?.map((item, index) => (
          <p key={index}>{item.nombre}</p>
        ))}
      </div>

      <div className={styles.info_container}>
        <h2>Talles</h2>
        {product?.talles?.map((item, index) => (
          <p key={index}>{item.nombre}</p>
        ))}
      </div>
    </div>
  );
};

export default ProductDetail;
