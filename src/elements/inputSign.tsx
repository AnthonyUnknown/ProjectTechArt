import { ChangeEvent } from "react";
import classes from "./elementStyles/inputSign.module.css";

interface IInput {
  labelName: string;
  value: string;
  onChange: (value: string, name: string) => void;
  name: string;
}
/* eslint-disable jsx-a11y/label-has-associated-control */
const InputSign: React.FC<IInput> = (props) => {
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    props.onChange(event.target.value, event.target.name);
  };
  return (
    <div className={classes.inputAndLabel}>
      <label htmlFor="name">{props.labelName}</label>
      <input
        value={props.value}
        name={props.name}
        onChange={onChange}
        className={classes.inputSign}
        id="name"
        type="text"
      />
    </div>
  );
};

export default InputSign;
