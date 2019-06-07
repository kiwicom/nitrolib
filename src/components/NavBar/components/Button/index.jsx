// @flow strict
import * as React from "react";

import { Consumer as IntlConsumer } from "../../../../services/intl/context";
import StyledButton from "../../primitives/Button";
import type { Color } from "../../primitives/Button";

type Props = {|
  ariaLabel?: string,
  onClick?: () => void,
  children: React.Node,
  color?: Color,
|};

const Button = ({ ariaLabel, children, onClick, color }: Props) => (
  <IntlConsumer>
    {intl => (
      <StyledButton
        onClick={onClick}
        color={color}
        aria-label={ariaLabel && intl.translate(ariaLabel)}
      >
        {children}
      </StyledButton>
    )}
  </IntlConsumer>
);

export default Button;
