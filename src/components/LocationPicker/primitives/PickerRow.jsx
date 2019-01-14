// @flow
import styled from "styled-components";

import type { ThemeProps } from "../../../records/Theme";
import { themeDefault } from "../../../records/Theme";

type SelectedProp = ThemeProps & { selected: boolean };

const PickerRow = styled.div`
  padding: ${({ theme }: ThemeProps) => theme.orbit.spaceSmall};
  background: ${({ theme, selected }: SelectedProp) =>
    selected ? theme.orbit.paletteCloudLightHover : theme.orbit.paletteWhite};
  cursor: pointer;
  box-shadow: 0 1px 0 ${({ theme }: ThemeProps) => theme.orbit.paletteCloudLightHover};
`;

PickerRow.defaultProps = {
  theme: themeDefault,
};

export default PickerRow;
