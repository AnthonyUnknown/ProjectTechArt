/* eslint-disable jsx-a11y/label-has-associated-control */
import { ChangeEvent } from "react";
import classes from "./elementStyles/radioBtn.module.css";

interface IRadioBtn {
  type: string;
  id: string;
  name: string;
  value: string;
  labelname: string;
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const RadioBtn: React.FC<IRadioBtn> = ({ type, id, name, value, labelname, checked, onChange }) => (
  <div className={classes.genresRadio}>
    <input
      className={classes.genresRadioBtn}
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      checked={checked}
    />
    <label htmlFor="radio">{labelname}</label>
  </div>
);

export default RadioBtn;
