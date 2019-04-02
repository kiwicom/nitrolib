// @flow
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
} from "../../../../records/Baggage.js.flow";
import { getTextFromCategory, getIconFromCategory } from "../../../../services/baggage/utils";

const Wrapper = styled.div.attrs({
  "data-test": ({ dataTest }: { dataTest: string }) => dataTest,
})`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;

  ${mq.mediumMobile(css`
    flex-direction: row;
    align-items: flex-start;
    margin-bottom: 0px;
  `)};
`;

const TextWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: nowrap;
  flex-grow: 1;
  flex-shrink: 1;
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

  > * {
    margin-right: ${({ theme }): ThemeProps => theme.orbit.spaceXSmall};
  }
`;

TextWrapper.defaultProps = {
  theme: themeDefault,
};

const Title = styled.span`
  line-height: 24px;
`;

type OptionalColumnWrapperType = ThemeProps & {
  hasLink: boolean,
};

const OptionalColumnWrapper = styled.div`
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
  svg {
    /* fix of different icon sizing */
    margin-left: 3px;
    margin-right: 11px;
  }
  ${mq.mediumMobile(css`
    justify-content: ${({ hasLink }) => (hasLink ? "flex-end" : "flex-start")};
    svg {
      margin-right: ${({ theme }): OptionalColumnWrapperType => theme.orbit.spaceXSmall};
    }
  `)};
`;
OptionalColumnWrapper.defaultProps = {
  theme: themeDefault,
  hasLink: false,
};

type Props = {
  restrictions: Restrictions,
  category: BaggageSubCategory,
  amount: number,
  passengers?: Array<BaggagePassengerType>,
  FAQLinksHandler?: FAQLinksHandlerType,
  context: OverviewContextType,
};

const BaggageItem = ({
  passengers,
  category,
  context,
  amount,
  restrictions,
  FAQLinksHandler,
}: Props) => {
  const getBaggageSize = ({ height, length, weight, width }) =>
    `${length} x ${width} x ${height} cm, ${weight} kg`;

  const getPassengerNames = passengersArr =>
    passengersArr
      .map(p => `${p.firstName[0]}. ${p.middleName ? `${p.middleName[0]}.` : ""} ${p.lastName}`)
      .join(", ");
  return (
    <Wrapper dataTest={`BaggageOverview-BaggageItem-${category}`}>
      <Stack shrink spacing="condensed">
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
              element="span"
              type="secondary"
              size={context === "MMB-PassengersSummary" ? "normal" : "small"}
            >
              {getBaggageSize(restrictions)}
            </Text>
          </Title>
        </TextWrapper>
      </Stack>

      <OptionalColumnWrapper hasLink={!!FAQLinksHandler}>
        {passengers && (
          <>
            <AccountCircle size="small" color="secondary" />
            <Text element="span" type="secondary">
              {getPassengerNames(passengers)}
            </Text>
          </>
        )}
        {FAQLinksHandler && (
          <TextLink size="small" onClick={() => FAQLinksHandler(category)}>
            <Translate t="baggage_modal.summary.more_info" />
          </TextLink>
        )}
      </OptionalColumnWrapper>
    </Wrapper>
  );
};

export default BaggageItem;
