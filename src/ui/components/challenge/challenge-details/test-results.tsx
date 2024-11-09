import { TestResult } from "@/ui/components/challenge/challenge-controls/test-result";
import { SaveSubmission } from "./save-submission";
import { OutputsStateProps, TestOutputProps } from "@/common/types/test";
import classes from "./challenge-details.module.scss";

interface Props {
  testOutputs: OutputsStateProps | null;
  setSelectedIndex: (index: number) => void;
}

export function TestResults({ setSelectedIndex, testOutputs }: Props) {
  if (!testOutputs) {
    return (
      <div className={classes.verticalCenter}>
        <p>Click on &apos;Run all&apos; button to see the output</p>
      </div>
    );
  }

  if (testOutputs.isLoading) {
    return (
      <div className={classes.verticalCenter}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className={classes.testResultsWrapper}>
      <div className={classes.testResults}>
        {testOutputs.outputs?.map((result: TestOutputProps, index: number) => (
          <TestResult key={index} {...result} />
        ))}
      </div>

      <SaveSubmission
        status={testOutputs.status}
        setSelectedIndex={setSelectedIndex}
      />
    </div>
  );
}