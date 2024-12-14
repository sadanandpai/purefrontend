"use client";

import { Fragment, useState } from "react";
import { Flex } from "@radix-ui/themes";
import classes from "./feature-items.module.scss";

interface Props {
  listItems: string[];
}

export const FeatureItems = ({ listItems }: Props) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <Flex direction="column" gap="5">
      {listItems.map((item, index) => (
        <Fragment key={index}>
          <p
            className={`${classes.contentTitle} ${
              activeIndex === index ? classes.active : ""
            }`}
            role="button"
            key={index}
            onClick={() => setActiveIndex(index)}
          >
            {item} &gt;
          </p>
          <hr
            style={{
              borderTop: "0.5px solid #C0D1CA80",
            }}
          />
        </Fragment>
      ))}
    </Flex>
  );
};
