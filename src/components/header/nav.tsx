import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { VscChevronDown } from "react-icons/vsc";
import { BsBasket3Fill } from "react-icons/bs";
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import SignIn from "@/elements/signIn";
import SignUp from "@/elements/signUp";
import { Ilinks, INavHeader } from "@/interfaces";
import { useDispatch } from "react-redux";
import funcUserLog from "@/redux/actionFunctions";
import useTypedSelector from "@/redux/hookSelector/useTypedSelector";
import classes from "./headerStyles/nav.module.css";

const links: Ilinks = {
  home: "/",
  about: "/about",
  pc: "/games/:pc",
  xbox: "/games/:xbox",
  playstation: "/games/:playstation",
};

const Nav: React.FC<INavHeader> = ({
  onReg,
  isOpenSignIn,
  onClickSign,
  onCloseSign,
  isOpenSignUp,
  onCloseSignUp,
  onClickSignUp,
}) => {
  const [repeatPassObj, setRepeatPassObj] = useState("");
  const [regObjEmail, setRegObjEmail] = useState("");
  const [regObjPass, setRegObjPass] = useState("");
  const [logObjEmail, setLogObjEmail] = useState("");
  const [logObjPass, setLogObjPass] = useState("");
  const [regObjEmailDirty, setRegObjEmailDirty] = useState(false);
  const [regObjPassDirty, setRegObjPassDirty] = useState(false);
  const [logError, setLogError] = useState("Email can not be empty");
  const [passError, setPassError] = useState("Password can not be empty");
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (logError || passError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [logError, passError]);

  function onBlurChanger(event: React.FocusEvent<HTMLInputElement>) {
    switch (event.target.name) {
      case "email":
        setRegObjEmailDirty(true);
        break;
      case "password":
        setRegObjPassDirty(true);
        break;
      default:
    }
  }

  function onClickSigned() {
    onClickSign();
  }

  function onCloseSigned() {
    onCloseSign();
  }

  function onCloseSignedUp() {
    onCloseSignUp();
  }

  function onClickSignedUp() {
    onClickSignUp();
  }

  function onChangeRegLog(event: ChangeEvent<HTMLInputElement>) {
    setRegObjEmail(event.target.value);
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(event.target.value).toLowerCase())) {
      setLogError("Incorrect email");
    } else {
      setLogError("");
    }
  }

  function onChangeRegPass(event: ChangeEvent<HTMLInputElement>) {
    setRegObjPass(event.target.value);
    if (event.target.value.length < 7 || event.target.value.length > 14) {
      setPassError("Min pass: 7, max: 14");
      if (!event.target.value) {
        setPassError("Password can not be empty");
      }
    } else {
      setPassError("");
    }
  }

  function onChangeLogLog(event: ChangeEvent<HTMLInputElement>) {
    setLogObjEmail(event.target.value);
  }

  function onChangeLogPass(event: ChangeEvent<HTMLInputElement>) {
    setLogObjPass(event.target.value);
  }

  function onChangeRepeatPassObj(event: ChangeEvent<HTMLInputElement>) {
    setRepeatPassObj(event.target.value);
  }

  const history = useNavigate();
  const { state } = useLocation();

  async function onSubmitReg(e: SyntheticEvent) {
    e.preventDefault();
    await onReg(regObjEmail, regObjPass);
    history("/");
    onCloseSignUp();
  }

  const dispatcher = useDispatch();
  function onSubmitLog(e: SyntheticEvent) {
    e.preventDefault();
    let historyPath = "/";
    dispatcher(funcUserLog(logObjEmail, logObjPass));
    if (state && state.from) {
      historyPath = state.from;
      onCloseSign();
    }
    history(historyPath);
    setLogObjEmail("");
    setLogObjPass("");
    onCloseSign();
  }

  let menu;

  function toUserPage(): void {
    history("/userpage");
  }
  function toHomePage(): void {
    history("/");
    localStorage.removeItem("user");
    localStorage.removeItem("admin");
    dispatcher({ type: "GET_USER", payload: null });
    dispatcher({ type: "USER_STORAGE", payload: null });
  }

  function toCartPage(): void {
    history("/cartpage");
  }

  useEffect(() => {
    const localStorageSetUser = localStorage.getItem("user");
    if (localStorageSetUser) {
      const parseUser = JSON.parse(localStorageSetUser);
      dispatcher({ type: "GET_USER", payload: parseUser });
    }
  }, []);
  const localStorageUser = useTypedSelector((stateUser) => stateUser.user.user);
  const games = useTypedSelector((stateCart) => stateCart.game.cartGames);
  const localStorageAdmin = localStorage.getItem("admin");

  if (localStorageUser) {
    menu = (
      <>
        <li className={classes.li}>
          <div onClick={toUserPage} onKeyDown={toUserPage} role="button" tabIndex={0} className={classes.a}>
            {localStorageUser.userName}
          </div>
        </li>
        <li className={classes.li}>
          <div onClick={toHomePage} onKeyDown={toHomePage} role="button" tabIndex={0} className={classes.a}>
            LogOut
          </div>
        </li>
        {localStorageAdmin ? null : (
          <li className={classes.li}>
            <div onClick={toCartPage} onKeyDown={toCartPage} role="button" tabIndex={0} className={classes.a}>
              <BsBasket3Fill />
              {games.length}
            </div>
          </li>
        )}
      </>
    );
  } else {
    menu = (
      <>
        <li className={classes.li}>
          <div onClick={onClickSigned} role="button" tabIndex={0} onKeyDown={onClickSigned} className={classes.a}>
            SignIn
          </div>
        </li>
        <li className={classes.li}>
          <div onClick={onClickSignedUp} role="button" tabIndex={0} onKeyDown={onClickSignedUp} className={classes.a}>
            SignUp
          </div>
        </li>
      </>
    );
  }

  return (
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
        {menu}
      </ul>
      <SignIn
        logObjEmail={logObjEmail}
        logObjPass={logObjPass}
        isOpenSignIn={isOpenSignIn}
        onChangeLogLog={onChangeLogLog}
        onChangeLogPass={onChangeLogPass}
        onSubmitLog={onSubmitLog}
        onCloseSigned={onCloseSigned}
      />
      <SignUp
        isOpenSignUp={isOpenSignUp}
        onSubmitReg={onSubmitReg}
        onCloseSignedUp={onCloseSignedUp}
        repeatPassObj={repeatPassObj}
        onChangeRepeatPassObj={onChangeRepeatPassObj}
        onChangeRegLog={onChangeRegLog}
        onChangeRegPass={onChangeRegPass}
        regObjEmail={regObjEmail}
        regObjPass={regObjPass}
        regObjEmailDirty={regObjEmailDirty}
        regObjPassDirty={regObjPassDirty}
        logError={logError}
        passError={passError}
        onBlurChanger={onBlurChanger}
        formValid={formValid}
      />
    </nav>
  );
};
export default Nav;
