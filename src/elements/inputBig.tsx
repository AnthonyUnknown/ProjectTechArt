import { ChangeEvent } from "react";
import classes from "./elementStyles/inputBig.module.css";

interface InputPropsTypes {
  placeholder: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const InputBig: React.FC<InputPropsTypes> = (props) => (
  <input className={classes.placeholder} {...props} onChange={(e) => props.onChange(e)} />
);

export default InputBig;
