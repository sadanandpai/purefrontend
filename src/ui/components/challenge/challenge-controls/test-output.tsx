import classes from "./challenge-controls.module.scss";

interface Props {
  status?: string;
  error?: string;
}

export function TestOutput({ status, error }: Props) {
  if (!status) {
    return (
      <div className={classes.noOutputWrapper}>
        <p>Click on run button to see the output</p>
      </div>
    );
  }

  return (
    <div className={classes.outputWrapper}>
      <h3 className={classes.title} data-status={status}>
        {status}
      </h3>
      {error && <pre className={classes.details}>{error}</pre>}
    </div>
  );
}
