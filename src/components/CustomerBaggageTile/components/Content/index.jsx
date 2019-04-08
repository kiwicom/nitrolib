// @flow strict
import * as React from "react";
import styled from "styled-components";
import BaggagePersonalItemNone from "@kiwicom/orbit-components/lib/icons/BaggagePersonalItemNone";
import Text from "@kiwicom/orbit-components/lib/Text";

import BaggageItem from "../BaggageItem";
import type {
  HoldBagTileDefinition,
  HandBagTileDefinition,
  OrderStatusType,
} from "../../../../records/Baggage";
import { themeDefault } from "../../../../records/Theme";
import type { ThemeProps } from "../../../../records/Theme";
import Translate from "../../../Translate/index";

type Props = {
  definitions: (HoldBagTileDefinition | HandBagTileDefinition)[],
  orderStatus: ?OrderStatusType,
};

const Wrapper = styled.div`
  padding: 17px 0px 17px 28px;
  > * {
    margin-bottom: ${({ theme }): ThemeProps => theme.orbit.spaceXXXSmall};
  }
`;
Wrapper.defaultProps = {
  theme: themeDefault,
};

const ContactUsText = styled.p`
  color: ${({ theme }): ThemeProps => theme.orbit.colorTextPrimary};
  font-size: ${({ theme }) => theme.orbit.fontSizeTextNormal};
  font-weight: ${({ theme }) => theme.orbit.fontWeightMedium};
  font-family: ${({ theme }): ThemeProps => theme.orbit.fontFamily};
  margin-right: ${({ theme }): ThemeProps => theme.orbit.spaceMedium};
  a {
    color: ${({ theme }) => theme.orbit.colorTextPrimary};

    &:hover {
      color: ${({ theme }) => theme.orbit.colorTextLinkPrimaryHover};
    }
  }
`;

ContactUsText.defaultProps = {
  theme: themeDefault,
};

const NoPersonalItemWrapper = styled.div`
  svg {
    margin-right: ${({ theme }): ThemeProps => theme.orbit.spaceXSmall};
  }
`;

NoPersonalItemWrapper.defaultProps = {
  theme: themeDefault,
};

const Content = ({ definitions, orderStatus }: Props) => {
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
      {!hasPersonalItem && (
        <NoPersonalItemWrapper>
          <Text element="span" type="secondary">
            <BaggagePersonalItemNone size="small" />
            <Translate t="baggage_modal.select.no_personal_item" />
          </Text>
        </NoPersonalItemWrapper>
      )}
      {orderStatus === "notAvailable" && (
        <ContactUsText data-test="CustomerBaggageTile-ContactUsText">
          <Translate t="baggage_modal.contact_support" values={{ link: "/support" }} html />
        </ContactUsText>
      )}
    </Wrapper>
  );
};

export default Content;
