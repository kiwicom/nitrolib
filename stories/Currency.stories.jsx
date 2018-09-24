// @flow strict
import * as React from "react";
import styled from "styled-components";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Currency from "../src/components/Currency";
import * as rtl from "../src/styles/rtl";
import withData from "./decorators/withData";

const RegularWrap = styled.div`
  float: ${rtl.right};
  margin-${rtl.right}: 200px;
`;

storiesOf("Currency", module)
  .addDecorator(withData)
  .add("regular", () => (
    <RegularWrap>
      <Currency onLog={action("Log")} />
    </RegularWrap>
  ))
  .add("native", () => <Currency onLog={action("Log")} native />);
