// @flow strict
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withKnobs, select } from "@storybook/addon-knobs";

import MagicLogin from "../src/components/MagicLogin";
import withData from "./decorators/withData";

const type = {
  mmb: "mmb",
  help: "help",
  refer: "refer",
};

const GROUP_ID = "Component";

storiesOf("MagicLogin", module)
  .addDecorator(withKnobs)
  .addDecorator(withData)
  .add("intro", () => (
    <MagicLogin
      initialScreen="intro"
      type={select("Type", type, "mmb", GROUP_ID)}
      onClose={action("Close")}
      onSignIn={action("Sign in")}
      onSocialLogin={action("Social login")}
    />
  ))
  .add("sign up", () => (
    <MagicLogin
      initialScreen="signUp"
      type={select("Type", type, "mmb", GROUP_ID)}
      onClose={action("Close")}
      onSignIn={action("Sign in")}
      onSocialLogin={action("Social login")}
    />
  ));
