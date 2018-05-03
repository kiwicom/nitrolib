// @flow strict
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withKnobs, text } from "@storybook/addon-knobs/react";
import Close from "react-icons/lib/md/close";

import InputText from "client/components/InputText";

storiesOf("InputText", module)
  .addDecorator(withKnobs)
  .add("basic", () => (
    <InputText
      id="basic"
      value={text("Value", "")}
      onChange={action("On change")}
      placeholder={text("Placeholder", "Gib text")}
    />
  ))
  .add("with all props", () => (
    <InputText
      id="handlers"
      value={text("Value", "")}
      onChange={action("On change")}
      onFocus={action("On focus")}
      onBlur={action("On blur")}
      placeholder={text("Placeholder", "Gib text")}
      error={text("Error", "")}
      label={
        <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
          <Close />
          <span>Label</span>
        </div>
      }
    />
  ))
  .add("numbers only", () => (
    <InputText
      id="basic"
      value={text("Value", "")}
      onChange={action("On change")}
      placeholder={text("Placeholder", "Gib text")}
      normalize={val => val.replace(/[^0-9]+/g, "")}
    />
  ));
