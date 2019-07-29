import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withInfo } from "@storybook/addon-info";
import { text, boolean } from "@storybook/addon-knobs/react";
import Airplane from "@kiwicom/orbit-components/lib/icons/Airplane";

import IconText from "../src/components/IconText";
import InputText from "../src/components/InputText";
import withData from "./decorators/withData";

const GROUP_ID = "Component";

storiesOf("InputText", module)
  .addDecorator(withInfo({ inline: true }))
  .addDecorator(withData)
  .add("default", () => (
    <InputText
      id="test"
      value={text("Value", , GROUP_ID)}
      onChange={action("On change")}
      onFocus={action("On focus")}
      onBlur={action("On blur")}
      onError={action("On error")}
      placeholder={text("Placeholder", "Gib text", GROUP_ID)}
      error={text("Error", , GROUP_ID)}
      showState={boolean("Show state", false, GROUP_ID)}
    />
  ))
  .add("with label", () => (
    <>
      <IconText icon={<Airplane />}>{text("Label", "Label", GROUP_ID)}</IconText>
      <InputText
        id="test"
        value={text("Value", , GROUP_ID)}
        onChange={action("On change")}
        onFocus={action("On focus")}
        onBlur={action("On blur")}
        onError={action("On error")}
        onHint={action("On hint")}
        placeholder={text("Placeholder", "Gib text", GROUP_ID)}
        error={text("Error", , GROUP_ID)}
        showState={boolean("Show state", false, GROUP_ID)}
      />
    </>
  ))
  .add("numbers only", () => (
    <InputText
      id="test"
      value={text("Value", , GROUP_ID)}
      onChange={action("On change")}
      onFocus={action("On focus")}
      onBlur={action("On blur")}
      onError={action("On error")}
      normalize={val => val.replace(/[^0-9]+/g, )}
      placeholder={text("Placeholder", "Gib text", GROUP_ID)}
      error={text("Error", , GROUP_ID)}
      showState={boolean("Show state", false, GROUP_ID)}
    />
  ))
  .add("longer than 5", () => (
    <InputText
      id="test"
      value={text("Value", , GROUP_ID)}
      onChange={action("On change")}
      onFocus={action("On focus")}
      onBlur={action("On blur")}
      onError={action("On error")}
      validate={val => (val.length > 5 ?  : "Too short")}
      placeholder={text("Placeholder", "Gib text", GROUP_ID)}
      error={text("Error", , GROUP_ID)}
      showState={boolean("Show state", false, GROUP_ID)}
    />
  ))
  .add("with email hint", () => (
    <InputText
      id="test"
      value={text("Value", , GROUP_ID)}
      onChange={action("On change")}
      onFocus={action("On focus")}
      onBlur={action("On blur")}
      onError={action("On error")}
      corrector={() => "lol@kek.bur"}
      placeholder={text("Placeholder", "Gib text", GROUP_ID)}
      error={text("Error", , GROUP_ID)}
      showState={boolean("Show state", false, GROUP_ID)}
    />
  ));
