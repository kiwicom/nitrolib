// @flow strict
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import * as R from "ramda";

import Language from "../src/components/Language";
import withData from "./decorators/withData";
import languages from "./fixtures/languages";

const infoToLang = R.map(info => ({
  id: info.id,
  name: info.name,
  flag: info.flag,
  defaultCountry: info.defaultCountry,
  continent: "",
}));

storiesOf("Language", module)
  .addDecorator(withData)
  .add("regular", () => <Language onChange={action("Change")} />)
  .add("flat", () => <Language onChange={action("Change")} flat />)
  .add("native", () => (
    <Language
      onChange={action("Change")}
      favorite={infoToLang(R.values(R.pick(["en", "cz", "sk"], languages)))}
      native
    />
  ))
  .add("native - hidden text", () => (
    <Language
      onChange={action("Change")}
      favorite={infoToLang(R.values(R.pick(["en", "cz", "sk"], languages)))}
      hideNativeText
      native
    />
  ));
