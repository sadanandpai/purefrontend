import dynamic from "next/dynamic";
import { useSandpack } from "@codesandbox/sandpack-react";

// const SandpackEditor = dynamic(
//   () =>
//     import("@/components/code-editor/sandpack-editor").then(
//       (module) => module.SandpackEditor
//     ),
//   { ssr: false }
// );

const MonacoEditor = dynamic(
  () =>
    import("@/components/challenge/editor-layout/monaco-editor").then(
      (module) => module.MonacoEditor
    ),
  { ssr: false }
);

export function EditorLayout() {
  const { dispatch } = useSandpack();

  function runUserTest() {
    dispatch({
      type: "run-tests",
      path: "/add.test.ts",
    });
  }

  function runAllTests() {
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
