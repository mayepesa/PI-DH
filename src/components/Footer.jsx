import styles from "../styles_modules/styles.footer.module.css";
import facebook from "../assets/facebook.svg";
import twitter from "../assets/twitter.svg";
import instagram from "../assets/instagram.svg";
import copyright from "../assets/copyright.svg";

const Footer = () => {
  return (
    <>
      <div className={styles.footer_content}>
        <div className={styles.content_logo}>
          <img className={styles.logo_footer} src="/img/1.png" alt="logo" />
        </div>
        {
          <div className={styles.redes_sociales}>
            <a href="##">
              <img className={styles.facebook_svg} src={facebook} alt="" />
            </a>
            <a href="##">
              <img className={styles.twitter_svg} src={twitter} alt="" />
            </a>
            <a href="##">
              <img className={styles.instagram_svg} src={instagram} alt="" />
            </a>
          </div>
        }
        <div className={styles.copyright}>
          <img className={styles.copyright_svg} src={copyright} alt="" />
          <p>2023 Todos los derechos reservados</p>
        </div>
      </div>
    </>
  );
};

export default Footer;
