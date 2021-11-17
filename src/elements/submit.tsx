import classes from "./elementStyles/submit.module.css";

const Submit: React.FC = (props) => (
  <div className={classes.submitBlock}>
    <button {...props} className={classes.submit} type="submit">
      Submit
    </button>
  </div>
);

export default Submit;
