import React from "react";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="root">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
