import { INavHeader } from "@/interfaces";
import Nav from "./nav";
import headers from "./headerStyles/header.module.css";

const NormalNav: React.FC<INavHeader> = ({
  onReg,
  isOpenSignIn,
  onClickSign,
  onCloseSign,
  isOpenSignUp,
  onCloseSignUp,
  onClickSignUp,
}) => (
  <div className={headers.normalNav}>
    <Nav
      onReg={onReg}
      onClickSign={onClickSign}
      isOpenSignIn={isOpenSignIn}
      onCloseSign={onCloseSign}
      isOpenSignUp={isOpenSignUp}
      onClickSignUp={onClickSignUp}
      onCloseSignUp={onCloseSignUp}
    />
  </div>
);

export default NormalNav;
