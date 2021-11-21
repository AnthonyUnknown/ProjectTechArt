import classes from "./elementStyles/submit.module.css";

interface ISubmit {
  disabled?: boolean;
}

const Submit: React.FC<ISubmit> = (props) => (
  <div className={classes.submitBlock}>
    <button {...props} className={classes.submit} type="submit">
      Submit
    </button>
  </div>
);

export default Submit;
