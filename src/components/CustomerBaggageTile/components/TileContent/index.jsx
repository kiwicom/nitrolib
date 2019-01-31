// @flow
import * as React from "react";
import styled from "styled-components";
import BaggagePersonalItemNone from "@kiwicom/orbit-components/lib/icons/BaggagePersonalItemNone";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import Text from "@kiwicom/orbit-components/lib/Text";
import TextLink from "@kiwicom/orbit-components/lib/TextLink";

import BaggageItem from "../BaggageItem";
import { themeDefault } from "../../../../records/Theme";
import type { ThemeProps } from "../../../../records/Theme";
import Translate from "../../../Translate/index";

type Props = {
  handBags: {},
  holdBags: {},
  orderStatus: "unpaid" | "processing" | "notAvailable",
};

const Wrapper = styled.div`
  padding: 15px 0;
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
  font-family: ${({ theme }): ThemeProps => theme.orbit.fontFamily};
  margin-right: ${({ theme }): ThemeProps => theme.orbit.spaceMedium};
`;

ContactUsText.defaultProps = {
  theme: themeDefault,
};

const TileContent = ({ handBags, holdBags, orderStatus }: Props) => {
  const handBagsArr = Object.keys(handBags).map(key => ({ key, ...handBags[key] }));
  const holdBagsArr = Object.keys(holdBags).map(key => ({ key, ...holdBags[key] }));

  const hasPersonalItem = Boolean(handBagsArr.find(bag => bag.category === "personalItem"));

  return (
    <Wrapper>
      {!hasPersonalItem && (
        <Stack>
          <Text element="span" type="secondary">
            <BaggagePersonalItemNone size="small" />{" "}
            <Translate t="common.baggage.no_personal_item" />
          </Text>
        </Stack>
      )}
      {handBagsArr.map(bag => (
        <BaggageItem
          key={bag.key}
          amount={bag.amount}
          restrictions={bag.restrictions}
          category={bag.category}
        />
      ))}
      {holdBagsArr.map(bag => (
        <BaggageItem
          key={bag.key}
          amount={bag.amount}
          restrictions={bag.restrictions}
          category={bag.category}
        />
      ))}
      {orderStatus === "notAvailable" && (
        <ContactUsText>
          To add a baggage to your trip, please <TextLink>contact us</TextLink>
        </ContactUsText>
      )}
    </Wrapper>
  );
};

export default TileContent;
