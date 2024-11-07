import { useEffect, useState } from "react";
import { problem } from "@/data/1";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { Solution } from "@/ui/components/challenge/challenge-details/solution";
import { TestResults } from "@/ui/components/challenge/challenge-details/test-results";
import { ProblemStatement } from "@/ui/components/challenge/challenge-details/problem-statement";
import { Submissions } from "@/ui/components/challenge/challenge-details/submissions";
import { useChallengeStore } from "@/ui/store/challenge.store";

export function ChallengeLeftPanel() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const testResults = useChallengeStore((state) => state.results);

  useEffect(() => {
    if (testResults.length) {
      setSelectedIndex(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testResults, setSelectedIndex]);

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
          <Tab className="tab">Submissions</Tab>
          <Tab className="tab">Solution</Tab>
        </TabList>

        <TabPanels className="tab-panels">
          <TabPanel className="tab-panel">
            <ProblemStatement {...problem} />
          </TabPanel>
          <TabPanel className="tab-panel">
            <TestResults setSelectedIndex={setSelectedIndex} />
          </TabPanel>
          <TabPanel className="tab-panel">
            <Submissions />
          </TabPanel>
          <TabPanel className="tab-panel">
            <Solution code={problem.solution} />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
}
