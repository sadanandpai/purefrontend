"use client";

import { problem } from "@/data/1";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { ChallengeLeftPanel } from "@/components/challenge/challenge-ui/challenge-left-panel";
import { ChallengeRightPanel } from "@/components/challenge/challenge-ui/challenge-right-panel";
import classes from "./challenge.module.scss";
import { SandpackProvider } from "@codesandbox/sandpack-react";

const files = {
  "/code.ts": problem.code,
  "/add.test.ts": problem.testCode(),
  "/test-cases.test.ts": problem.testCases,
  "/solution.ts": problem.solution,
};

export default function Challenge() {
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
      <div className={classes.challengeWrapper}>
        <PanelGroup direction="horizontal">
          <Panel
            defaultSize={40}
            minSize={25}
            maxSize={75}
            className="panel left"
          >
            <ChallengeLeftPanel />
          </Panel>
          <PanelResizeHandle className="resize-handle" />
          <Panel minSize={30}>
            <ChallengeRightPanel />
          </Panel>
          <PanelResizeHandle />
        </PanelGroup>
      </div>
    </SandpackProvider>
  );
}
