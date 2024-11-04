/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSandpack } from "@codesandbox/sandpack-react";
import { useEffect, useState } from "react";
import { TestOutput } from "../challenge-controls/test-output";

export function TestResults() {
  const { listen } = useSandpack();
  const [testResults, setTestResults] = useState<any>([]);

  useEffect(() => {
    let allTestResults: any = [];
    const unsubscribe = listen((data) => {
      if (
        data.type === "test" &&
        data.event === "test_start" &&
        data.test.path === "/test-cases.test.ts"
      ) {
        allTestResults = [];
      }

      if (
        data.type === "test" &&
        data.event === "test_end" &&
        data.test.path === "/test-cases.test.ts"
      ) {
        allTestResults.push({
          status: data.test.status,
          error: data.test.errors?.[0]?.message,
        });
      }

      if (data.type === "test" && data.event === "total_test_end") {
        setTestResults(allTestResults);
      }
    });

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {testResults.map((result: any, index: number) => (
        <TestOutput key={index} {...result} />
      ))}
    </>
  );
}
