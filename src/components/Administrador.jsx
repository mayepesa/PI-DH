import styles from "../styles_modules/styles.administrador.module.css";
import AdminSideBar from "./AdminSideBar";

const Administrador = ({children}) => {
  const products = [
    {
      id: "p1",
      img: "/img/imgMasVendido/mujer.png",
      name: "Blazer",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque sint itaque aliquid at sed non?",
    },
    {
      id: "p2",
      img: "/img/imgMasVendido/hombre.png",
      name: "Remera manga larga",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque sint itaque aliquid at sed non?",
    },
    {
      id: "p3",
      img: "/img/imgMasVendido/accesorio.png",
      name: "Lentes de sol",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque sint itaque aliquid at sed non?",
    },
    {
      id: "p4",
      img: "/img/imgMasVendido/mujer.png",
      name: "Blazer",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque sint itaque aliquid at sed non?",
    },
    {
      id: "p5",
      img: "/img/imgMasVendido/hombre.png",
      name: "Remera manga larga",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque sint itaque aliquid at sed non?",
    },
    {
      id: "p6",
      img: "/img/imgMasVendido/accesorio.png",
      name: "Lentes de sol",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque sint itaque aliquid at sed non?",
    },
    {
      id: "p7",
      img: "/img/imgMasVendido/mujer.png",
      name: "Blazer",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque sint itaque aliquid at sed non?",
    },
    {
      id: "p8",
      img: "/img/imgMasVendido/hombre.png",
      name: "Remera manga larga",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque sint itaque aliquid at sed non?",
    },
    {
      id: "p9",
      img: "/img/imgMasVendido/accesorio.png",
      name: "Lentes de sol",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque sint itaque aliquid at sed non?",
    },
    {
      id: "p10",
      img: "/img/imgMasVendido/mujer.png",
      name: "Blazer",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque sint itaque aliquid at sed non?",
    },
  ];

  return (
    <div className={styles.admin_container}>
      <AdminSideBar />
      {children ? (
        <>
        { children }
        </>
      ) : (
        <div className={styles.main_content}>
          <div className={styles.alert}>
            <h1>El panel no esta disponible para dispositivos Mobile</h1>
          </div>

          <h1 className={styles.title}>Panel Administrador</h1>
          <form action="" className={styles.search_container}>
            <input
              type="search"
              name=""
              className={styles.search_input}
              placeholder="Buscar por id..."
            />
            <button className={styles.btn}>Buscar</button>
          </form>

          <div className={styles.products_container}>
            {products.map((item) => (
              <div className={styles.card_admin}>
                <img className={styles.img_item} src={item.img} alt="" />
                <div>
                  <p>
                    <b>{item.name}</b>
                  </p>
                  <p>{item.description}</p>
                  <p>Id {item.id}</p>
                </div>
                <input
                  className={styles.checkbox}
                  type="checkbox"
                  id={item.id}
                  value="first_checkbox"
                />
              </div>
            ))}
            <div className={styles.container_button_delete}>
              <button className={styles.btn}>Delete</button>
            </div>
          </div>
          <div className={styles.container_form_add_update}>
            <div className={styles.update_container}>
              <h2 className={styles.title2}>Update Product</h2>
              <form className={styles.update_container}>
                <div className={styles.input_container}>
                  <label htmlFor="name">Nombre del producto</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Ingrese nombre"
                    className={styles.form_input}
                  />
                </div>
                <div className={styles.input_container}>
                  <label htmlFor="description">Descripción</label>
                  <textarea
                    id="description"
                    type="text"
                    placeholder="Ingrese descripción"
                    className={styles.textarea}
                  />
                </div>
                <input type="file" name="imagen" className={styles.form_file} />
                <div className={styles.btn_container}>
                  <input type="submit" value="Update" className={styles.btn} />
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Administrador;
