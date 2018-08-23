// @flow strict
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { select } from "@storybook/addon-knobs";

import NavBar from "../src/components/NavBar";
import HeaderLinks from "../src/components/HeaderLinks";
import withData from "./decorators/withData";

const providers = ["none", "lastminute", "holidays"];

const GROUP_ID = "Navbar";

storiesOf("NavBar", module)
  .addDecorator(withData)
  .add("default", () => (
    <NavBar
      chat={<h1>Chat</h1>}
      subscription={<h1>Subscription</h1>}
      debug={<h1>Debug</h1>}
      onSaveLanguage={action("Save language")}
      onSaveToken={action("Save token")}
      headerLinks={<HeaderLinks provider={select("Provider", providers, "none", GROUP_ID)} />}
    />
  ));
