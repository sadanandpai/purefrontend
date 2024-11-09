import { useRef } from "react";
import { SandpackConsole } from "@codesandbox/sandpack-react";

interface SandpackConsoleRef {
  reset: () => void;
}

export function TestConsole() {
  const consoleRef = useRef<SandpackConsoleRef | null>(null);

  function onClear() {
    consoleRef.current?.reset();
  }

  return (
    <>
      <SandpackConsole
        ref={consoleRef}
        showSyntaxError={false}
        showResetConsoleButton={false}
        resetOnPreviewRestart={true}
        actionsChildren={
          <button className="btn" onClick={onClear}>
            Clear
          </button>
        }
      />
    </>
  );
}
