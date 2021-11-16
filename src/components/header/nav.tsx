import { NavLink } from "react-router-dom";
import { VscChevronDown } from "react-icons/vsc";
import classes from "./headerStyles/nav.module.css";

interface Ilinks {
  home: string;
  about: string;
  signin: string;
  signup: string;
}

const links: Ilinks = {
  home: "/",
  about: "/about",
  signin: "/signin",
  signup: "/signup",
};

const Nav: React.FC = () => (
  <nav className={classes.nav}>
    <ul className={classes.ul}>
      <li className={classes.li}>
        <NavLink className={classes.a} to={links.home}>
          Home
        </NavLink>
      </li>
      <li className={classes.liProd}>
        <NavLink className={classes.prod} to={links.home}>
          Products
          <VscChevronDown />
        </NavLink>
        <ul className={classes.ul1}>
          <li className={classes.li1}>
            <NavLink className={classes.a1} to="/games/:pc">
              PC
            </NavLink>
          </li>
          <li className={classes.li1}>
            <NavLink className={classes.a2} to="/games/:playstation">
              Playstation 5
            </NavLink>
          </li>
          <li className={classes.li1}>
            <NavLink className={classes.a3} to="/games/:xbox">
              Xbox One
            </NavLink>
          </li>
        </ul>
      </li>
      <li className={classes.li}>
        <NavLink className={classes.a} to={links.about}>
          About
        </NavLink>
      </li>
      <li className={classes.li}>
        <NavLink className={classes.a} to={links.signin}>
          Sign In
        </NavLink>
      </li>
      <li className={classes.li}>
        <NavLink className={classes.a} to={links.signup}>
          Sign Up
        </NavLink>
      </li>
    </ul>
  </nav>
);
export default Nav;
