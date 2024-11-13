import { OutputStateProps } from "@/common/types/test";
import { TestResult } from "@/ui/components/core/test-result/test-result";
import classes from "./challenge-output.module.scss";

interface Props {
  testOutput: OutputStateProps | null;
}

export function ChallengeOutput({ testOutput }: Props) {
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
