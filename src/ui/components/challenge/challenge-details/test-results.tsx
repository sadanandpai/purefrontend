import { useChallengeStore } from "@/ui/store/challenge.store";
import { TestResult } from "@/ui/components/challenge/challenge-controls/test-result";
import { SaveSubmission } from "./save-submission";
import { TestResultProps } from "@/common/types/test";
import classes from "./challenge-details.module.scss";

interface Props {
  setSelectedIndex: (index: number) => void;
}

export function TestResults({ setSelectedIndex }: Props) {
  const testResults = useChallengeStore((state) => state.results);

  if (!testResults.length) {
    return (
      <div className={classes.verticalCenter}>
        <p>Click on submit button to see the output</p>
      </div>
    );
  }

  return (
    <div className={classes.testResultsWrapper}>
      <div className={classes.testResults}>
        {testResults.map((result: TestResultProps, index: number) => (
          <TestResult key={index} {...result} />
        ))}
      </div>
      <SaveSubmission setSelectedIndex={setSelectedIndex} />
    </div>
  );
}
