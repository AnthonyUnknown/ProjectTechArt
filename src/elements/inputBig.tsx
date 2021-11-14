import { ChangeEvent } from "react";
import classes from "./elementStyles/inputBig.module.css";

interface InputPropsTypes {
  placeholder: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const InputBig: React.FC<InputPropsTypes> = ({ placeholder, onChange }) => (
  <>
    <input className={classes.placeholder} type="text" placeholder={placeholder} onChange={onChange} />
  </>
);

export default InputBig;
