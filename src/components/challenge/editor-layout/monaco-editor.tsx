import Editor from "@monaco-editor/react";
import {
  useActiveCode,
  FileTabs,
  useSandpack,
} from "@codesandbox/sandpack-react";

export function MonacoEditor() {
  const { sandpack } = useSandpack();
  const { code, updateCode } = useActiveCode();

  return (
    <>
      <FileTabs />
      <Editor
        height="calc(100% - 7.2rem)"
        language="javascript"
        theme="vs-light"
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
