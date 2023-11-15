import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import Categorias from "../components/component_home/Categorias";
import ProductDetail from "../components/ProductDetail";
import Category from "../components/Category";
import App from "../App";
import Administrador from "../components/Administrador";
import RegisterProduct from "../components/RegisterProduct";
import Login from "../components/Login";
import Register from "../components/Register";
import ProductsAdmin from "../components/ProductsAdmin";
import AdminCharacteristics from "../components/AdminCharacteristics";
import Users from "../components/Users";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<App />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/categorias" element={<Categorias />}></Route>
          <Route path="/administrador" element={<Administrador />}></Route>
          <Route
            path="/administrador/registrar-producto"
            element={<Administrador children={<RegisterProduct />} />}
          ></Route>
           <Route
            path="/administrador/productos"
            element={<Administrador children={<ProductsAdmin />} />}
          ></Route>
          <Route
            path="/administrador/caracteristicas"
            element={<Administrador children={<AdminCharacteristics />} />}
          ></Route>
           <Route
            path="/administrador/users"
            element={<Administrador children={<Users />} />}
          ></Route>
          <Route path="/detalle/:id" element={<ProductDetail />}></Route>
          <Route path="/categoria/:category" element={<Category />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="*" element={<p>Error</p>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
