// @flow
import * as React from "react";
import styled, { css } from "styled-components";
import Star from "@kiwicom/orbit-components/lib/icons/StarFull";
import Share from "@kiwicom/orbit-components/lib/icons/Share";
import TextWrapper from "@kiwicom/orbit-components/lib/Text";
import mq from "@kiwicom/orbit-components/lib/utils/mediaQuery";

import TimeInWords from "../../DistanceInWords";
import Price from "../../Price";
import Text from "../../Text";
import TranslateNode from "../../TranslateNode";
import StarredSegment from "../StarredSegment";
import { getBestPrice, getTransKey } from "../helpers";
import type { ThemeProps } from "../../../records/Theme";
import type { Itinerary } from "../../../records/Itinerary";
import type { PassengersCount, CabinClass } from "../../../records/Starred";
import { themeDefault } from "../../../records/Theme";
import { PASSENGERS_COUNT } from "../consts";
import Toggle from "../../Toggle";
import { Consumer as StarredConsumer } from "../../../services/starred/context";

type Props = {|
  updated: Date,
  journey: Itinerary,
  passengerCount: number,
  passengers: PassengersCount,
  passengerMulty: boolean,
  cabinClass: CabinClass,
  goToJourneyNitro: () => void,
  price: number,
  onRemove: () => void,
  priceUpdatedAt: ?Date,
  shareUrl: string,
  isValid: boolean,
  created: Date,
|};

const Info = styled.div`
  display: flex;
  min-width: 80px;
  width: 80px;
  margin-right: 5px;
  flex-direction: column;
  ${mq.ltBigMobile(css`
    margin-top: 10px;
  `)};
`;

const PriceInfo = styled.div`
  text-transform: lowercase;
  max-width: 80px;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const Wrapper = styled.div`
  padding: 15px 20px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  box-shadow: rgb(232, 237, 241) 0px -1px inset;
  background: ${({ theme }) => theme.orbit.paletteWhite};
  &:hover {
    background: ${({ theme }) => theme.orbit.paletteWhiteHover};
  }
`;

Wrapper.defaultProps = {
  theme: themeDefault,
};

const WrapperInner = styled.div`
  display: flex;
  margin-top: 15px;
  align-items: center;
  ${mq.ltBigMobile(css`
    flex-direction: column-reverse;
    align-items: flex-start;
  `)};
`;

const ActionButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 55px;
  margin-top: 5px;
`;

const ActionButton = styled.div`
  z-index: 2;
`;

const ShareIcon = styled(Share)`
  &:hover {
    color: ${({ theme }: ThemeProps) => theme.orbit.paletteInkLight};
  }
`;

ShareIcon.defaultProps = {
  theme: themeDefault,
};

const Flights = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const StarredItinerary = ({
  updated,
  journey,
  price,
  shareUrl,
  onRemove,
  isValid,
  created,
  passengers,
  goToJourneyNitro,
  cabinClass,
  priceUpdatedAt,
  passengerCount,
  passengerMulty,
}: Props) => {
  const lastUpdate = <TimeInWords time={updated} />;
  const getPriceUpdated = () => {
    if (!isValid) {
      return (
        <>
          <Text t={__("starred.flight_not_available")} />
          <ActionButton onClick={onRemove}>
            <Text t={__("starred.remove_starred")} />
          </ActionButton>
        </>
      );
    }
    if (price !== getBestPrice(journey)) {
      return (
        <Text
          t={__("starred.price_update_changed")}
          values={{
            origPrice: price,
          }}
        />
      );
    }
    return priceUpdatedAt ? (
      <TranslateNode t={__("starred.price-update")} values={{ lastUpdate }} />
    ) : (
      <TranslateNode
        t={__("starred.created_at")}
        values={{ createdAt: <TimeInWords time={created} /> }}
      />
    );
  };

  return (
    <StarredConsumer>
      {({ isMobile, lang, setNotice, ShareDialog }) => (
        <Wrapper onClick={() => goToJourneyNitro()}>
          <TextWrapper type="secondary" size="small">
            {getPriceUpdated()}
          </TextWrapper>
          <WrapperInner>
            <Info>
              <TextWrapper weight="bold" size="large">
                <Price value={getBestPrice(journey)} />
              </TextWrapper>
              <PriceInfo>
                {passengerCount > 1 &&
                  (passengerMulty ? (
                    <Text type="secondary" size="small" t={__("result.total_price")} />
                  ) : (
                    <Text
                      type="secondary"
                      size="small"
                      t={PASSENGERS_COUNT[getTransKey(passengers)]}
                      values={{ count: passengerCount }}
                    />
                  ))}
              </PriceInfo>
              <ActionButtonsWrapper>
                <ActionButton onClick={onRemove}>
                  <Star color="warning" />
                </ActionButton>
                <Toggle>
                  {({ open, onToggle }) => (
                    <>
                      <ActionButton
                        onClick={e => {
                          e.stopPropagation();
                          onToggle();
                        }}
                      >
                        <ShareIcon color="tertiary" />
                      </ActionButton>
                      {open && (
                        <ShareDialog
                          shareUrl={shareUrl}
                          journey={journey}
                          passengers={passengers}
                          cabinClass={cabinClass}
                          isMobile={isMobile}
                          getLangInfo={lang}
                          setNotice={setNotice}
                          onClose={onToggle}
                        />
                      )}
                    </>
                  )}
                </Toggle>
              </ActionButtonsWrapper>
            </Info>
            <Flights>
              {journey.trips.map(trip => (
                <StarredSegment
                  key={trip.flights[0].id}
                  departure={trip.flights[0].departure}
                  arrival={trip.flights[trip.flights.length - 1].arrival}
                />
              ))}
            </Flights>
          </WrapperInner>
        </Wrapper>
      )}
    </StarredConsumer>
  );
};

export default StarredItinerary;
