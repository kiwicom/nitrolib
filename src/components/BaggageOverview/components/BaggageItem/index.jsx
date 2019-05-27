// @flow strict
import * as React from "react";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import Text from "@kiwicom/orbit-components/lib/Text";
import TextLink from "@kiwicom/orbit-components/lib/TextLink";
import styled, { ThemeConsumer } from "styled-components";
import AccountCircle from "@kiwicom/orbit-components/lib/icons/AccountCircle";
import Hide from "@kiwicom/orbit-components/lib/Hide";
import { rtlSpacing } from "@kiwicom/orbit-components/lib/utils/rtl";

import Translate from "../../../Translate";
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

const CenteringFixWrapper = styled.div`
  > span,
  > p {
    line-height: 24px;
  }
  ,
  > svg {
    margin: ${rtlSpacing(`0px 0px 0px 2px`)};
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
      align="start"
      spaceAfter="large"
      direction="column"
      spacing="tight"
      mediumMobile={{ direction: "row", spaceAfter: "smallest", align: "start" }}
      dataTest={`BaggageOverview-BaggageItem-${category}`}
    >
      <Stack shrink spacing="condensed">
        {getIconFromCategory(category, "medium", "primary")}
        <Stack
          flex
          shrink
          align="start"
          spacing="none"
          direction="column"
          mediumMobile={{ align: "start", direction: "column" }}
          largeMobile={{ direction: "row", spacing: "condensed", align: "center" }}
        >
          <CenteringFixWrapper>
            <Text
              element="p"
              weight={context === "MMB-PassengersSummary" ? "bold" : "normal"}
              size={context === "MMB-PassengersSummary" ? "large" : "normal"}
            >
              {`${amount}× `}
              {category === "holdBag" &&
                typeof restrictions.weight === "number" &&
                `${restrictions.weight}kg `}
              {getTextFromCategory(category, x => x.toLowerCase())}
            </Text>
          </CenteringFixWrapper>
          <CenteringFixWrapper>
            <ThemeConsumer>
              {({ rtl }) => (
                <Text
                  element="p"
                  type="secondary"
                  size={context === "MMB-PassengersSummary" ? "normal" : "small"}
                >
                  {getBaggageSize(restrictions, rtl)}
                </Text>
              )}
            </ThemeConsumer>
          </CenteringFixWrapper>

          {FAQLinksHandler && (
            <Hide on={["largeMobile", "tablet", "desktop", "largeDesktop"]}>
              <Stack
                flex
                shrink
                align="center"
                mediumMobile={{ justify: "end" }}
                spaceAfter="large"
              >
                <TextLink size="small" onClick={() => FAQLinksHandler(category)}>
                  <Translate t="baggage_modal.summary.more_info" />
                </TextLink>
              </Stack>
            </Hide>
          )}
        </Stack>
      </Stack>

      {(FAQLinksHandler || !!passengers) && (
        <Stack
          flex
          shrink
          align="center"
          justify="start"
          spacing="compact"
          mediumMobile={{
            justify: FAQLinksHandler ? "end" : "start",
            shrink: true,
          }}
        >
          {passengers && (
            <>
              <CenteringFixWrapper>
                <AccountCircle size="small" color="secondary" />
              </CenteringFixWrapper>
              <CenteringFixWrapper>
                <Text
                  element="span"
                  type="secondary"
                  dataTest="BaggageOverview-BaggageItem-Passengers"
                >
                  {getPassengerNames(passengers)}
                </Text>
              </CenteringFixWrapper>
            </>
          )}

          {FAQLinksHandler && (
            <Hide on={["smallMobile", "mediumMobile"]}>
              <Stack
                flex
                shrink
                align="center"
                mediumMobile={{ justify: "end" }}
                spaceAfter="large"
              >
                <TextLink size="small" onClick={() => FAQLinksHandler(category)}>
                  <Translate t="baggage_modal.summary.more_info" />
                </TextLink>
              </Stack>
            </Hide>
          )}
        </Stack>
      )}
    </Stack>
  );
};

export default BaggageItem;
