
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import withData from "./decorators/withData";
import DateInput from "../src/components/DateInput";

storiesOf("DateInput", module)
  .addDecorator(withData)
  .add("default", () => (
    <DateInput label="Departure date" value={null} error onChange={action("onChange")} />
));
