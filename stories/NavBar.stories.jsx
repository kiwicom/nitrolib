// @flow strict
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import NavBar from "../src/components/NavBar";
import withData from "./decorators/withData";

storiesOf("NavBar", module)
  .addDecorator(withData)
  .add("default", () => (
    <NavBar
      onOpenChat={action("Open chat")}
      onOpenSubscription={action("Open subscription")}
      onSaveLanguage={action("Save language")}
      onSaveToken={action("Save token")}
    />
  ));
