import dynamic from "next/dynamic";
import { useSandpack } from "@codesandbox/sandpack-react";
import { getTestResult, getTestResults } from "@/ui/utils/test-results";
import { usechallengeStore } from "@/ui/store/challenge.store";

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
  const setResult = usechallengeStore((state) => state.setResult);
  const setResults = usechallengeStore((state) => state.setResults);

  function runUserTest() {
    const unsubscribe = getTestResult(listen, (result) => {
      setResult(result);
      unsubscribe();
    });

    dispatch({
      type: "run-tests",
      path: "/add.test.ts",
    });
  }

  function runAllTests() {
    const unsubscribe = getTestResults(listen, (results) => {
      setResults(results);
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

      <div className="flex gap-4 justify-end">
        <button className="btn" onClick={runUserTest}>
          Run
        </button>

        <button className="btn" onClick={runAllTests}>
          Submit
        </button>
      </div>
    </div>
  );
}
