/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { TestInput } from "./test-input";
import { TestCases } from "./test-cases";
import { TestConsole } from "./test-console";
import { TestOutput } from "./test-output";
import { usechallengeStore } from "@/ui/store/challenge.store";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import classes from "./challenge-controls.module.scss";

interface Props {
  defaultInput: string;
  testCode: (...args: any) => string;
}

export function ChallengeControls({ defaultInput, testCode }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const testResult = usechallengeStore((state) => state.result);

  useEffect(() => {
    if (testResult?.status) {
      setSelectedIndex(1);
    }
  }, [testResult]);

  return (
    <div className="panel-layout">
      <TabGroup
        selectedIndex={selectedIndex}
        onChange={setSelectedIndex}
        className={classes.controlsWrapper}
      >
        <TabList className="tab-list">
          <Tab className="tab">Input</Tab>
          <Tab className="tab">Output</Tab>
          <Tab className="tab">Test Execution</Tab>
          <Tab className="tab">Console</Tab>
        </TabList>

        <TabPanels className="tab-panels overflow-auto">
          <TabPanel className="tab-panel" unmount={false}>
            <TestInput defaultInput={defaultInput} testCode={testCode} />
          </TabPanel>
          <TabPanel className="tab-panel" unmount={false}>
            <TestOutput status={testResult?.status} error={testResult?.error} />
          </TabPanel>
          <TabPanel className="tab-panel" unmount={false}>
            <TestCases />
          </TabPanel>
          <TabPanel className="tab-panel" unmount={false}>
            <TestConsole />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
}
