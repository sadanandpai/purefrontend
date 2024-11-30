import { forwardRef, useImperativeHandle } from "react";
import Editor from "@monaco-editor/react";
import { useTheme } from "next-themes";
import {
  useSandpack,
  useActiveCode,
  // FileTabs,
} from "@codesandbox/sandpack-react/unstyled";
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "@/ui/utils/code-editor";
// import classes from "./editor.module.scss";

interface Props {
  fontSize: number;
  userId?: string;
  challengeId: number;
}

function MonacoEditorWithRef(
  { fontSize, challengeId, userId }: Props,
  ref: React.Ref<{ updateCode: (code: string) => void }>
) {
  const { resolvedTheme } = useTheme();
  const { sandpack } = useSandpack();
  const { code, updateCode } = useActiveCode();

  function onCodeChange(value?: string) {
    const code = value || "";
    updateCode(code);
    saveToLocalStorage(challengeId, code, userId);
  }

  function onMount() {
    const localCode = getFromLocalStorage(challengeId, userId);
    if (localCode) {
      updateCode(localCode);
    }
  }

  useImperativeHandle(
    ref,
    () => ({
      updateCode,
    }),
    []
  );

  return (
    <>
      {/* <FileTabs closableTabs={true} className={classes.fileTabs} /> */}
      <Editor
        height="calc(100% - 8.5rem)"
        language="javascript"
        theme={resolvedTheme === "dark" ? "vs-dark" : "vs-light"}
        options={{
          fontSize,
          formatOnType: true,
          minimap: {
            enabled: false,
          },
          scrollbar: {
            verticalScrollbarSize: 6,
          },
        }}
        key={sandpack.activeFile}
        value={code}
        onChange={onCodeChange}
        onMount={onMount}
      />
    </>
  );
}

export const MonacoEditor = forwardRef(MonacoEditorWithRef);
