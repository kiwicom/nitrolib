// @flow strict
import * as React from "react";
import styled from "styled-components";

import * as rtl from "../../styles/rtl";
import { themeDefault } from "../../records/Theme";
import type { ThemeProps } from "../../records/Theme";

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

Container.defaultProps = {
  theme: themeDefault,
};

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-${rtl.right}: 10px;
`;

const Text = styled.span`
  font-size: ${({ theme }: ThemeProps) => theme.orbit.fontSizeTextNormal};
  height: 24px;
  line-height: 24px;
  white-space: nowrap;
`;

Text.defaultProps = {
  theme: themeDefault,
};

type Props = {|
  icon: React.Node,
  children: React.Node,
|};

const IconText = ({ icon, children }: Props) => (
  <Container>
    <IconWrapper>{icon}</IconWrapper>
    <Text>{children}</Text>
  </Container>
);

export default IconText;
