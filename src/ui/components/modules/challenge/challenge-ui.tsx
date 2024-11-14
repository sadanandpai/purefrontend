"use client";

import { SandpackProvider } from "@codesandbox/sandpack-react/unstyled";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { ChallengeDetails } from "@/ui/components/modules/challenge/challenge-sections/challenge-details/challenge-details";
import { ChallengeEditor } from "./challenge-sections/challenge-editor/challenge-editor";
import { ChallengeControls } from "./challenge-sections/challenge-controls/challenge-controls";
import { ProblemProps } from "@/common/types/problem";
import { testCode } from "@/ui/utils/test-code";
import classes from "./challenge-ui.module.scss";
import { useEffect } from "react";
import { useChallengeStore } from "@/ui/store/challenge.store";

interface Props {
  problem: ProblemProps;
}

export default function ChallengeUI({ problem }: Props) {
  const files = {
    "/code.ts": problem.code,
    "/add.test.ts": testCode(problem.sampleInput),
    "/test-cases.test.ts": problem.testCases,
    "/solution.ts": problem.solution,
  };
  const resetOutput = useChallengeStore((state) => state.resetOutput);
  const resetOutputs = useChallengeStore((state) => state.resetOutputs);

  useEffect(() => {
    return () => {
      resetOutput();
      resetOutputs();
    };
  }, [problem]);

  return (
    <SandpackProvider
      files={files}
      template="test-ts"
      className={classes.challengeWrapper}
      options={{
        activeFile: "/code.ts",
        visibleFiles: ["/code.ts"],
        initMode: "immediate",
        autorun: true,
      }}
    >
      <PanelGroup direction="horizontal">
        <Panel minSize={25} defaultSize={40} className="panel left">
          <ChallengeDetails problem={problem} />
        </Panel>
        <PanelResizeHandle />
        <Panel minSize={30} defaultSize={60} className="hidden md:block">
          <PanelGroup direction="vertical">
            <Panel defaultSize={75} minSize={50} className="panel right top">
              <ChallengeEditor />
            </Panel>
            <PanelResizeHandle />
            <Panel defaultSize={25} minSize={25} className="panel right bottom">
              <ChallengeControls defaultInput={problem.sampleInput} />
            </Panel>
          </PanelGroup>
        </Panel>
      </PanelGroup>
    </SandpackProvider>
  );
}
