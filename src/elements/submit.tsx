import classes from "./elementStyles/submit.module.css";

interface ISubmit {
  disabled?: boolean;
  buttonname: string;
  onClick?: () => void;
}

const Submit: React.FC<ISubmit> = (props) => (
  <div className={classes.submitBlock}>
    <button {...props} className={classes.submit} type="submit">
      {props.buttonname}
    </button>
  </div>
);

export default Submit;
