/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useSandpack } from "@codesandbox/sandpack-react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

import { TestInput } from "./test-input";
import { TestCases } from "./test-cases";
import { TestConsole } from "./test-console";
import { TestOutput } from "./test-output";
import classes from "./challenge-controls.module.scss";

interface Props {
  defaultInput: string;
  testCode: (...args: any) => string;
}

export function ChallengeControls({ defaultInput, testCode }: Props) {
  const { listen } = useSandpack();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [testResult, setTestResult] = useState<any>({});

  useEffect(() => {
    const unsubscribe = listen((data) => {
      if (
        data.type === "test" &&
        data.event === "test_end" &&
        data.test.path === "/add.test.ts"
      ) {
        setTestResult({
          status: data.test.status,
          error: data.test.errors?.[0]?.message,
        });
        setSelectedIndex(1);
      }
    });

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            <TestOutput {...testResult} />
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
