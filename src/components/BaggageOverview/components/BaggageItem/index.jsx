// @flow strict
import * as React from "react";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import Text from "@kiwicom/orbit-components/lib/Text";
import TextLink from "@kiwicom/orbit-components/lib/TextLink";
import styled, { css } from "styled-components";
import AccountCircle from "@kiwicom/orbit-components/lib/icons/AccountCircle";
import mq from "@kiwicom/orbit-components/lib/utils/mediaQuery";

import Translate from "../../../Translate";
import { themeDefault } from "../../../../records/Theme";
import type { ThemeProps } from "../../../../records/Theme";
import type {
  BaggageSubCategory,
  Restrictions,
  BaggagePassengerType,
  OverviewContextType,
  FAQLinksHandlerType,
} from "../../../../records/Baggage";
import getBaggageSize from "../../../../services/baggage/getBaggageSize";
import getIconFromCategory from "../../../../services/baggage/getIconFromCategory";
import getTextFromCategory from "../../../../services/baggage/getTextFromCategory";
import getPassengerNames from "./services/getPassengerNames";

const TextWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;

  ${mq.mediumMobile(css`
    flex-direction: column;
    align-items: flex-start;
  `)};

  ${mq.largeMobile(css`
    flex-direction: row;
    align-items: center;
  `)};

  > p,
  > span {
    margin-right: ${({ theme }): ThemeProps => theme.orbit.spaceXSmall};
  }
`;

TextWrapper.defaultProps = {
  theme: themeDefault,
};

const Title = styled.span`
  line-height: 24px;
`;

const TextLinkWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  span,
  a {
    line-height: 24px;
  }
  a {
    margin-left: 28px;
  }

  ${mq.mediumMobile(css`
    justify-content: flex-end;
    a {
      margin-left: 0;
    }
  `)};
`;

const PassengersWrapper = styled.div`
  svg {
    /* fix of different icon sizing */
    margin-left: 3px;
    margin-right: 11px;
  }
`;

type Props = {|
  restrictions: Restrictions,
  category: BaggageSubCategory,
  amount: number,
  passengers?: BaggagePassengerType[],
  FAQLinksHandler?: FAQLinksHandlerType,
  context: OverviewContextType,
|};

const BaggageItem = ({
  passengers,
  category,
  context,
  amount,
  restrictions,
  FAQLinksHandler,
}: Props) => {
  return (
    <Stack
      flex
      align="center"
      spaceAfter="large"
      direction="column"
      spacing="tight"
      mediumMobile={{ direction: "row", spaceAfter: "smallest" }}
      dataTest={`BaggageOverview-BaggageItem-${category}`}
    >
      <Stack shrink spacing="condensed" spaceAfter="smallest">
        {getIconFromCategory(category, "medium", "primary")}
        <TextWrapper>
          <Text
            element="p"
            weight={context === "MMB-PassengersSummary" ? "bold" : "normal"}
            size={context === "MMB-PassengersSummary" ? "large" : "normal"}
          >
            <Title>
              {`${amount}× `}
              {category === "holdBag" && `${restrictions.weight}kg  `}
              {getTextFromCategory(category, x => x.toLowerCase())}
            </Title>
          </Text>
          <Title>
            <Text
              element="p"
              type="secondary"
              size={context === "MMB-PassengersSummary" ? "normal" : "small"}
            >
              {getBaggageSize(restrictions)}
            </Text>
          </Title>
        </TextWrapper>
      </Stack>

      {(FAQLinksHandler || !!passengers) && (
        <Stack
          align="center"
          justify="start"
          spacing="compact"
          mediumMobile={{ justify: FAQLinksHandler ? "end" : "start", shrink: true }}
        >
          {passengers && (
            <PassengersWrapper>
              <AccountCircle size="small" color="secondary" />
              <Text
                element="span"
                type="secondary"
                dataTest="BaggageOverview-BaggageItem-Passengers"
              >
                {getPassengerNames(passengers)}
              </Text>
            </PassengersWrapper>
          )}
          {FAQLinksHandler && (
            <TextLinkWrapper>
              <TextLink size="small" onClick={() => FAQLinksHandler(category)}>
                <Translate t="baggage_modal.summary.more_info" />
              </TextLink>
            </TextLinkWrapper>
          )}
        </Stack>
      )}
    </Stack>
  );
};

export default BaggageItem;
