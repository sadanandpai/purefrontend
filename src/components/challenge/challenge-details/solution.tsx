import React from "react";
import { Highlight, themes } from "prism-react-renderer";

interface Props {
  code: string;
}

export function Solution({ code }: Props) {
  return (
    <>
      <Highlight theme={themes.vsLight} code={code} language="js">
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <pre style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                <span className="mx-4" style={{ userSelect: "none" }}>
                  {i + 1}
                </span>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </>
  );
}
