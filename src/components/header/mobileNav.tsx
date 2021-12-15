import { INavHeader } from "@/interfaces";
import { FiMenu } from "react-icons/fi";
import { useState } from "react";
import Nav from "./nav";
import headers from "./headerStyles/header.module.css";

const MobileNav: React.FC<INavHeader> = ({
  onReg,
  isOpenSignIn,
  onClickSign,
  onCloseSign,
  isOpenSignUp,
  onCloseSignUp,
  onClickSignUp,
}) => {
  const [openHM, setOpenHM] = useState<boolean>(false);

  function openHamburgerMenu() {
    setOpenHM(!openHM);
  }

  return (
    <div className={headers.mobileNav}>
      {openHM ? (
        <Nav
          onReg={onReg}
          onClickSign={onClickSign}
          isOpenSignIn={isOpenSignIn}
          onCloseSign={onCloseSign}
          isOpenSignUp={isOpenSignUp}
          onClickSignUp={onClickSignUp}
          onCloseSignUp={onCloseSignUp}
        />
      ) : null}

      <FiMenu size="40px" color="black" className={headers.hamburgerMenu} onClick={openHamburgerMenu} />
    </div>
  );
};

export default MobileNav;
