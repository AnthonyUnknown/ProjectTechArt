import { NavLink } from "react-router-dom";
import classes from "./nav.module.css";

const Nav: React.FC = () => (
  <nav className={classes.nav}>
    <ul className={classes.ul}>
      <li className={classes.li}>
        <NavLink className={classes.a} to="/">
          Home
        </NavLink>
      </li>
      <li className={classes.li}>
        <NavLink className={classes.prod} to="/">
          Products
        </NavLink>
        <ul className={classes.ul1}>
          <li className={classes.li1}>
            <NavLink className={classes.a1} to="/c">
              PC
            </NavLink>
          </li>
          <li className={classes.li1}>
            <NavLink className={classes.a2} to="/b">
              Playstation 5
            </NavLink>
          </li>
          <li className={classes.li1}>
            <NavLink className={classes.a3} to="/a">
              Xbox One
            </NavLink>
          </li>
        </ul>
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
