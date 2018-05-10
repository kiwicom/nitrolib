// @flow strict
import * as React from "react";
import styled from "styled-components";

import { brandDefault } from "../../records/Brand";
import type { ThemeProps } from "../../records/Brand";

const Img = styled.img`
  margin-right: 4px;
  vertical-align: middle;
  height: 20px; // Default size
  filter: drop-shadow(
    0 0 0 ${({ theme }: ThemeProps) => theme.colors["grey-700"]}
  ); // Especially for flags with white background
`;

Img.defaultProps = {
  theme: brandDefault.theme,
};

type Props = {|
  country: string,
|};

const Flag = (props: Props) => (
  <Img
    className="Flag spFlag"
    src={`/images/flags/spFlag-${props.country}.png`}
    alt={props.country}
  />
);

export default Flag;
