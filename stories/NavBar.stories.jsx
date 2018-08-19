// @flow strict
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withKnobs } from "@storybook/addon-knobs/react";

import NavBar from "../src/components/NavBar";

storiesOf("NavBar", module)
  .addDecorator(withKnobs)
  .add("default", () => (
    <>
      <div id="sidenav" />
      <div id="modal" />
      <NavBar
        onOpenChat={action("onOpenChat")}
        onOpenSubscription={action("onOpenSubscription")}
        onSaveLanguage={action("onSaveLanguage")}
        onSaveToken={action("onSaveToken")}
      />
    </>
  ));
