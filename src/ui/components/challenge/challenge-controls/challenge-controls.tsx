import { useEffect, useState } from "react";
import { TestInput } from "./test-input";
import { TestConsole } from "./test-console";
import { TestOutput } from "./test-output";
import { useChallengeStore } from "@/ui/store/challenge.store";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import classes from "./challenge-controls.module.scss";

interface Props {
  defaultInput: string;
}

export function ChallengeControls({ defaultInput }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const testOutput = useChallengeStore((state) => state.testOutput);

  useEffect(() => {
    if (testOutput?.status !== undefined) {
      setSelectedIndex(1);
    }
  }, [testOutput?.status]);

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
          <Tab className="tab">Console</Tab>
        </TabList>

        <TabPanels className="tab-panels overflow-auto">
          <TabPanel className="tab-panel" unmount={false}>
            <TestInput defaultInput={defaultInput} />
          </TabPanel>
          <TabPanel className="tab-panel" unmount={false}>
            <TestOutput testOutput={testOutput} />
          </TabPanel>
          <TabPanel className="tab-panel" unmount={false}>
            <TestConsole />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
}
