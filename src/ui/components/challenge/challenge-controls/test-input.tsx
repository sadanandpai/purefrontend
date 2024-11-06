/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useSandpack } from "@codesandbox/sandpack-react";
import ContentEditable from "react-contenteditable";
import classes from "./challenge-controls.module.scss";

interface Props {
  defaultInput: string;
  testCode: (...args: any) => string;
}

export function TestInput({ defaultInput, testCode }: Props) {
  const { sandpack } = useSandpack();
  const [userInput, setUserInput] = useState<string>(defaultInput);

  useEffect(() => {
    const [num1, num2] = userInput
      .split(",")
      .map((line) => line.trim())
      .map(Number);

    sandpack.updateFile("/add.test.ts", testCode(num1, num2));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInput]);

  return (
    <div className={classes.testInputWrapper}>
      <ContentEditable
        className={classes.testInput}
        html={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        tagName="div"
      />
    </div>
  );
}
