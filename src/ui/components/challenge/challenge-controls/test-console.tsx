import { SandpackConsole } from "@codesandbox/sandpack-react";
import { useRef } from "react";

export function TestConsole() {
  const consoleRef = useRef(null);

  return (
    <>
      <SandpackConsole ref={consoleRef} showSyntaxError={false} />
    </>
  );
}
