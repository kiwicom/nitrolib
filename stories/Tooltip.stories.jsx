// @flow strict
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { select, text, boolean, number } from "@storybook/addon-knobs/react";

import Tooltip from "../src/components/Tooltip";
import withData from "./decorators/withData";

const GROUP_ID = "Component";

const positions = {
  left: "left",
  right: "right",
  top: "top",
  bottom: "bottom",
};

const wrapperStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

const tipStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  whiteSpace: "nowrap",
};

const defaultTipContent = `<span>Tooltip message</span>&nbsp;
<img src="/images/flags/spFlag-cz.png" alt="flag" />`;

const defaultTargetContent = `Hover<br />me!`;

storiesOf("Tooltip", module)
  .addDecorator(withData)
  .add(
    "default",
    () => (
      <div style={wrapperStyle}>
        <Tooltip
          disabled={boolean("Disabled", false, GROUP_ID)}
          alwaysOn={boolean("Always ON", true, GROUP_ID)}
          color={text("Tip BG color", "", GROUP_ID)}
          position={select("Tip position", positions, "right", GROUP_ID)}
          moveContent={number(
            "Move content",
            0,
            {
              range: true,
              min: -50,
              max: 50,
              step: 1,
            },
            GROUP_ID,
          )}
          moveArrow={number(
            "Content arrow",
            0,
            {
              range: true,
              min: -50,
              max: 50,
              step: 1,
            },
            GROUP_ID,
          )}
          tip={
            <span
              style={tipStyle}
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: text("Tip content", defaultTipContent, GROUP_ID),
              }}
            />
          }
        >
          <span
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: text("Target content", defaultTargetContent, GROUP_ID),
            }}
            // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex, jsx-a11y/tabindex-no-positive
            tabIndex={1}
          />
        </Tooltip>
      </div>
    ),
    { knobs: { escapeHTML: false } },
  );
