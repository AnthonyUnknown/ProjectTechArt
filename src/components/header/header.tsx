import { INavHeader } from "@/interfaces";
import headers from "./headerStyles/header.module.css";
import NormalNav from "./normalNav";
import MobileNav from "./mobileNav";

const Header: React.FC<INavHeader> = ({
  onReg,
  isOpenSignIn,
  onClickSign,
  onCloseSign,
  isOpenSignUp,
  onCloseSignUp,
  onClickSignUp,
}) => (
  <header className={headers.header}>
    <div className={headers.pageName}>Games Shop</div>
    <div className={headers.navBar}>
      <MobileNav
        onReg={onReg}
        onClickSign={onClickSign}
        isOpenSignIn={isOpenSignIn}
        onCloseSign={onCloseSign}
        isOpenSignUp={isOpenSignUp}
        onClickSignUp={onClickSignUp}
        onCloseSignUp={onCloseSignUp}
      />
      <NormalNav
        onReg={onReg}
        onClickSign={onClickSign}
        isOpenSignIn={isOpenSignIn}
        onCloseSign={onCloseSign}
        isOpenSignUp={isOpenSignUp}
        onClickSignUp={onClickSignUp}
        onCloseSignUp={onCloseSignUp}
      />
    </div>
  </header>
);

export default Header;
