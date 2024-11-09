"use client";

import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { ChallengeLeftPanel } from "@/ui/components/challenge/challenge-ui/challenge-left-panel";
import { ChallengeRightPanel } from "@/ui/components/challenge/challenge-ui/challenge-right-panel";
import { SandpackProvider } from "@codesandbox/sandpack-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppContextProvider } from "@/ui/context/app.context";
import { ProblemProps } from "@/common/types/problem";
import { testCode } from "@/ui/utils/test-code";
import classes from "./challenge-ui.module.scss";

const queryClient = new QueryClient();

interface Props {
  problem: ProblemProps;
}

export default function ChallengeUI({ problem }: Props) {
  return (
    <AppContextProvider>
      <QueryClientProvider client={queryClient}>
        <SandpackProvider
          options={{
            activeFile: "/code.ts",
            visibleFiles: ["/code.ts"],
            initMode: "immediate",
            autorun: true,
          }}
          files={{
            "/code.ts": problem.code,
            "/add.test.ts": testCode(problem.sampleInput),
            "/test-cases.test.ts": problem.testCases,
            "/solution.ts": problem.solution,
          }}
          template="test-ts"
          theme="auto"
          style={{ height: "100%" }}
        >
          <div className={classes.challengeWrapper}>
            <PanelGroup direction="horizontal">
              <Panel
                minSize={25}
                maxSize={70}
                defaultSize={40}
                className="panel left"
              >
                <ChallengeLeftPanel problem={problem} />
              </Panel>
              <PanelResizeHandle className="resize-handle" />
              <Panel minSize={30} maxSize={75} defaultSize={60}>
                <ChallengeRightPanel sampleInput={problem.sampleInput} />
              </Panel>
            </PanelGroup>
          </div>
        </SandpackProvider>
      </QueryClientProvider>
    </AppContextProvider>
  );
}
