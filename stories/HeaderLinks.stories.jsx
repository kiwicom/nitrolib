// @flow strict
import * as React from "react";
import { storiesOf } from "@storybook/react";
// import { boolean } from "@storybook/addon-knobs/react";

import HeaderLinks from "../src/components/HeaderLinks";
import withData from "./decorators/withData";

// const GROUP_ID = "custom";

const headerLinksProps = {
  searchParams: {
    language: "en",
  },
  urlParam: "search",
  readyUrls: {
    rooms: {
      query: "query",
      base: "base",
    },
  },
  hiddenUrls: {
    holidays: false,
    logitravel: true,
  },
};

storiesOf("HeaderLinks", module)
  .addDecorator(withData)
  .add("default", () => <HeaderLinks {...headerLinksProps} />);
