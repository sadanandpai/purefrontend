import dynamic from "next/dynamic";
import { Button } from "@radix-ui/themes";
import { useChallengeStore } from "@/ui/store/challenge.store";
import { useSandpack } from "@codesandbox/sandpack-react/unstyled";
import { getTestResult, getTestResults } from "@/ui/utils/test-results";
import { TestRunner } from "../../../../core/test-runner/test-runner";
import classes from "./challenge-editor.module.scss";

const MonacoEditor = dynamic(
  () =>
    import("@/ui/components/core/editor/monaco-editor").then(
      (module) => module.MonacoEditor
    ),
  { ssr: false }
);

export function ChallengeEditor() {
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

    dispatch({
      type: "run-tests",
      path: "/test-cases.test.ts",
    });
  }

  return (
    <div className="panel-layout">
      <MonacoEditor />
      <TestRunner />
      <div className={classes.execution}>
        <Button onClick={runUserTest}>Run</Button>
        <Button onClick={runAllTests}>Run All</Button>
      </div>
    </div>
  );
}
