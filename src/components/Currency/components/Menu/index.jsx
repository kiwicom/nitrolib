// @flow strict
import * as React from "react";
import styled, { css } from "styled-components";
import { right, left } from "@kiwicom/orbit-components/lib/utils/rtl";
import mq from "@kiwicom/orbit-components/lib/utils/mediaQuery";

import type { Currency } from "../../../../records/Currency";
import { themeDefault } from "../../../../records/Theme";
import type { ThemeProps } from "../../../../records/Theme";
import * as MODALS from "../../../../consts/modals";
import type { Modal as ModalType } from "../../../../consts/modals";
import List from "../List/index";

const Container = styled.div`
  position: absolute;
  ${/* sc-custom "right" */ right}: 0;
  top: 50px;
  width: calc(100% - 40px);
  max-height: calc(100vh - 200px);
  margin: 0 20px;
  box-sizing: border-box;
  padding: 15px 12px;
  overflow-y: scroll;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.1);
  border-radius: ${({ theme }: ThemeProps) => theme.orbit.borderRadiusNormal};
  background: ${({ theme }: ThemeProps) => theme.orbit.paletteWhite};

  ${mq.largeMobile(css`
    width: 500px;
    padding: 20px;
    margin: 0;
    max-height: calc(100vh - 60px);
    overflow-y: auto;
    ${/* sc-custom "left" */ left}: inherit;
    ${/* sc-custom "right" */ right}: ${({ positionMenuTablet }) => positionMenuTablet}px;
  `)}

  ${mq.desktop(css`
    ${/* sc-custom "right" */ right}: ${({ positionMenuDesktop }) => positionMenuDesktop}px;
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
    ${/* sc-custom "left" */ left}: 0;
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
      <Container positionMenuDesktop={positionMenuDesktop} positionMenuTablet={positionMenuTablet}>
        {recommended.length > 0 && (
          <Recommended>
            <List list={recommended} active={current} onSetCurrency={onChange} />
          </Recommended>
        )}
        <List list={available} active={current} onSetCurrency={onChange} />
      </Container>
    );
  }
}

export default Menu;
