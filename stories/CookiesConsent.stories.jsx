// @flow strict
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withKnobs, boolean } from "@storybook/addon-knobs/react";

import CookiesConsent from "../src/components/CookiesConsent";

storiesOf("CookiesConsent", module)
  .addDecorator(withKnobs)
  .add("default", () => (
    <>
      <div id="modal" />
      <CookiesConsent accepted={boolean("Accepted", false)} onAccept={action("onAccept")} />
    </>
  ));
