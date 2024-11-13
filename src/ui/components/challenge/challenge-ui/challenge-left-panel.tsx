import { useEffect, useState } from "react";
import { Solution } from "@/ui/components/challenge/challenge-details/solution";
import { TestResults } from "@/ui/components/challenge/challenge-details/test-results";
import { ProblemStatement } from "@/ui/components/challenge/challenge-details/problem-statement";
import { Submissions } from "@/ui/components/challenge/challenge-details/submissions";
import { useChallengeStore } from "@/ui/store/challenge.store";
import { ProblemProps } from "@/common/types/problem";
import { Box, Tabs } from "@radix-ui/themes";
import classes from "./challenge-ui.module.scss";

interface Props {
  problem: ProblemProps;
}

export function ChallengeLeftPanel({ problem }: Props) {
  const [selectedTab, setSelectedTab] = useState("question");
  const testOutputs = useChallengeStore((state) => state.testOutputs);

  useEffect(() => {
    if (testOutputs?.outputs?.length) {
      setSelectedTab("result");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testOutputs, setSelectedTab]);

  return (
    <Tabs.Root
      value={selectedTab}
      onValueChange={setSelectedTab}
      className={classes.controlsWrapper}
    >
      <Tabs.List className="flex-shrink-0">
        <Tabs.Trigger value="question">Question</Tabs.Trigger>
        <Tabs.Trigger value="result">Result</Tabs.Trigger>
        <Tabs.Trigger value="solution">Solution</Tabs.Trigger>
        <Tabs.Trigger value="submissions">Submissions</Tabs.Trigger>
      </Tabs.List>

      <Box pt="3" className={classes.controlsBox}>
        <Tabs.Content value="question">
          <ProblemStatement {...problem} />
        </Tabs.Content>

        <Tabs.Content value="result">
          <TestResults
            setSelectedTab={setSelectedTab}
            testOutputs={testOutputs}
          />
        </Tabs.Content>

        <Tabs.Content value="solution">
          <Solution code={problem.solution} />
        </Tabs.Content>

        <Tabs.Content value="submissions">
          <Submissions />
        </Tabs.Content>
      </Box>
    </Tabs.Root>
  );

  // return (
  //   <TabGroup
  //     selectedIndex={selectedIndex}
  //     onChange={setSelectedIndex}
  //     className="h-full"
  //   >
  //     <TabList className="tab-list">
  //       <Tab className="tab">Question</Tab>
  //       <Tab className="tab">Result</Tab>
  //       <Tab className="tab">Solution</Tab>
  //       <Tab className="tab">Submissions</Tab>
  //     </TabList>

  //     <TabPanels className="tab-panels">
  //       <TabPanel className="tab-panel">
  //         <ProblemStatement {...problem} />
  //       </TabPanel>
  //       <TabPanel className="tab-panel">
  //         <TestResults
  //           setSelectedIndex={setSelectedIndex}
  //           testOutputs={testOutputs}
  //         />
  //       </TabPanel>
  //       <TabPanel className="tab-panel">
  //         <Solution code={problem.solution} />
  //       </TabPanel>
  //       <TabPanel className="tab-panel">
  //         <Submissions />
  //       </TabPanel>
  //     </TabPanels>
  //   </TabGroup>
  // );
}
