import Editor from "@monaco-editor/react";
import {
  useActiveCode,
  FileTabs,
  useSandpack,
} from "@codesandbox/sandpack-react/unstyled";
import { useTheme } from "next-themes";

export function MonacoEditor() {
  const { sandpack } = useSandpack();
  const { code, updateCode } = useActiveCode();
  const theme = useTheme();

  return (
    <>
      <FileTabs />
      <Editor
        height="calc(100% - 7.1rem)"
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
