/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useChallengeStore } from "@/ui/store/challenge.store";
import { TestResult } from "@/ui/components/challenge/challenge-controls/test-result";

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

  return (
    <>
      {testResults.map((result: any, index: number) => (
        <TestResult key={index} {...result} />
      ))}
    </>
  );
}
