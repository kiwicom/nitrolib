// @flow strict
import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text } from "@storybook/addon-knobs/react";
import { MdClose } from "react-icons/md/index";

import IconText from "../src/components/IconText";

storiesOf("IconText", module)
  .addDecorator(withKnobs)
  .add("basic", () => <IconText Icon={MdClose}>{text("Text", "Label")}</IconText>);
