import { useRef } from "react";
import { SandpackConsole } from "@codesandbox/sandpack-react/unstyled";
import { Button } from "@radix-ui/themes";

interface SandpackConsoleRef {
  reset: () => void;
}

export function ChallengeConsole() {
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
      />
      <Button onClick={onClear}>Clear</Button>
    </>
  );
}
