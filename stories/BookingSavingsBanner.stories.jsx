// @flow strict
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import BookingSavingsBanner from "../src/components/BookingSavingsBanner";

storiesOf("BookingSavingsBanner", module).add("default", () => (
  <BookingSavingsBanner
    amount={28.76}
    currency="€"
    hrefLearnMore="kiwi.com"
    onMoreTripsClick={action("onMoreTripsClick")}
  />
));
