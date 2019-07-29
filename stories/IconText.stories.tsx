import React from "react";
import { storiesOf } from "@storybook/react";
import { text } from "@storybook/addon-knobs/react";
import Airplane from "@kiwicom/orbit-components/lib/icons/Airplane";

import IconText from "../src/components/IconText";
import withData from "./decorators/withData";

const GROUP_ID = "Component";

storiesOf("IconText", module)
  .addDecorator(withData)
  .add("basic", () => <IconText icon={<Airplane />}>{text("Text", "Label", GROUP_ID)}</IconText>);
