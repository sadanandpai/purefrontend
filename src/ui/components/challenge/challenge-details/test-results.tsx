/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useChallengeStore } from "@/ui/store/challenge.store";
import { TestResult } from "@/ui/components/challenge/challenge-controls/test-result";
import classes from "./challenge-details.module.scss";

interface Props {
  setSelectedIndex: (index: number) => void;
}

export function TestResults({ setSelectedIndex }: Props) {
  const testResults = useChallengeStore((state) => state.results);

  useEffect(() => {
    if (testResults.length) {
      setSelectedIndex(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testResults]);

  if (!testResults.length) {
    return (
      <div className={classes.noOutputWrapper}>
        <p>Click on submit button to see the output</p>
      </div>
    );
  }

  return (
    <>
      {testResults.map((result: any, index: number) => (
        <TestResult key={index} {...result} />
      ))}
    </>
  );
}
