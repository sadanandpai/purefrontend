import classes from "./challenge-controls.module.scss";

interface Props {
  status: "fail" | "pass";
  error: string;
}

export function TestOutput({ status, error }: Props) {
  return (
    <div className={classes.outputWrapper}>
      <h3 className={classes.title} data-status={status}>
        {status}
      </h3>
      {error && <pre className={classes.details}>{error}</pre>}
    </div>
  );
}
