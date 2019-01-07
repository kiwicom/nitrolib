// @flow strict
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, select, text } from "@storybook/addon-knobs/react";
import Gps from "@kiwicom/orbit-components/lib/icons/Gps";
import Location from "@kiwicom/orbit-components/lib/icons/Location";
import * as Icons from "@kiwicom/orbit-components/lib/icons";

import SimplePlacePicker from "../src/components/SimplePlacePicker";

storiesOf("SimplePlacePicker", module)
  .addDecorator(withKnobs)
  .add("default", () => <SimplePlacePicker />)
  .add("From", () => <SimplePlacePicker label="From" icon={<Gps />} />)
  .add("To", () => <SimplePlacePicker label="To" icon={<Location />} />)
  .add("Playground", () => {
    const selectIcon = select("Icon", Object.keys(Icons), "Gps");
    const Icon = Icons[selectIcon];
    return <SimplePlacePicker icon={<Icon />} placeholder={text("placeholder", "placeholder")} />;
  });
