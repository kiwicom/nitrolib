
import * as React from "react";
import styled from "styled-components";

import { ThemeProps } from "../../../../../../records/Theme";
import { themeDefault } from "../../../../../../records/Theme";
import Button from "../../../../../Button";
import { Consumer as AuthConsumer } from "../../../../../../services/auth/context";

const BottomWrapper = styled.div`
  background: ${({ theme }: ThemeProps) => theme.orbit.paletteWhite};
  box-shadow: inset 0 -1px ${({ theme }: ThemeProps) => theme.orbit.paletteCloudNormal};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }: ThemeProps) => theme.orbit.spaceSmall};
`;

BottomWrapper.defaultProps = {
  theme: themeDefault,
};

const SingleTripBottom = () => (
  <AuthConsumer>
    {({ onSignOut }) => (
      <BottomWrapper>
        <Button block type="secondary" onClick={onSignOut} t="account.log_out" />
      </BottomWrapper>
    )}
  </AuthConsumer>
);

export default SingleTripBottom;
