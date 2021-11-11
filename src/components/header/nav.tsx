import { NavLink } from "react-router-dom";
import { VscChevronDown } from "react-icons/vsc";
import classes from "./nav.module.css";

const Nav: React.FC = () => (
  <nav className={classes.nav}>
    <ul className={classes.ul}>
      <li className={classes.li}>
        <NavLink className={classes.a} to="/">
          Home
        </NavLink>
      </li>
      <li className={classes.liProd}>
        <NavLink className={classes.prod} to="/">
          Products
          <VscChevronDown />
        </NavLink>
      </li>
      <li className={classes.li}>
        <NavLink className={classes.a} to="/about">
          About
        </NavLink>
      </li>
      <li className={classes.li}>
        <NavLink className={classes.a} to="/signin">
          Sign In
        </NavLink>
      </li>
      <li className={classes.li}>
        <NavLink className={classes.a} to="/signup">
          Sign Up
        </NavLink>
      </li>
    </ul>
  </nav>
);
export default Nav;
