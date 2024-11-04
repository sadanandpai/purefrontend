import React from "react";
import { SandpackTests } from "@codesandbox/sandpack-react";

export function TestCases() {
  return (
    <SandpackTests
      style={{ fontSize: "1.4rem" }}
      watchMode={false}
      showWatchButton={false}
      showVerboseButton={false}
      hideTestsAndSupressLogs={true}
    />
  );
}
