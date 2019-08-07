// @flow strict
import * as React from "react";
import styled from "styled-components";

import type { ThemeProps } from "../../../../records/Theme";
import { themeDefault } from "../../../../records/Theme";

type Props = {|
  +color: string,
  +width: string,
|};

const Wrapper = styled.div`
  width: 200px;
`;

const ProgressContainer = styled.div`
  border-radius: ${({ theme }: ThemeProps) => theme.orbit.borderRadiusBadge};
  background: ${({ theme }: ThemeProps) => theme.orbit.backgroundBody};
  box-shadow: ${({ theme }: ThemeProps) =>
    `inset 0 1px 2px ${theme.orbit.backgroundBody}, 0 1px ${theme.orbit.paletteCloudNormal}`};
`;

const ProgressBar = styled.div`
  height: ${({ theme }: ThemeProps) => theme.orbit.spaceXXSmall};
  border-radius: ${({ theme }: ThemeProps) => theme.orbit.borderRadiusBadge};
  background-color: ${({ color }) => color};
  width: ${({ width }) => width};
  transition: width 0.5s;
`;

ProgressContainer.defaultProps = {
  theme: themeDefault,
};

ProgressBar.defaultProps = {
  theme: themeDefault,
};

const PasswordStrengthBar = (props: Props) => {
  return (
    <Wrapper>
      <ProgressContainer>
        <ProgressBar data-test="MagicLogin-PasswordStrengthBar" {...props} />
      </ProgressContainer>
    </Wrapper>
  );
};

export default PasswordStrengthBar;
