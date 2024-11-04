import { problem } from "@/data/1";
import { EditorLayout } from "../editor-layout/editor-layout";
import { ChallengeControls } from "@/components/challenge/challenge-controls/challenge-controls";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

export function ChallengeRightPanel() {
  return (
    <PanelGroup direction="vertical">
      <Panel defaultSize={75} minSize={50} className="panel right top">
        <EditorLayout />
      </Panel>
      <PanelResizeHandle className="resize-handle" />
      <Panel minSize={25} className="panel right bottom">
        <ChallengeControls
          defaultInput={problem.sampleInput}
          testCode={problem.testCode}
        />
      </Panel>
    </PanelGroup>
  );
}
