// @flow strict
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withKnobs, text, boolean } from "@storybook/addon-knobs/react";
import Close from "react-icons/lib/md/close";

import IconText from "client/public/components/IconText";
import InputText from "client/public/components/InputText";

storiesOf("InputText", module)
  .addDecorator(withKnobs)
  .add("default", () => (
    <InputText
      id="test"
      value={text("Value", "")}
      onChange={action("On change")}
      onFocus={action("On focus")}
      onBlur={action("On blur")}
      placeholder={text("Placeholder", "Gib text")}
      error={text("Error", "")}
      showState={boolean("Show state", false)}
    />
  ))
  .add("with label", () => (
    <>
      <IconText Icon={Close}>{text("Label", "Label")}</IconText>
      <InputText
        id="test"
        value={text("Value", "")}
        onChange={action("On change")}
        onFocus={action("On focus")}
        onBlur={action("On blur")}
        placeholder={text("Placeholder", "Gib text")}
        error={text("Error", "")}
        showState={boolean("Show state", false)}
      />
    </>
  ))
  .add("numbers only", () => (
    <InputText
      id="test"
      value={text("Value", "")}
      onChange={action("On change")}
      onFocus={action("On focus")}
      onBlur={action("On blur")}
      normalize={val => val.replace(/[^0-9]+/g, "")}
      placeholder={text("Placeholder", "Gib text")}
      error={text("Error", "")}
      showState={boolean("Show state", false)}
    />
  ));
