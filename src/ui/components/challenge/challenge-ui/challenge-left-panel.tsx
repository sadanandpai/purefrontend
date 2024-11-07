import { useState } from "react";
import { problem } from "@/data/1";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { Solution } from "@/ui/components/challenge/challenge-details/solution";
import { TestResults } from "@/ui/components/challenge/challenge-details/test-results";
import { ProblemStatement } from "@/ui/components/challenge/challenge-details/problem-statement";
import { Submissions } from "@/ui/components/challenge/challenge-details/submissions";

export function ChallengeLeftPanel() {
  const [selectedIndex, setSelectedIndex] = useState(0);

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
          <TabPanel className="tab-panel" unmount={false}>
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
