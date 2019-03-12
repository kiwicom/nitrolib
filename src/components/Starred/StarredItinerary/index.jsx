// @flow strict
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
import getTransKey from "../services/getTransKey";
import type { ThemeProps } from "../../../records/Theme";
import type { ItineraryDeep } from "../../../records/Itinerary";
import type { PassengersCount, CabinClass } from "../../../records/Starred";
import { themeDefault } from "../../../records/Theme";
import Toggle from "../../Toggle";
import { Consumer as StarredConsumer } from "../../../services/starred/context";
import ItineraryVariants from "./ItineraryVariants";

const PASSENGERS_COUNT = {
  infants: __("result.infants_count"),
  adults: __("result.adults_count"),
};

type Props = {|
  updated: Date,
  itinerary: ItineraryDeep,
  passengerCount: number,
  passengers: PassengersCount,
  passengerMulty: boolean,
  cabinClass: CabinClass,
  goToJourneyNitro: () => void,
  onRemove: () => void,
  priceUpdatedAt: ?Date,
  shareUrl: string,
  created: Date,
|};

const Info = styled.div`
  display: flex;
  min-width: 80px;
  width: 80px;
  margin-right: 5px;
  margin-top: 10px;
  flex-direction: column;

  ${mq.largeMobile(css`
    margin-top: 0;
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
  background: ${({ theme }: ThemeProps) => theme.orbit.paletteWhite};
  /* ${({ valid }) => !valid && `opacity: .5`} */
  &:hover {
    background: ${({ theme }: ThemeProps) => theme.orbit.paletteWhiteHover};
  }
`;

Wrapper.defaultProps = {
  theme: themeDefault,
};

const WrapperInner = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-start;
  ${mq.largeMobile(css`
    margin-top: 15px;
    flex-direction: row;
    align-items: center;
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

const StarredItinerary = ({
  updated,
  itinerary,
  shareUrl,
  onRemove,
  created,
  passengers,
  goToJourneyNitro,
  cabinClass,
  priceUpdatedAt,
  passengerCount,
  passengerMulty,
}: Props) => {
  const getPriceUpdated = () => {
    return priceUpdatedAt ? (
      <TranslateNode
        t="starred.price_update"
        values={{ lastUpdate: <TimeInWords to={updated} /> }}
      />
    ) : (
      <TranslateNode t="starred.created_at" values={{ createdAt: <TimeInWords to={created} /> }} />
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
                <Price value={Number(itinerary.price.amount)} />
              </TextWrapper>
              <PriceInfo>
                {passengerCount > 1 &&
                  (passengerMulty ? (
                    <Text type="secondary" size="small" t="result.total_price" />
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
                          itinerary={itinerary}
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
            <ItineraryVariants itinerary={itinerary} />
          </WrapperInner>
        </Wrapper>
      )}
    </StarredConsumer>
  );
};

export default StarredItinerary;
