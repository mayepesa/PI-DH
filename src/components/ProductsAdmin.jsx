import styles from "../styles_modules/styles.productsAdmint.module.css";
import {
  Table,
  TableContainer,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Modal,
  Button,
  TextField,
  Box,
  Tooltip,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import axios from "axios";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const ProductsAdmin = () => {
  const [modalInsertar, setModalInsertar] = useState(false);
  const [products, setProducts] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState("");

  const getProducts = async () => {
    try {
      const res = await axios.post("http://3.149.241.92:8080/productos", {});
      setProducts(res.data);
    } catch (err) {}
  };

  useEffect(() => {
    getProducts();
  }, []);

  const abrirCerrarModal = () => {
    setModalInsertar(!modalInsertar);
  };

  const handleOpenDeleteModal = (productId) => {
    setSelectedProductId(productId);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setSelectedProductId(null);
    setOpenDeleteModal(false);
  };

  const handleDeleteProduct = async () => {
    if (selectedProductId) {
      try {
        const res = await axios.delete(
          `http://3.149.241.92:8080/eliminar/${selectedProductId}`
        );
        setDeleteSuccess(res.data);
        setSelectedProductId(null);
        getProducts();
      } catch (err) {
        selectedProductId(null);
        console.log("[DELETE_ERR", err.response.data);
      }
    }
  };

  const bodyInserta = (
    <div className={styles.modal}>
      <h3 className={styles.title_modal}>Insertar nuevo Producto</h3>
      <TextField className={styles.inputModal} label="Nombre del producto*" />
      <br />
      <br />
      <TextField
        className={styles.inputModal}
        label="Descripcion del producto*"
      />
      <br /> <br />
      <Button
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
      >
        Upload file
        <VisuallyHiddenInput type="file" />
      </Button>
      <div className={styles.btn_contasiner}>
        <button className={styles.btn_modal_aceptar}>Insertar</button>{" "}
        <button className={styles.btn_modal_cancelar}>Cancelar</button>{" "}
      </div>
    </div>
  );

  return (
    <div className={styles.body}>
      <h1 className={styles.title}>Productos</h1>
      {/* <div className={styles.container_btn_insertar}>
        <h3 className={styles.subTitle}>Insertar nuevo producto</h3>
        <button className={styles.btn_insertar} onClick={abrirCerrarModal}>
          Insertar
        </button>
      </div> */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Descripcion</TableCell>
              <TableCell>Imagen</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product, index) => (
              <TableRow key={index}>
                <TableCell>{product.codigo}</TableCell>
                <TableCell>{product.nombre}</TableCell>
                <TableCell>{product.descripcion}</TableCell>
                <TableCell>
                  <img className={styles.imagen} src={product.img} alt="" />
                </TableCell>
                <TableCell>
                  <Tooltip title="Editar" >
                      <EditIcon className={styles.btn_editar} />
                  </Tooltip>
                  &nbsp;&nbsp;&nbsp;
                  <Tooltip title="Eliminar" >
                      <DeleteForeverIcon
                        className={styles.btn_eliminar}
                        onClick={() => handleOpenDeleteModal(product.codigo)}
                      />
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={modalInsertar} onClose={abrirCerrarModal}>
        {bodyInserta}
      </Modal>

      <Modal open={openDeleteModal} onClose={handleCloseDeleteModal}>
        <Box className={styles.modal_content} sx={{ ...style, border: "none" }}>
          {deleteSuccess !== "" ? (
            <>
              <h3>{deleteSuccess}</h3>
              <Button onClick={handleCloseDeleteModal}>Ok</Button>
            </>
          ) : (
            <>
              <p>¿Estás seguro de que quieres eliminar este producto?</p>
              <Button onClick={handleCloseDeleteModal}>No</Button>
              <Button onClick={handleDeleteProduct}>Si</Button>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default ProductsAdmin;
