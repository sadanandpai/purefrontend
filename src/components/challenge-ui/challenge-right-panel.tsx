import { problem } from "@/data/1";
import dynamic from "next/dynamic";
import { Allotment } from "allotment";
import { SandpackProvider } from "@codesandbox/sandpack-react";
import { ChallengeControls } from "@/components/challenge-controls/challenge-controls";

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
      <Allotment vertical={true} defaultSizes={[800, 300]} minSize={300}>
        <MonacoEditor />
        <ChallengeControls
          defaultInput={problem.sampleInput}
          testCode={problem.testCode}
        />
      </Allotment>
    </SandpackProvider>
  );
}
