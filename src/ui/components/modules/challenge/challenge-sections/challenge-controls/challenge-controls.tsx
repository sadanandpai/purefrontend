import { useEffect, useState } from "react";
import { ChallengeInput } from "../../challenge-elements/challenge-input/challenge-input";
import { ChallengeConsole } from "../../challenge-elements/challenge-console/challenge-console";
import { ChallengeOutput } from "../../challenge-elements/challenge-output/challenge-output";
import { useChallengeStore } from "@/ui/store/challenge.store";
import { Box, Tabs } from "@radix-ui/themes";
import classes from "./challenge-controls.module.scss";

interface Props {
  defaultInput: string;
}

export function ChallengeControls({ defaultInput }: Props) {
  const [selectedTab, setSelectedTab] = useState("input");
  const testOutput = useChallengeStore((state) => state.testOutput);

  useEffect(() => {
    if (testOutput?.status !== undefined) {
      setSelectedTab("output");
    }
  }, [testOutput?.status]);

  return (
    <div className="panel-layout">
      <Tabs.Root
        value={selectedTab}
        onValueChange={setSelectedTab}
        className={classes.controlsWrapper}
      >
        <Tabs.List className="flex-shrink-0">
          <Tabs.Trigger value="input">Input</Tabs.Trigger>
          <Tabs.Trigger value="output">Output</Tabs.Trigger>
          <Tabs.Trigger value="console">Console</Tabs.Trigger>
        </Tabs.List>

        <Box pt="3" className={classes.controlsBox}>
          <Tabs.Content
            value="input"
            hidden={selectedTab !== "input"}
            forceMount
          >
            <ChallengeInput defaultInput={defaultInput} />
          </Tabs.Content>

          <Tabs.Content value="output" className="tab-content">
            <ChallengeOutput testOutput={testOutput} />
          </Tabs.Content>

          <Tabs.Content
            value="console"
            className="tab-content"
            hidden={selectedTab !== "console"}
            forceMount
          >
            <ChallengeConsole />
          </Tabs.Content>
        </Box>
      </Tabs.Root>
    </div>
  );
}
