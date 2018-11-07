// @flow strict
import * as React from "react";
import * as R from "ramda";
import styled, { css } from "styled-components";

import type { Currency } from "../../../records/Currency";
import mq from "../../../styles/mq";
import * as rtl from "../../../styles/rtl";
import { themeDefault } from "../../../records/Theme";
import type { ThemeProps } from "../../../records/Theme";
import * as MODALS from "../../../consts/modals";
import type { Modal as ModalType } from "../../../consts/modals";
import CurrencyList from "./CurrencyList";

const Container = styled.div`
  position: absolute;
  ${rtl.right}: 0;
  top: 50px;
  width: calc(100% - 40px);
  max-height: calc(100vh - 200px);
  margin: 0 20px;
  box-sizing: border-box;
  padding: 15px 12px;
  overflow-y: scroll;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, .1);
  border-radius: ${({ theme }: ThemeProps) => theme.orbit.borderRadiusNormal};
  background: ${({ theme }: ThemeProps) => theme.orbit.paletteWhite};

  ${mq.gtTablet(css`
    width: 500px;
    padding: 20px;
    margin: 0;
    max-height: calc(100vh - 60px);
    overflow-y: auto;
  `)}

  ${mq.tablet(css`
    ${rtl.right}: ${({ positionMenuTablet }) => positionMenuTablet}px;
    ${rtl.left}: inherit;
  `)}

  ${mq.gtDesktop(css`
    ${rtl.left}: inherit;
    ${rtl.right}: ${({ positionMenuDesktop }) => positionMenuDesktop}px;
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
    ${rtl.left}: 0;
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

type Props = {|
  current: Currency,
  available: Currency[],
  recommended: Currency[],
  onChange: (code: string) => void,
  positionMenuTablet?: number,
  positionMenuDesktop?: number,
  onSetModal?: (modal: ModalType) => void,
|};

class Menu extends React.Component<Props> {
  componentDidMount() {
    const { onSetModal } = this.props;
    if (onSetModal) {
      onSetModal(MODALS.CURRENCY_MENU);
    }
  }

  componentWillUnmount() {
    const { onSetModal } = this.props;
    if (onSetModal) {
      onSetModal(MODALS.NONE);
    }
  }

  render() {
    const {
      current,
      available,
      recommended,
      onChange,
      positionMenuDesktop,
      positionMenuTablet,
    } = this.props;
    return (
      <Container
        positionMenuDesktop={positionMenuDesktop}
        positionMenuTablet={positionMenuTablet}
        data-test="CurrencySwitcher-List"
      >
        {!R.isEmpty(recommended) && (
          <Recommended>
            <CurrencyList list={recommended} active={current} onSetCurrency={onChange} />
          </Recommended>
        )}
        <CurrencyList list={available} active={current} onSetCurrency={onChange} />
      </Container>
    );
  }
}

export default Menu;
