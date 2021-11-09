import Nav from "./nav";
import headers from "./header.module.css";

const Header: React.FC = () => (
  <header className={headers.header}>
    <div className={headers.pageName}>Games Shop</div>
    <Nav />
  </header>
);

export default Header;
