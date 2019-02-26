// @flow

import * as React from "react";
import styled, { css } from "styled-components";
import { defaultTokens } from "@kiwicom/orbit-design-tokens";
import Text from "@kiwicom/orbit-components/lib/Text";

import { themeDefault } from "../../../../../../records/Theme";

const TRIANGLE_SIZE = 8;

type Props = {
  children: React.Node,
};

const Marker = styled.div`
  position: relative;
  white-space: nowrap;
  transform: translate(-50%, calc(-100% - ${TRIANGLE_SIZE / 2}px));
`;

const Label = styled.div`
  ${({ theme: { orbit } }) => css`
    padding: ${orbit.spaceXXSmall} ${orbit.spaceXSmall};
    border-radius: ${orbit.borderRadiusNormal};
    background: ${orbit.paletteProductNormal};
    box-shadow: ${orbit.boxShadowElevatedLevel1};
  `};
`;

Label.defaultProps = {
  theme: themeDefault,
};

const Triangle = styled.svg`
  position: absolute;
  left: calc(50% - ${TRIANGLE_SIZE / 2}px);
`;

const Pin = ({ children }: Props) => (
  <Marker>
    <Label>
      <Text type="white" element="div" size="small">
        {children}
      </Text>
    </Label>
    <Triangle width={TRIANGLE_SIZE} height={TRIANGLE_SIZE / 2} viewBox="0 0 8 4">
      <path d="M0,0H8L4,4z" fill={defaultTokens.paletteProductNormal} />
    </Triangle>
  </Marker>
);

export default Pin;
