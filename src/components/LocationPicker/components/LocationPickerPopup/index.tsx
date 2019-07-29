

import styled from "styled-components";
import { Tokens } from "@kiwicom/orbit-design-tokens";

import { themeDefault } from "../../../../records/Theme";

export type Theme = {
  orbit: Tokens,
  rtl: boolean,
};

type Props = {
  theme: Theme,
  active: boolean,
};

const LocationPickerPopup = styled.div`
  position: absolute;
  z-index: 2;
  width: 100%;
  border-radius: 4px;
  padding: ${({ theme }: Props) => theme.orbit.spaceSmall};
  margin: -${({ theme }: Props) => theme.orbit.spaceSmall};
  background: ${({ theme }: Props) => theme.orbit.paletteWhite};

  ${({ active }: Props) =>
    active &&
    `
    box-shadow: 0 20px 60px 0 rgba(23, 27, 30, 0.4);
  `};
`;

LocationPickerPopup.defaultProps = {
  theme: themeDefault,
};

export default LocationPickerPopup;
