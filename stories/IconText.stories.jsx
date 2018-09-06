// @flow strict
import React from "react";
import { storiesOf } from "@storybook/react";
import { text } from "@storybook/addon-knobs/react";
import MdClose from "react-icons/lib/md/close";

import IconText from "../src/components/IconText";
import withData from "./decorators/withData";

const GROUP_ID = "Component";

storiesOf("IconText", module)
  .addDecorator(withData)
  .add("basic", () => <IconText Icon={MdClose}>{text("Text", "Label", GROUP_ID)}</IconText>);
