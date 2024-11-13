import dynamic from "next/dynamic";
import { useSandpack } from "@codesandbox/sandpack-react/unstyled";
import { getTestResult, getTestResults } from "@/ui/utils/test-results";
import { useChallengeStore } from "@/ui/store/challenge.store";
import { SandpackTestComponent } from "../challenge-controls/test-cases";
import classes from "./editor-layout.module.scss";
import { Button } from "@radix-ui/themes";

// const SandpackEditor = dynamic(
//   () =>
//     import("@/ui/components/code-editor/sandpack-editor").then(
//       (module) => module.SandpackEditor
//     ),
//   { ssr: false }
// );

const MonacoEditor = dynamic(
  () =>
    import("@/ui/components/challenge/editor-layout/monaco-editor").then(
      (module) => module.MonacoEditor
    ),
  { ssr: false }
);

export function EditorLayout() {
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
      <SandpackTestComponent />
      <div className={classes.execution}>
        <Button onClick={runUserTest}>Run</Button>
        <Button onClick={runAllTests}>Run All</Button>
      </div>
    </div>
  );
}
