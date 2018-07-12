// @flow strict
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, select, text } from "@storybook/addon-knobs/react";

import Tooltip from "../src/components/Tooltip";

const positions = {
  left: "Left",
  right: "Right",
  top: "Top",
  bottom: "Bottom",
};

const wrapperStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

const tipStyle = {
  display: "flex",
  alignItems: "center",
  whiteSpace: "nowrap",
};

const defaultTipContent = `<span>Tooltip message</span>&nbsp;
<img src="/images/flags/spFlag-cz.png" alt="flag" />`;

const defaultTargetContent = `Hover<br />me!`;

storiesOf("Tooltip", module)
  .addDecorator(withKnobs)
  .add("default", () => (
    <div style={wrapperStyle}>
      <Tooltip
        position={select("Tip position", positions, "right")}
        tip={
          <span
            style={tipStyle}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: text("Tip content", defaultTipContent),
            }}
          />
        }
      >
        <span
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: text("Target content", defaultTargetContent),
          }}
        />
      </Tooltip>
    </div>
  ));
