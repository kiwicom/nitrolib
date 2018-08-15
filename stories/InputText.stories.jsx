// @flow strict
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withInfo } from "@storybook/addon-info";
import { withKnobs, text, boolean } from "@storybook/addon-knobs/react";
import MdClose from "react-icons/lib/md/close";

import IconText from "../src/components/IconText";
import InputText from "../src/components/InputText";

storiesOf("InputText", module)
  .addDecorator(withInfo({ inline: true }))
  .addDecorator(withKnobs)
  .add("default", () => (
    <InputText
      id="test"
      value={text("Value", "")}
      onChange={action("On change")}
      onFocus={action("On focus")}
      onBlur={action("On blur")}
      onError={action("On error")}
      placeholder={text("Placeholder", "Gib text")}
      error={text("Error", "")}
      showState={boolean("Show state", false)}
    />
  ))
  .add("with label", () => (
    <>
      <IconText Icon={MdClose}>{text("Label", "Label")}</IconText>
      <InputText
        id="test"
        value={text("Value", "")}
        onChange={action("On change")}
        onFocus={action("On focus")}
        onBlur={action("On blur")}
        onError={action("On error")}
        onHint={action("On hint")}
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
      onError={action("On error")}
      normalize={val => val.replace(/[^0-9]+/g, "")}
      placeholder={text("Placeholder", "Gib text")}
      error={text("Error", "")}
      showState={boolean("Show state", false)}
    />
  ))
  .add("longer than 5", () => (
    <InputText
      id="test"
      value={text("Value", "")}
      onChange={action("On change")}
      onFocus={action("On focus")}
      onBlur={action("On blur")}
      onError={action("On error")}
      validate={val => (val.length > 5 ? "" : "Too short")}
      placeholder={text("Placeholder", "Gib text")}
      error={text("Error", "")}
      showState={boolean("Show state", false)}
    />
  ))
  .add("with email hint", () => (
    <InputText
      id="test"
      value={text("Value", "")}
      onChange={action("On change")}
      onFocus={action("On focus")}
      onBlur={action("On blur")}
      onError={action("On error")}
      corrector={() => "lol@kek.bur"}
      placeholder={text("Placeholder", "Gib text")}
      error={text("Error", "")}
      showState={boolean("Show state", false)}
    />
  ));
