import dynamic from "next/dynamic";
import { TestRunner } from "@/ui/components/core/test-runner/test-runner";
import { Executor } from "../../challenge-components/executor/executor";
import { useState } from "react";
import { EditorControls } from "../../challenge-components/editor-controls/editor-controls";

const MonacoEditor = dynamic(
  () =>
    import("@/ui/components/core/editor/monaco-editor").then(
      (module) => module.MonacoEditor
    ),
  { ssr: false }
);

export function ChallengeEditor() {
  const [fontSize, setFontSize] = useState(14);

  return (
    <div className="panel-layout">
      <EditorControls fontSize={fontSize} setFontSize={setFontSize} />
      <MonacoEditor fontSize={fontSize} />
      <TestRunner />
      <Executor />
    </div>
  );
}
