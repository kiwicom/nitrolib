// @flow strict
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import * as R from "ramda";

import Language from "../src/components/Language";
import withData from "./decorators/withData";
import languages from "./fixtures/languages";

storiesOf("Language", module)
  .addDecorator(withData)
  .add("regular", () => <Language onChange={action("Change")} onLog={action("Log")} />)
  .add("flat", () => <Language onChange={action("Change")} onLog={action("Log")} flat />)
  .add("native", () => (
    <Language
      onChange={action("Change")}
      favorite={R.values(R.pick(["en", "cz", "sk"])(languages))}
      onLog={action("Log")}
      native
    />
  ));
