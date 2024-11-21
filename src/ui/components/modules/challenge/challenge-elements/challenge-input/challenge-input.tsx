import { useEffect, useState } from "react";
import ContentEditable from "react-contenteditable";
import { useSandpack } from "@codesandbox/sandpack-react/unstyled";
import { testCode } from "@/ui/utils/test-code";
import classes from "./challenge-input.module.scss";

interface Props {
  defaultInput: string;
}

export function ChallengeInput({ defaultInput }: Props) {
  const { sandpack } = useSandpack();
  const [userInput, setUserInput] = useState<string>(defaultInput);

  useEffect(() => {
    sandpack.updateFile("/add.test.ts", testCode(userInput));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInput]);

  return (
    <ContentEditable
      className={classes.testInput}
      html={userInput}
      onChange={(e) => setUserInput(e.target.value)}
      tagName="div"
    />
  );
}
