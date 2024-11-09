import { useEffect, useState } from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { Solution } from "@/ui/components/challenge/challenge-details/solution";
import { TestResults } from "@/ui/components/challenge/challenge-details/test-results";
import { ProblemStatement } from "@/ui/components/challenge/challenge-details/problem-statement";
import { Submissions } from "@/ui/components/challenge/challenge-details/submissions";
import { useChallengeStore } from "@/ui/store/challenge.store";
import { ProblemProps } from "@/common/types/problem";

interface Props {
  problem: ProblemProps;
}

export function ChallengeLeftPanel({ problem }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const testOutputs = useChallengeStore((state) => state.testOutputs);

  useEffect(() => {
    if (testOutputs?.outputs?.length) {
      setSelectedIndex(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testOutputs, setSelectedIndex]);

  return (
    <div className="panel-layout">
      <TabGroup
        selectedIndex={selectedIndex}
        onChange={setSelectedIndex}
        className="h-full"
      >
        <TabList className="tab-list">
          <Tab className="tab">Question</Tab>
          <Tab className="tab">Result</Tab>
          <Tab className="tab">Solution</Tab>
          <Tab className="tab">Submissions</Tab>
        </TabList>

        <TabPanels className="tab-panels">
          <TabPanel className="tab-panel">
            <ProblemStatement {...problem} />
          </TabPanel>
          <TabPanel className="tab-panel">
            <TestResults
              setSelectedIndex={setSelectedIndex}
              testOutputs={testOutputs}
            />
          </TabPanel>
          <TabPanel className="tab-panel">
            <Solution code={problem.solution} />
          </TabPanel>
          <TabPanel className="tab-panel">
            <Submissions />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
}
