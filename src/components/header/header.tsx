import { INavHeader } from "@/interfaces";
import Nav from "./nav";
import headers from "./headerStyles/header.module.css";

const Header: React.FC<INavHeader> = ({
  onReg,
  user,
  onLog,
  isOpenSignIn,
  onClickSign,
  onCloseSign,
  isOpenSignUp,
  onCloseSignUp,
  onClickSignUp,
}) => (
  <header className={headers.header}>
    <div className={headers.pageName}>Games Shop</div>
    <Nav
      onReg={onReg}
      onLog={onLog}
      user={user}
      onClickSign={onClickSign}
      isOpenSignIn={isOpenSignIn}
      onCloseSign={onCloseSign}
      isOpenSignUp={isOpenSignUp}
      onClickSignUp={onClickSignUp}
      onCloseSignUp={onCloseSignUp}
    />
  </header>
);

export default Header;
