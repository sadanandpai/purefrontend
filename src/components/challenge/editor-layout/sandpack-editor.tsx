import { SandpackCodeEditor } from "@codesandbox/sandpack-react";

export function SandpackEditor() {
  return (
    <>
      <SandpackCodeEditor
        showRunButton={false}
        showInlineErrors={true}
        showLineNumbers={true}
        showTabs={true}
        style={{ height: "100%" }}
      />
    </>
  );
}
