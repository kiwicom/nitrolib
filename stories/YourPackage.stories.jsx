// @flow strict
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { select, text } from "@storybook/addon-knobs/react";

import YourPackage from "../src/components/holidays/YourPackage";

storiesOf("YourPackage", module).add("default", () => <YourPackage />);
