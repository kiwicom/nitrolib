// @flow strict
import * as React from "react";
import styled from "styled-components";

import Text from "../Text";
import { brandDefault } from "../../records/Brand";
import mq from "../../styles/mediaQuery";
import type { ThemeProps } from "../../records/Brand";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding: 10px 20px;
  font-size: 12px;
  background: ${({ theme }: ThemeProps) => theme.colors["grey-900"]};
  color: white;
  opacity: 0.94;
  transition: bottom 0.25s ease-in;
  box-shadow: 0 -1px 6px 0 rgba(0, 0, 0, 0.2);

  ${mq.gtTablet`
    padding: 20px;
    color: ${({ theme }: ThemeProps) => theme.colors["grey-800"]};
    background: white;
  `};
`;

Container.defaultProps = {
  theme: brandDefault.theme,
};

const Message = styled.p`
  opacity: 0.5;

  ${mq.gtTablet`
    opacity: 1;
  `};
`;

const InfoLink = styled.a`
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    color: white;
    opacity: 1;
  }

  ${mq.gtTablet`
    &:hover {
      color: initial;
    }
  `};
`;

const AcceptButton = styled.a`
  padding: 10px 10px 10px 20px;
  font-weight: bold;
  white-space: nowrap;
  cursor: pointer;
`;

type Props = {|
  onShowInfo: () => void,
  onAccept: () => void,
|};

const CookiesBanner = ({ onShowInfo, onAccept }: Props) => (
  <Container>
    <Message>
      <Text t={__("content.cookies.popup.full")} />{" "}
      <InfoLink onClick={onShowInfo}>
        <Text t={__("common.learn_more")} />
      </InfoLink>.
    </Message>
    <AcceptButton onClick={onAccept}>
      <Text t={__("common.got_it")} />
    </AcceptButton>
  </Container>
);

export default CookiesBanner;
