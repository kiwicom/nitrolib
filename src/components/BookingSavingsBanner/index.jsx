// @flow strict
import * as React from "react";
import Illustration from "@kiwicom/orbit-components/lib/Illustration";
import Heading from "@kiwicom/orbit-components/lib/Heading";
import Deals from "@kiwicom/orbit-components/lib/icons/Deals";
import Button from "@kiwicom/orbit-components/lib/Button";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import WrapperText from "@kiwicom/orbit-components/lib/Text";
import Card from "@kiwicom/orbit-components/lib/Card";
import CardSection from "@kiwicom/orbit-components/lib/Card/CardSection";

import Translate from "../Translate";

type Props = {|
  amount: number,
  currency: string,
  onLearnMoreClick: (e: SyntheticEvent<HTMLButtonElement>) => void,
  onMoreTripsClick: (e: SyntheticEvent<HTMLButtonElement>) => void,
|};

const BookingSavingsBanner = ({ amount, currency, onLearnMoreClick, onMoreTripsClick }: Props) => (
  <Card dataTest="BookingSavingsBanner">
    <CardSection>
      <Stack
        direction="column"
        align="start"
        spacing="natural"
        desktop={{ direction: "row", align: "center", spacing: "tight" }}
      >
        <Stack inline shrink direction="column" spacing="natural">
          <Stack direction="column" spacing="condensed">
            <Stack align="center" spacing="condensed">
              <Deals />
              <Heading element="h2" type="title2">
                <Translate
                  t="booking.savings_banner.title"
                  values={{
                    amount,
                    currency,
                  }}
                />
              </Heading>
            </Stack>
            <WrapperText spaceAfter="medium">
              <Translate t="booking.savings_banner.description" />
            </WrapperText>
          </Stack>
          <Stack shrink wrap>
            <Button
              dataTest="BookingSavingsBanner-MoreTrips"
              onClick={onMoreTripsClick}
              type="secondary"
              size="small"
            >
              <Translate t="booking.savings_banner.find_more_trips" />
            </Button>
            <Button
              dataTest="BookingSavingsBanner-LearnMore"
              onClick={onLearnMoreClick}
              size="small"
              type="secondary"
            >
              <Translate t="common.learn_more" />
            </Button>
          </Stack>
        </Stack>
        <Illustration name="Money" size="small" />
      </Stack>
    </CardSection>
  </Card>
);

export default BookingSavingsBanner;
