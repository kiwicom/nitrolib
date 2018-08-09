// @flow strict
import * as React from "react";
import * as R from "ramda";
import styled, { css } from "styled-components";

import type { Currency } from "../../../records/Currency";
import mq from "../../../styles/mediaQuery";
import { themeDefault } from "../../../records/Theme";
import type { ThemeProps } from "../../../records/Theme";
import CurrencyList from "./CurrencyList";

type Props = {|
  current: Currency,
  available: Currency[],
  recommended: Currency[],
  onSetCurrency: (code: string) => void,
|};

const Container = styled.div`
  position: absolute;
  right: 0;
  width: calc(100% - 40px);
  max-height: calc(100vh - 200px);
  margin: 0 20px;
  box-sizing: border-box;
  padding: 15px 12px;
  overflow-y: scroll;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, .1);
  border-radius: 3px;
  background: ${({ theme }: ThemeProps) => theme.orbit.paletteWhite};
  color: ${({ theme }: ThemeProps) => theme.orbit.paletteInkNormal};

  ${mq.gtTablet(css`
    width: 500px;
    padding: 20px;
    margin: 0;
    max-height: calc(100vh - 60px);
    overflow-y: auto;
  `)}

  ${mq.tablet(css`
    right: 0; /* TODO: RTL */
    left: inherit; /* TODO: RTL */
  `)}

  ${mq.gtDesktop(css`
    left: -290px; /* TODO: RTL */
    right: inherit; /* TODO: RTL */
  `)}
`;

Container.defaultProps = {
  theme: themeDefault,
};

const Recommended = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 13px;
  margin-bottom: 12px;

  &:after {
    position: absolute;
    bottom: 0;
    left: 0;
    display: block;
    content: "";
    width: calc(100% - 10px);
    height: 1px;
    margin: 0 5px;
    background: ${({ theme }: ThemeProps) => theme.orbit.paletteCloudNormal};
  }
`;

Recommended.defaultProps = {
  theme: themeDefault,
};

const Menu = ({ current, available, recommended, onSetCurrency }: Props) => (
  <Container>
    {!R.isEmpty(recommended) && (
      <Recommended>
        <CurrencyList list={recommended} active={current} onSetCurrency={onSetCurrency} />
      </Recommended>
    )}
    <CurrencyList list={available} active={current} onSetCurrency={onSetCurrency} />
  </Container>
);

export default Menu;
