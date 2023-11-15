import React, { useEffect, useState } from "react";
import styles from "../styles_modules/styles.registerProduct.module.css";
import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 300,
    },
  },
};

// const allCategories = [];
const allAttributes = ["atributo1", "atributo2", "atributo3", "atributo4"];
const allSizes = ["XS", "S", "M", "L", "XL"];
const allColors = [
  "Rojo",
  "Azul",
  "Verde",
  "Amarillo",
  "Blanco",
  "Negro",
  "Gris",
  "Rosado",
  "Morado",
  "Naranja",
  "Marrón",
  "Beige",
];

const RegisterProduct = () => {
  const [allCategories, setAllCategories] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [formValues, setFormValues] = useState({
    nombre: "",
    descripcion: "",
  });
  const [registerProductErr, setRegisterProductErr] = useState(false);
  const [registerProductSucc, setRegisterProductSucc] = useState(false);
  const [completeValuesErr, setCompleteValuesErr] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  useEffect(() => {
    obtenerCategorias();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterProductErr(false);
    setRegisterProductSucc(false);
    setFormValues({ ...formValues, [name]: value });
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    setRegisterProductErr(false);
    setRegisterProductSucc(false);
    setSelectedImages([...selectedImages, ...files]);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setRegisterProductErr(false);
    setRegisterProductSucc(false);
    setSelectedCategories(value);
  };

  const handleChangeAttributes = (e) => {
    const { value } = e.target;
    setRegisterProductErr(false);
    setRegisterProductSucc(false);
    setSelectedAttributes(typeof value === "string" ? value.split(",") : value);
  };

  const handleChangeSizes = (e) => {
    const { value } = e.target;
    setRegisterProductErr(false);
    setRegisterProductSucc(false);
    setSelectedSizes(typeof value === "string" ? value.split(",") : value);
  };

  const handleChangeColors = (e) => {
    const { value } = e.target;
    setRegisterProductErr(false);
    setRegisterProductSucc(false);
    setSelectedColors(typeof value === "string" ? value.split(",") : value);
  };

  const emptyInputs = () => {
    setFormValues({
      nombre: "",
      descripcion: "",
    });
    setSelectedImages([]);
    setSelectedCategories([]);
    setSelectedAttributes([]);
    setSelectedSizes([]);
    setSelectedColors([]);
  };

  const registrarProducto = async (data) => {
    try {
      await axios.post("http://3.149.241.92:8080/agregar", data);
      emptyInputs();
      setRegisterProductSucc(true);
      setErrMessage("");
    } catch (err) {
      if (err.response.data === "Ya existe un producto con el mismo nombre") {
        setErrMessage(err.response.data);
      }
      if (err.response.data === "query did not return a unique result: 3") {
        setErrMessage("Ya existe un producto con el mismo nombre");
      }
      setRegisterProductSucc(false);
      setRegisterProductErr(true);
      console.log(err);
    }
  };

  const obtenerCategorias = async () => {
    try {
      const res = await axios.post("http://3.149.241.92:8080/categorias");
      setAllCategories(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const isNotEmpty = (value) => {
    return (
      (typeof value === "string" && value.trim() !== "") ||
      (Array.isArray(value) && value.length > 0)
    );
  };

  const handleUpload = (e) => {
    e.preventDefault();
    const productInfo = {
      ...formValues,
      img: selectedImages,
      categorias: selectedCategories.map((cat) => cat.codigo),
      características: selectedAttributes,
      talles: selectedSizes,
      colores: selectedColors,
    };
    const allValuesNotEmpty = Object.values(productInfo).every(isNotEmpty);
    if (allValuesNotEmpty) {
      setCompleteValuesErr(false);
      registrarProducto(productInfo);
    } else {
      setRegisterProductSucc(false);
      setCompleteValuesErr(true);
    }
  };

  return (
    <div className={styles.add_container}>
      <h2 className={styles.title2}>Registrar producto</h2>
      <form className={styles.add_grid} onSubmit={(e) => handleUpload(e)}>
        <div className={styles.input_container}>
          <TextField
            name="nombre"
            label="Nombre del producto"
            value={formValues.nombre}
            type="text"
            placeholder="Ingrese nombre"
            sx={{ backgroundColor: "white", borderRadius: "5px" }}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className={styles.input_container}>
          <TextField
            name="descripcion"
            label="Descripción"
            multiline
            rows={4}
            value={formValues.descripcion}
            placeholder="Ingrese la descripción..."
            sx={{ backgroundColor: "white", borderRadius: "5px" }}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <FormControl sx={{ width: "100%", marginBottom: "1rem" }}>
          <InputLabel id="category">Categoría</InputLabel>
          <Select
            id="category"
            multiple
            value={selectedCategories}
            onChange={handleChange}
            input={<OutlinedInput label="Categoria" />}
            renderValue={(selected) =>
              selected
                .map((item) => item.nombre) // Mapea los nombres de los objetos
                .join(", ")
            }
            MenuProps={MenuProps}
            placeholder="Elija las categorías"
            sx={{ backgroundColor: "white" }}
          >
            {allCategories.map((categoria, index) => (
              <MenuItem key={index} value={categoria}>
                <Checkbox
                  checked={selectedCategories.some(
                    (cat) => cat.codigo === categoria.codigo
                  )}
                />
                <ListItemText primary={categoria.nombre} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ width: "100%", marginBottom: "1rem" }}>
          <InputLabel id="category">Atributos</InputLabel>
          <Select
            id="attributes"
            multiple
            value={selectedAttributes}
            onChange={handleChangeAttributes}
            input={<OutlinedInput label="Atributos" />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
            placeholder="Elija los atributos"
            sx={{ backgroundColor: "white" }}
          >
            {allAttributes.map((name, index) => (
              <MenuItem key={index} value={name}>
                <Checkbox checked={selectedAttributes.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ width: "100%", marginBottom: "1rem" }}>
          <InputLabel id="sizes">Talles</InputLabel>
          <Select
            id="sizes"
            multiple
            value={selectedSizes}
            onChange={handleChangeSizes}
            input={<OutlinedInput label="Talles" />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
            placeholder="Elija los talles"
            sx={{ backgroundColor: "white" }}
          >
            {allSizes.map((name, index) => (
              <MenuItem key={index} value={name}>
                <Checkbox checked={selectedSizes.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ width: "100%", marginBottom: "1rem" }}>
          <InputLabel id="colors">Colores</InputLabel>
          <Select
            id="colors"
            multiple
            value={selectedColors}
            onChange={handleChangeColors}
            input={<OutlinedInput label="Colores" />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
            placeholder="Elija los colores"
            sx={{ backgroundColor: "white" }}
          >
            {allColors.map((name, index) => (
              <MenuItem key={index} value={name}>
                <Checkbox checked={selectedColors.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <div className={styles.input_container}>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
          {selectedImages.map((item, index) => (
            <p key={index}>{item.name}</p>
          ))}
        </div>

        {completeValuesErr && (
          <p className={styles.errorText}>
            Verifica que todos los campos estén completos.
          </p>
        )}

        {registerProductErr && (
          <p className={styles.errorText}>
            No se pudo registrar el producto, inténtalo de nuevo más tarde.
          </p>
        )}

        {errMessage !== "" && <p className={styles.errorText}>{errMessage}</p>}

        <div className={styles.btn_container}>
          <input type="submit" value="Agregar" className={styles.btn} />
        </div>
        {registerProductSucc && <p>¡Se ha registrado el producto con éxito!</p>}
      </form>
    </div>
  );
};

export default RegisterProduct;
