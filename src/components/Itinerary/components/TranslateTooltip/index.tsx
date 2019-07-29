import * as React from "react";
import ToolTip from "@kiwicom/orbit-components/lib/Tooltip";
import styled from "styled-components";

import Translate from "../../../Translate";
import { themeDefault } from "../../../../records/Theme";
import { ThemeProps } from "../../../../records/Theme";

type Props = {
  returnTrip?: boolean,
  arrivalName: string,
  departureName: string,
  children: React.ReactNode,
  highlight: boolean,
};

const ColoredCode = styled.div`
  color: ${({ theme }: ThemeProps) => theme.orbit.paletteRedNormal};
  text-decoration: underline;
  &:hover {
    background: ${({ theme }: ThemeProps) => theme.orbit.paletteRedLightHover};
    border-radius: ${({ theme }: ThemeProps) => theme.orbit.borderRadiusNormal};
  }
`;

ColoredCode.defaultProps = {
  theme: themeDefault,
};

const TranslateTooltip = ({
  arrivalName,
  departureName,
  returnTrip,
  children,
  highlight,
}: Props) => {
  const options = {
    arrival: arrivalName,
    departure: departureName,
  };

  const translation = returnTrip ? (
    <Translate values={options} t="common.different_airport_return_first" />
  ) : (
    <Translate values={options} t="common.different_airport_return" />
  );

  return highlight ? (
    <ToolTip content={translation}>
      <ColoredCode>{children}</ColoredCode>
    </ToolTip>
  ) : (
    children
  );
};

export default TranslateTooltip;
