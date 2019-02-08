// @flow

import * as React from 'react';
import { graphql, createFragmentContainer } from 'react-relay';
import styled, { css } from 'styled-components';
import Text from '@kiwicom/orbit-components/lib/Text';
import Button from '@kiwicom/orbit-components/lib/Button';
import Heading from '@kiwicom/orbit-components/lib/Heading';
import Translate from '@kiwicom/nitro/lib/components/Translate';

import type { PriceBreakdown as PriceBreakdownType } from './__generated__/PriceBreakdown.graphql';
import { sendEvent } from '../logs/marketingHelpers';

type Props = {|
  data: PriceBreakdownType,
  checkout: ?boolean,
|};

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.orbit.spaceXXSmall};
`;

const Total = styled(Item)`
  margin-top: ${({ theme }) => theme.orbit.spaceMedium};
  margin-bottom: ${({ theme }) => theme.orbit.spaceMedium};

  :last-child {
    margin-bottom: 0;
  }
`;

// ExtraLarge is not in `Text` component from Orbit and
// `Heading` component is not able to render to `div`
const ExtraLarge = styled.span`
  ${({ theme: { orbit } }) => css`
    font-size: ${orbit.fontSizeHeadingTitle2};
    font-weight: ${orbit.fontWeightHeadingTitle2};
    line-height: ${orbit.lineHeightHeading};
  `};
`;

const ButtonWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.orbit.spaceSmall};
`;

class PriceBreakdown extends React.Component<Props> {
  handleBookNow = () => {
    sendEvent('clickOnBookNow');
  };

  render() {
    const { data, checkout } = this.props;
    const { baggagePriceLocal, feesLocal, totalPrice } = data;
    return (
      <>
        <Heading element="h4" type="title3" spaceAfter="medium">
          <Translate t="holidays.detail.price_breakdown" />
        </Heading>
        <Item>
          {/* TODO translate */}
          <Text element="div">baggagePriceLocal</Text>
          <Text element="div" align="right">
            {baggagePriceLocal.currency} {baggagePriceLocal.amount}
          </Text>
        </Item>
        <Item>
          {/* TODO translate */}
          <Text element="div">feesLocal</Text>
          <Text element="div" align="right">
            {feesLocal.currency} {feesLocal.amount}
          </Text>
        </Item>
        <Total>
          <Text element="div">
            <ExtraLarge>
              <Translate t="holidays.detail.total_price" />
            </ExtraLarge>
          </Text>
          <Text element="div" align="right">
            <ExtraLarge>
              {totalPrice.currency} {totalPrice.amount}
            </ExtraLarge>
          </Text>
        </Total>
        {!checkout && (
          <>
            <ButtonWrapper>
              <Button size="large" block onClick={this.handleBookNow}>
                <Translate t="holidays.detail.book_button" />
              </Button>
            </ButtonWrapper>
            <Text type="secondary" size="small" align="center">
              <Translate t="holidays.detail.book_button_desc" />
            </Text>
          </>
        )}
      </>
    );
  }
}

export default createFragmentContainer(
  PriceBreakdown,
  graphql`
    fragment PriceBreakdown on GetDetail {
      baggagePriceLocal {
        amount
        currency
      }
      feesLocal {
        amount
        currency
      }
      totalPrice {
        amount
        currency
      }
    }
  `,
);
