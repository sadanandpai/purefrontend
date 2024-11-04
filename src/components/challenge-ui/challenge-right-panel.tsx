import { problem } from "@/data/1";
import dynamic from "next/dynamic";
import { SandpackProvider } from "@codesandbox/sandpack-react";
import { ChallengeControls } from "@/components/challenge-controls/challenge-controls";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

// const SandpackEditor = dynamic(
//   () =>
//     import("@/components/code-editor/sandpack-editor").then(
//       (module) => module.SandpackEditor
//     ),
//   { ssr: false }
// );

const MonacoEditor = dynamic(
  () =>
    import("@/components/code-editor/monaco-editor").then(
      (module) => module.MonacoEditor
    ),
  { ssr: false }
);

export function ChallengeRightPanel() {
  const files = {
    "/code.ts": problem.code,
    "/add.test.ts": problem.testCode(),
    "/solution.ts": problem.solution,
  };

  return (
    <SandpackProvider
      options={{
        activeFile: "/code.ts",
        visibleFiles: ["/code.ts"],
        initMode: "immediate",
        autorun: true,
      }}
      files={files}
      template="test-ts"
      theme="auto"
      style={{ height: "100%" }}
    >
      <PanelGroup direction="vertical">
        <Panel defaultSize={50} minSize={20}>
          <MonacoEditor />
        </Panel>
        <PanelResizeHandle className="resize-handle" />
        <Panel minSize={30}>
          <ChallengeControls
            defaultInput={problem.sampleInput}
            testCode={problem.testCode}
          />
        </Panel>
      </PanelGroup>
    </SandpackProvider>
  );
}
