// @flow strict
import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text } from "@storybook/addon-knobs/react";
import Close from "react-icons/lib/md/close";

import IconText from "client/public/components/IconText";

storiesOf("IconText", module)
  .addDecorator(withKnobs)
  .add("basic", () => <IconText Icon={Close}>{text("Text", "Label")}</IconText>);
