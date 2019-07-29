import styled from "styled-components";

import { ThemeProps } from "../../../../../records/Theme";
import { themeDefault } from "../../../../../records/Theme";

const ItemWrapper = styled.div`
  display: flex;
  background: ${({ theme }: ThemeProps) => theme.orbit.paletteWhite};
  box-shadow: inset 0 -1px ${({ theme }: ThemeProps) => theme.orbit.paletteCloudNormal};
  font-weight: ${({ theme }: ThemeProps) => theme.orbit.fontWeightMedium};
  cursor: pointer;
  &:hover {
    background: ${({ theme }: ThemeProps) => theme.orbit.paletteCloudLight};
  }
`;

ItemWrapper.defaultProps = {
  theme: themeDefault,
};

export default ItemWrapper;
