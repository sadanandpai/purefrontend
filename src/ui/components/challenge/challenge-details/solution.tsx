import React from "react";
import { Highlight, themes } from "prism-react-renderer";
import classes from "./challenge-details.module.scss";

interface Props {
  code: string;
}

export function Solution({ code }: Props) {
  return (
    <div className={classes.solution}>
      <Highlight theme={themes.vsLight} code={code} language="js">
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <pre style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                <span className={classes.lineNumber}>{i + 1}</span>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
}
