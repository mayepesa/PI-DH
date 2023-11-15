import React, { useState, useEffect } from "react";
import styles from "../styles_modules/styles.home.module.css";
import Buscador from "./component_home/Buscador";
import Categorias from "./component_home/Categorias";
import Recomendados from "./component_home/Recomendados";
import Productos from "./component_home/Productos";
import axios from "axios";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.post("http://3.149.241.92:8080/productos", {});
        console.log('products', res.data)
        setProducts(res.data);
      } catch (err) {}
    };
    getProducts();
  }, []);

  const categoryInfo = [
    {
      img: "/img/imgCategorias/ingresosHombres.png",
      category: "Hombre",
      products: "",
    },
    {
      img: "/img/imgCategorias/mujer.png",
      category: "Mujer",
      products: "",
    },
    {
      img: "/img/imgCategorias/calzado.png",
      category: "Calzado",
      products: "",
    },
    {
      img: "/img/imgCategorias/accesorios.png",
      category: "Accesorios",
      products: "",
    },
    {
      img: "/img/imgCategorias/sale.png",
      category: "Sale",
      products: "",
    },
  ];

  const recommendedInfo = [
    {
      id: "r1",
      img: "/img/imgMasVendido/mujer.png",
      name: "Blazer",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque sint itaque aliquid at sed non?",
    },
    {
      id: "r2",
      img: "/img/imgMasVendido/hombre.png",
      name: "Remera manga larga",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque sint itaque aliquid at sed non?",
    },
    {
      id: "r3",
      img: "/img/imgMasVendido/accesorio.png",
      name: "Lentes de sol",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque sint itaque aliquid at sed non?",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [shuffledProducts, setShuffledProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const itemsPerPage = 10;
  const totalProducts = 13;
  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  useEffect(() => {
    const shuffleProducts = (products) => {
      const shuffled = [...products];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };

    setShuffledProducts(shuffleProducts(products));
  }, [products]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setDisplayedProducts(shuffledProducts.slice(startIndex, endIndex));
  }, [currentPage, shuffledProducts]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className={styles.home}>
      <Buscador />
      <Categorias categoryInfo={categoryInfo} />
      <Recomendados recommended={recommendedInfo} />
      <Productos products={displayedProducts} />
      <div className={styles.pagination}>
        <p>
          Página {currentPage} de {totalPages}
        </p>
        <div>
          <button
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
          >
            Inicio
          </button>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
