import { TestOutputProps } from "@/common/types/test";
import { SandpackClientListen } from "@codesandbox/sandpack-react";

export function getTestResult(
  listen: SandpackClientListen,
  onComplete: (result: { status: boolean; output: TestOutputProps }) => void
) {
  return listen((data) => {
    if (
      data.type === "test" &&
      data.event === "test_end" &&
      data.test.path === "/add.test.ts"
    ) {
      onComplete({
        status: data.test.status === "pass",
        output: {
          name: data.test.name,
          status: data.test.status,
          error: data.test.errors?.[0]?.message,
        },
      });
    }
  });
}

export function getTestResults(
  listen: SandpackClientListen,
  onComplete: (result: { status: boolean; outputs: TestOutputProps[] }) => void
) {
  let status = true;
  let outputs: TestOutputProps[] = [];
  return listen((data) => {
    if (data.type === "test" && data.event === "total_test_start") {
      outputs = [];
    }

    if (
      data.type === "test" &&
      data.event === "test_end" &&
      data.test.path === "/test-cases.test.ts"
    ) {
      status &&= data.test.status === "pass";
      outputs.push({
        name: data.test.name,
        status: data.test.status,
        error: data.test.errors?.[0]?.message,
      });
    }

    if (data.type === "test" && data.event === "total_test_end") {
      onComplete({ status, outputs });
    }
  });
}
