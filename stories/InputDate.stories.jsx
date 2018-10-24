// @flow strict
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { date } from "@storybook/addon-knobs/react";

import { Consumer as IntlConsumer } from "../src/services/intl/context";
import InputDate from "../src/components/InputDate";
import parseDateFormat from "../src/components/InputDate/services/parseDateFormat";
import withData from "./decorators/withData";

const GROUP_ID = "Component";

const now = new Date();

storiesOf("InputDate", module)
  .addDecorator(withData)
  .add("default", () => (
    <IntlConsumer>
      {({ language }) => (
        <InputDate
          id="default"
          value={date("Value", now, GROUP_ID)}
          onChange={action("Change")}
          min={date("Min", new Date(Date.UTC(1950, 0)), GROUP_ID)}
          max={date("Max", new Date(Date.UTC(2050, 0)), GROUP_ID)}
          format={parseDateFormat(language.dateFormatLong)}
        />
      )}
    </IntlConsumer>
  ));
