/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { TestOutput } from "@/ui/components/challenge/challenge-controls/test-output";
import { usechallengeStore } from "@/ui/store/challenge.store";

interface Props {
  setSelectedIndex: (index: number) => void;
}

export function TestResults({ setSelectedIndex }: Props) {
  const testResults = usechallengeStore((state) => state.results);

  useEffect(() => {
    if (testResults.length) {
      setSelectedIndex(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testResults]);

  return (
    <>
      {testResults.map((result: any, index: number) => (
        <TestOutput key={index} {...result} />
      ))}
    </>
  );
}
