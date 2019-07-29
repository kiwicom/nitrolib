import styled from "styled-components";

import { themeDefault } from "../../../records/Theme";
import { ThemeProps } from "../../../records/Theme";

type AllProps = {
  ...ThemeProps,
  padding: boolean,
};

const Content = styled.div`
  max-height: calc(100vh - 140px);
  padding: ${({ padding, theme }: AllProps) => (padding ? theme.orbit.spaceSmall : `0`)};
  overflow-y: auto;
  overflow-x: hidden;
`;

Content.defaultProps = {
  theme: themeDefault,
};

export default Content;
