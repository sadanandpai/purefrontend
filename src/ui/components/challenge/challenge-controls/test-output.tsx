import classes from "./challenge-controls.module.scss";
import { TestResult } from "./test-result";

interface Props {
  name?: string;
  status?: string;
  error?: string;
}

export function TestOutput({ name, status, error }: Props) {
  if (!status) {
    return (
      <div className={classes.noOutputWrapper}>
        <p>Click on run button to see the output</p>
      </div>
    );
  }

  return <TestResult name={name!} status={status} error={error!} />;
}
