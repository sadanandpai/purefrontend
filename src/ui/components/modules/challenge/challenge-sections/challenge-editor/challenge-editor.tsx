import dynamic from "next/dynamic";
import { TestRunner } from "@/ui/components/core/test-runner/test-runner";
import { Executor } from "../../challenge-components/executor/executor";
import { useContext, useRef, useState } from "react";
import { EditorControls } from "../../challenge-components/editor-controls/editor-controls";
import { appContext } from "@/ui/context/app.context";
import { usePathname } from "next/navigation";

const MonacoEditor = dynamic(
  () =>
    import("@/ui/components/core/editor/monaco-editor").then(
      (module) => module.MonacoEditor
    ),
  { ssr: false }
);

interface Props {
  defaultCode: string;
}

export function ChallengeEditor({ defaultCode }: Props) {
  const { user } = useContext(appContext);
  const challengeId = Number(usePathname().split("/").at(-1));

  const [fontSize, setFontSize] = useState(16);
  const editorRef = useRef<{
    updateCode: (code: string) => void;
  }>(null);

  return (
    <div className="panel-layout">
      <EditorControls
        fontSize={fontSize}
        setFontSize={setFontSize}
        onReset={() => editorRef.current?.updateCode(defaultCode)}
      />
      <MonacoEditor
        fontSize={fontSize}
        userId={user?.$id}
        challengeId={challengeId}
        ref={editorRef}
      />
      <TestRunner />
      <Executor />
    </div>
  );
}
