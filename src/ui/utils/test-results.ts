import { TestResult } from "@/common/types/test";
import { SandpackClientListen } from "@codesandbox/sandpack-react";

export function getTestResult(
  listen: SandpackClientListen,
  onComplete: (result: TestResult) => void
) {
  return listen((data) => {
    if (
      data.type === "test" &&
      data.event === "test_end" &&
      data.test.path === "/add.test.ts"
    ) {
      onComplete({
        status: data.test.status,
        error: data.test.errors?.[0]?.message,
      });
    }
  });
}

export function getTestResults(
  listen: SandpackClientListen,
  onComplete: (results: TestResult[]) => void
) {
  let allTestResults: TestResult[] = [];
  return listen((data) => {
    if (data.type === "test" && data.event === "total_test_start") {
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
      onComplete(allTestResults);
    }
  });
}
