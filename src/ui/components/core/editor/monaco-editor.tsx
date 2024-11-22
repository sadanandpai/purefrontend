import { forwardRef, useImperativeHandle } from "react";
import Editor from "@monaco-editor/react";
import { useTheme } from "next-themes";
import {
  useSandpack,
  useActiveCode,
  // FileTabs,
} from "@codesandbox/sandpack-react/unstyled";
// import classes from "./editor.module.scss";

interface Props {
  fontSize: number;
}

function MonacoEditorWithRef(
  { fontSize }: Props,
  ref: React.Ref<{ updateCode: (code: string) => void }>
) {
  const theme = useTheme();
  const { sandpack } = useSandpack();
  const { code, updateCode } = useActiveCode();

  useImperativeHandle(ref, () => ({
    updateCode,
  }));

  return (
    <>
      {/* <FileTabs closableTabs={true} className={classes.fileTabs} /> */}
      <Editor
        height="calc(100% - 8.5rem)"
        language="javascript"
        theme={theme.theme === "dark" ? "vs-dark" : "vs-light"}
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
        onChange={(value) => updateCode(value || "")}
      />
    </>
  );
}

export const MonacoEditor = forwardRef(MonacoEditorWithRef);
