import classes from "./productsStyles/footer.module.css";

const Footer: React.FC = () => (
  <footer className={classes.footer}>
    <div className={classes.convenient}>
      <p>Incredible convenient</p>
    </div>
    <div className={classes.block}>
      <a href="https://www.valvesoftware.com/ru/">
        <img
          className={classes.iconFirst}
          src="https://hsto.org/getpro/moikrug/uploads/company/100/005/043/6/logo/medium_5e6128046c932e26e4e91196fbe6621b.png"
          alt="Downoloading"
        />
      </a>
      <a href="https://www.riotgames.com/ru">
        <img
          className={classes.iconSecond}
          src="data:image/png;base64,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"
          alt="Downoloading"
        />
      </a>
      <a href="https://www.blizzard.com/ru-ru/">
        <img
          className={classes.iconThird}
          src="https://seeklogo.com/images/B/Blizzard_Entertainment-logo-6A5908AC72-seeklogo.com.png"
          alt="Downoloading"
        />
      </a>
    </div>
  </footer>
);

export default Footer;
