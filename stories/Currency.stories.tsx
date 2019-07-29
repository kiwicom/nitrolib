import * as React from "react";
import styled from "styled-components";
import { storiesOf } from "@storybook/react";
import { right } from "@kiwicom/orbit-components/lib/utils/rtl";

import Currency from "../src/components/Currency";
import withData from "./decorators/withData";

const RegularWrap = styled.div`
  float: ${right};
  margin-${right}: 200px;
`;

storiesOf("Currency", module)
  .addDecorator(withData)
  .add("regular", () => (
    <RegularWrap>
      <Currency />
    </RegularWrap>
  ))
  .add("native", () => <Currency native />);
