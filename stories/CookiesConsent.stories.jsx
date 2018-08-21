// @flow strict
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import CookiesConsent from "../src/components/CookiesConsent";
import withData from "./decorators/withData";

storiesOf("CookiesConsent", module)
  .addDecorator(withData)
  .add("default", () => <CookiesConsent onAccept={action("onAccept")} />);
