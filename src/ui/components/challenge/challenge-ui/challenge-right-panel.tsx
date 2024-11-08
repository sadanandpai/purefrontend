import { EditorLayout } from "../editor-layout/editor-layout";
import { ChallengeControls } from "@/ui/components/challenge/challenge-controls/challenge-controls";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

interface Props {
  sampleInput: string;
}

export function ChallengeRightPanel({ sampleInput }: Props) {
  return (
    <PanelGroup direction="vertical">
      <Panel defaultSize={75} minSize={50} className="panel right top">
        <EditorLayout />
      </Panel>
      <PanelResizeHandle className="resize-handle" />
      <Panel defaultSize={25} minSize={25} className="panel right bottom">
        <ChallengeControls defaultInput={sampleInput} />
      </Panel>
    </PanelGroup>
  );
}
