import Editor from "@monaco-editor/react";
import { useTheme } from "next-themes";
import {
  useActiveCode,
  FileTabs,
  useSandpack,
} from "@codesandbox/sandpack-react/unstyled";
import classes from "./editor.module.scss";

export function MonacoEditor() {
  const theme = useTheme();
  const { sandpack } = useSandpack();
  const { code, updateCode } = useActiveCode();

  return (
    <>
      <FileTabs closableTabs={true} className={classes.fileTabs} />
      <Editor
        height="calc(100% - 7.6rem)"
        language="javascript"
        theme={theme.theme === "dark" ? "vs-dark" : "vs-light"}
        options={{
          minimap: {
            enabled: false,
          },
        }}
        key={sandpack.activeFile}
        defaultValue={code}
        onChange={(value) => updateCode(value || "")}
      />
    </>
  );
}
