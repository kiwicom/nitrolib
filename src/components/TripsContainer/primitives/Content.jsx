// @flow strict
import styled from "styled-components";

import { themeDefault } from "../../../records/Theme";
import type { ThemeProps } from "../../../records/Theme";

type AllProps = ThemeProps & {
  padding: boolean,
};

const Content = styled.div`
  padding: ${({ padding, theme }: AllProps) => (padding ? theme.orbit.spaceSmall : `0`)};
`;

Content.defaultProps = {
  theme: themeDefault,
};

export default Content;
