import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import CookiesPopup from "../src/components/CookiesPopup";
import withData from "./decorators/withData";

storiesOf("CookiesPopup", module)
  .addDecorator(withData)
  .add("default", () => <CookiesPopup onAccept={action("onAccept")} />)
  .add("banner", () => <CookiesPopup onAccept={action("onAccept")} type="banner" />);
