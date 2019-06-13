// @flow strict
import * as React from "react";
import styled, { css } from "styled-components";
import BaggagePersonalItemNone from "@kiwicom/orbit-components/lib/icons/BaggagePersonalItemNone";
import Text from "@kiwicom/orbit-components/lib/Text";
import TextLink from "@kiwicom/orbit-components/lib/TextLink";
import mq from "@kiwicom/orbit-components/lib/utils/mediaQuery";
import { right } from "@kiwicom/orbit-components/lib/utils/rtl";

import BaggageItem from "../BaggageItem";
import type { TileDefinition, OrderStatusType } from "../../../../records/Baggage";
import { themeDefault } from "../../../../records/Theme";
import type { ThemeProps } from "../../../../records/Theme";
import Translate from "../../../Translate";
import TranslateRef from "../../../TranslateRef";

type Props = {|
  definitions: TileDefinition[],
  orderStatus: ?OrderStatusType,
  supportLinkHandler?: () => void,
|};

const Wrapper = styled.div`
  padding: 8px 0px 0px 28px;
  > div {
    margin-bottom: ${({ theme }): ThemeProps => theme.orbit.spaceXXXSmall};
  }
  ${mq.largeMobile(css`
    padding-top: ${({ theme }): ThemeProps => theme.orbit.spaceMedium};
  `)};
`;

Wrapper.defaultProps = {
  theme: themeDefault,
};

const ContactUsText = styled.p`
  color: ${({ theme }): ThemeProps => theme.orbit.colorTextPrimary};
  font-size: ${({ theme }) => theme.orbit.fontSizeTextNormal};
  font-weight: ${({ theme }) => theme.orbit.fontWeightMedium};
  font-family: ${({ theme }): ThemeProps => theme.orbit.fontFamily};
  margin-${/* sc-custom "right" */ right}: ${({ theme }): ThemeProps => theme.orbit.spaceMedium};
  a {
    color: ${({ theme }) => theme.orbit.colorTextLinkPrimaryHover};

    &:hover {
      color: ${({ theme }): ThemeProps => theme.orbit.colorTextPrimary};
    }
  }
`;

ContactUsText.defaultProps = {
  theme: themeDefault,
};

const NoPersonalItemWrapper = styled.div`
  svg {
    margin-${/* sc-custom "right" */ right}: ${({ theme }): ThemeProps => theme.orbit.spaceXSmall};
  }
`;

NoPersonalItemWrapper.defaultProps = {
  theme: themeDefault,
};

const Content = ({ definitions, orderStatus, supportLinkHandler }: Props) => {
  const hasPersonalItem = definitions.some(bag => bag.category === "personalItem");
  return (
    <Wrapper data-test="CustomerBaggageTile-Content">
      {definitions &&
        definitions.map((bag, index) => (
          <BaggageItem
            key={index} // eslint-disable-line
            restrictions={bag.restrictions}
            category={bag.category}
            isCurrent={bag.isCurrent}
            orderStatus={orderStatus}
          />
        ))}
      {!hasPersonalItem && definitions.length > 0 && (
        <NoPersonalItemWrapper>
          <Text element="span" type="secondary">
            <BaggagePersonalItemNone size="small" />
            <Translate t="baggage_modal.select.no_personal_item" />
          </Text>
        </NoPersonalItemWrapper>
      )}
      {definitions.length === 0 && (
        <Text element="span" type="secondary">
          <Translate t="baggage_modal.select.no_baggage" />
        </Text>
      )}
      {orderStatus === "notAvailable" && supportLinkHandler && (
        <ContactUsText data-test="CustomerBaggageTile-ContactUsText">
          <TranslateRef
            t="baggage_modal.contact_support"
            render={text => <TextLink onClick={supportLinkHandler}>{text}</TextLink>}
          />
        </ContactUsText>
      )}
    </Wrapper>
  );
};

export default Content;
