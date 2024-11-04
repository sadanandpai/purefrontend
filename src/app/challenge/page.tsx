"use client";

import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { ChallengeLeftPanel } from "@/components/challenge-ui/challenge-left-panel";
import { ChallengeRightPanel } from "@/components/challenge-ui/challenge-right-panel";
import classes from "./challenge.module.scss";

export default function Challenge() {
  return (
    <div className={classes.challengeWrapper}>
      <PanelGroup direction="horizontal">
        <Panel defaultSize={50} minSize={20}>
          <ChallengeLeftPanel />
        </Panel>
        <PanelResizeHandle className="resize-handle" />
        <Panel minSize={30}>
          <ChallengeRightPanel />
        </Panel>
        <PanelResizeHandle />
      </PanelGroup>
    </div>
  );
}
