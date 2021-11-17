import { Navigate, NavLink } from "react-router-dom";
import { VscChevronDown } from "react-icons/vsc";
import Modal from "@/elements/modal";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import CrossButton from "@/elements/crossButton";
import InputSign from "@/elements/inputSign";
import Submit from "@/elements/submit";
import axios from "axios";
import classes from "./headerStyles/nav.module.css";

interface Ilinks {
  home: string;
  about: string;
}

const links: Ilinks = {
  home: "/",
  about: "/about",
};

const Nav: React.FC = () => {
  const [isOpenSignIn, setIsOpenSignIn] = useState<boolean>(false);
  const [isOpenSignUp, setIsOpenSignUp] = useState<boolean>(false);

  function onClickSignUp(): void {
    setIsOpenSignUp(true);
  }

  function onClickSign(): void {
    setIsOpenSignIn(true);
  }

  function onCloseSign(): void {
    setIsOpenSignIn(false);
  }

  function onCloseSignUp(): void {
    setIsOpenSignUp(false);
  }

  const [regLog, setRegLog] = useState<string>("");
  const [regPass, setRegPass] = useState<string>("");
  const [regRepeatPass, setRegRepeatPass] = useState<string>("");

  const [Log, setLog] = useState<string>("");
  const [Pass, setPass] = useState<string>("");

  const [redirect, setRedirect] = useState<boolean>(false);

  function onChangeRegLog(event: ChangeEvent<HTMLInputElement>) {
    setRegLog(event.target.value);
  }

  function onChangeRegPass(event: ChangeEvent<HTMLInputElement>) {
    setRegPass(event.target.value);
  }

  function onChangeRegRepeatPass(event: ChangeEvent<HTMLInputElement>) {
    setRegRepeatPass(event.target.value);
  }

  function onChangeLog(event: ChangeEvent<HTMLInputElement>) {
    setLog(event.target.value);
  }

  function onChangePass(event: ChangeEvent<HTMLInputElement>) {
    setPass(event.target.value);
  }

  async function onSubmitReg(e: SyntheticEvent) {
    e.preventDefault();
    await axios.post("http://localhost:3000/users", {
      regLog,
      regPass,
    });
    setRedirect(true);
  }
  if (redirect) {
    return <Navigate to="/userpage" />;
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
        <li className={classes.li}>
          <div onClick={onClickSign} role="button" tabIndex={0} onKeyDown={onClickSign} className={classes.a}>
            Sign In
          </div>
        </li>
        <li className={classes.li}>
          <div onClick={onClickSignUp} role="button" tabIndex={0} onKeyDown={onClickSignUp} className={classes.a}>
            Sign Up
          </div>
        </li>
      </ul>
      <Modal signIn={isOpenSignIn}>
        <form>
          <div className={classes.signInWrapper}>
            <div className={classes.authAndBut}>
              <p>Authorization</p>
              <CrossButton onClick={onCloseSign} />
            </div>
            <div className={classes.input}>
              <InputSign labelName="Login" value={Log} onChange={onChangeLog} />
            </div>
            <div className={classes.input}>
              <InputSign labelName="Password" value={Pass} onChange={onChangePass} />
            </div>
            <Submit />
          </div>
        </form>
      </Modal>
      <Modal signIn={isOpenSignUp}>
        <form onSubmit={onSubmitReg}>
          <div className={classes.signInWrapperReg}>
            <div className={classes.authAndBut}>
              <p>Registation</p>
              <CrossButton onClick={onCloseSignUp} />
            </div>
            <div className={classes.input}>
              <InputSign labelName="Login" value={regLog} onChange={onChangeRegLog} />
            </div>
            <div className={classes.input}>
              <InputSign labelName="Password" value={regPass} onChange={onChangeRegPass} />
            </div>
            <div
              style={{
                opacity: regRepeatPass === regPass ? "0" : "1",
                display: "flex",
                justifyContent: "center",
                position: "absolute",
                top: "185px",
                left: "25px",
                color: "red",
              }}
            >
              Pass does not match
            </div>
            <div className={classes.input}>
              <InputSign labelName="Repeat password" value={regRepeatPass} onChange={onChangeRegRepeatPass} />
            </div>
            <Submit />
          </div>
        </form>
      </Modal>
    </nav>
  );
};
export default Nav;
