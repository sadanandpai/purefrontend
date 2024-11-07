import classes from "./challenge-details.module.scss";

export function Submissions() {
  return (
    <div className={classes.noOutputWrapper}>
      <p>You have not submitted any code yet</p>
    </div>
  );
}
