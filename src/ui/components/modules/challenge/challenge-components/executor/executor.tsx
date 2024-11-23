"use client";

import { usePathname } from "next/navigation";
import { Button, Flex } from "@radix-ui/themes";
import { useChallengeStore } from "@/ui/store/challenge.store";
import { useSandpack } from "@codesandbox/sandpack-react/unstyled";
import { getTestResult, getTestResults } from "@/ui/utils/test-results";
import { incrementChallengeAttempts } from "@/server/actions/challenge";

export function Executor() {
  const challengeId = Number(usePathname().split("/").at(-1));
  const { dispatch, listen } = useSandpack();
  const setOutput = useChallengeStore((state) => state.setOutput);
  const setOutputs = useChallengeStore((state) => state.setOutputs);

  function runUserTest() {
    setOutput({ isLoading: true });
    const unsubscribe = getTestResult(listen, (result) => {
      setOutput({ isLoading: false, ...result });
      unsubscribe();
    });

    dispatch({
      type: "run-tests",
      path: "/add.test.ts",
    });
  }

  function runAllTests() {
    setOutputs({ isLoading: true });
    const unsubscribe = getTestResults(listen, (result) => {
      setOutputs({ isLoading: false, ...result, executionId: Date.now() });
      unsubscribe();
    });

    incrementChallengeAttempts(challengeId);

    dispatch({
      type: "run-tests",
      path: "/test-cases.test.ts",
    });
  }

  return (
    <Flex justify="end" align="center" gap="1" mt="2" mr="2">
      <Button onClick={runUserTest}>Run</Button>
      <Button onClick={runAllTests}>Run All</Button>
    </Flex>
  );
}
