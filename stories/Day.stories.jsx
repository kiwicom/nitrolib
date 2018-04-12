import React from "react";
import { storiesOf } from "@storybook/react";

import Day from "client/components/Day";

storiesOf("Day", module).add("a day", () => <Day date={new Date(Date.UTC(2018, 9, 28))} />);
