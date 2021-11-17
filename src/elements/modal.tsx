import ReactDom from "react-dom";
import classes from "./elementStyles/modal.module.css";

interface ISign {
  signIn: boolean;
}

const Modal: React.FC<ISign> = ({ children, signIn }) => {
  if (!signIn) return null;
  return ReactDom.createPortal(
    <>
      <div className={classes.overlayStyle} />
      <div className={classes.modal}>{children}</div>
    </>,
    document.getElementById("portal") as HTMLDivElement
  );
};

export default Modal;
