import * as React from "react";
import { storiesOf } from "@storybook/react";
import Airplane from "@kiwicom/orbit-components/lib/icons/Airplane";

import SectionHeading from "../src/components/TravelInfo/components/SectionHeading";
import withData from "./decorators/withData";

storiesOf("SectionHeading", module)
  .addDecorator(withData)
  .add("default", () => <SectionHeading t="common.ok" icon={<Airplane />} />);
