import { NavLink, useNavigate } from "react-router-dom";
import { VscChevronDown } from "react-icons/vsc";
import Modal from "@/elements/modal";
import { SyntheticEvent, useState } from "react";
import CrossButton from "@/elements/crossButton";
import InputSign from "@/elements/inputSign";
import Submit from "@/elements/submit";
import classes from "./headerStyles/nav.module.css";

interface Ilinks {
  home: string;
  about: string;
}

interface IUser {
  email: string;
  id: number;
}

interface INav {
  onReg: (name: string, password: string) => Promise<void>;
  user: IUser | null;
  onLog: (name: string, password: string) => Promise<void>;
}

const links: Ilinks = {
  home: "/",
  about: "/about",
};

const Nav: React.FC<INav> = ({ onReg, user, onLog }) => {
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
  const [regObj, setRegObj] = useState({ email: "", password: "" });
  const [repeatObj, setRepeatObj] = useState({ repeatpassword: "" });
  const [logObj, setLogObj] = useState({ email: "", password: "" });
  const [passErrorVal, setPassErrorVal] = useState("");

  const onChangeLogObj = (value: string, name: string) => {
    setLogObj({
      ...logObj,
      [name]: value,
    });
  };

  const onChangeRepeatPassObj = (value: string, name: string) => {
    setRepeatObj({
      ...repeatObj,
      [name]: value,
    });
  };

  const onChangeRegObj = (value: string, name: string) => {
    setRegObj({
      ...regObj,
      [name]: value,
    });
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(regObj.email).toLowerCase())) {
      setPassErrorVal("Incorrect email");
    } else {
      setPassErrorVal("");
    }
  };

  const history = useNavigate();

  async function onSubmitReg(e: SyntheticEvent) {
    e.preventDefault();
    await onReg(regObj.email, regObj.password);
    history("/userpage");
    onCloseSignUp();
  }

  async function onSubmitLog(e: SyntheticEvent) {
    e.preventDefault();
    await onLog(logObj.email, logObj.password);
    history("/homepage");
    onCloseSign();
  }

  function ToUserPage(): void {
    history("/userpage");
  }
  function ToHomePage(): void {
    history("/homepage");
  }

  let menu;

  if (user === null) {
    menu = (
      <>
        <li className={classes.li}>
          <div onClick={onClickSign} role="button" tabIndex={0} onKeyDown={onClickSign} className={classes.a}>
            SignIn
          </div>
        </li>
        <li className={classes.li}>
          <div onClick={onClickSignUp} role="button" tabIndex={0} onKeyDown={onClickSignUp} className={classes.a}>
            SignUp
          </div>
        </li>
      </>
    );
  } else {
    menu = (
      <>
        <li className={classes.li}>
          <div onClick={ToUserPage} onKeyDown={ToUserPage} role="button" tabIndex={0} className={classes.a}>
            UserName
          </div>
        </li>
        <li className={classes.li}>
          <div onClick={ToHomePage} onKeyDown={ToHomePage} role="button" tabIndex={0} className={classes.a}>
            LogOut
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
      <Modal signIn={isOpenSignIn}>
        <form onSubmit={onSubmitLog}>
          <div className={classes.signInWrapper}>
            <div className={classes.authAndBut}>
              <p>Authorization</p>
              <CrossButton onClick={onCloseSign} />
            </div>
            <div className={classes.input}>
              <InputSign labelName="Login" value={logObj.email} name="email" onChange={onChangeLogObj} />
            </div>
            <div className={classes.input}>
              <InputSign labelName="Password" value={logObj.password} name="password" onChange={onChangeLogObj} />
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
            <div className={classes.errorEmail}>{passErrorVal}</div>
            <div className={classes.input}>
              <InputSign labelName="Login" value={regObj.email} name="email" onChange={onChangeRegObj} />
            </div>
            <div className={classes.input}>
              <InputSign labelName="Password" value={regObj.password} name="password" onChange={onChangeRegObj} />
            </div>
            <div
              className={classes.errorPass}
              style={{
                opacity: repeatObj.repeatpassword === regObj.password ? "0" : "1",
              }}
            >
              Pass does not match
            </div>
            <div className={classes.input}>
              <InputSign
                labelName="Repeat password"
                value={repeatObj.repeatpassword}
                name="repeatpassword"
                onChange={onChangeRepeatPassObj}
              />
            </div>
            <Submit />
          </div>
        </form>
      </Modal>
    </nav>
  );
};
export default Nav;
