import { OutputStateProps } from "@/common/types/test";
import classes from "./challenge-controls.module.scss";
import { TestResult } from "./test-result";

interface Props {
  testOutput: OutputStateProps | null;
}

export function TestOutput({ testOutput }: Props) {
  if (!testOutput || testOutput?.status === undefined || !testOutput.output) {
    return (
      <div className={classes.noOutputWrapper}>
        <p>Click on &apos;Run&apos; button to see the output</p>
      </div>
    );
  }

  if (testOutput.isLoading) {
    return (
      <div className={classes.noOutputWrapper}>
        <p>Loading</p>
      </div>
    );
  }

  return (
    <div className={classes.testOutput}>
      <TestResult
        name={testOutput.output.name}
        status={testOutput.output.status}
        error={testOutput.output.error}
      />
    </div>
  );
}
