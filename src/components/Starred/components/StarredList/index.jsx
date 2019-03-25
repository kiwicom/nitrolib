// @flow strict
import * as React from "react";
import styled from "styled-components";

import type { StarredItem } from "../../../../records/Starred";
import Text from "../../../Text";
import { themeDefault } from "../../../../records/Theme";
import type { ThemeProps } from "../../../../records/Theme";
import StarredTrips from "./StarredTrips";

type Props = {|
  trips: StarredItem[],
  onRemove: (id: string, e: SyntheticEvent<HTMLDivElement>) => void,
  tripsCount: number,
  goToJourneyNitro: (item: StarredItem) => void,
  shareUrl: (item: StarredItem) => string,
|};

const NoFlights = styled.div`
  padding: ${({ theme }: ThemeProps) => theme.orbit.spaceSmall};
  max-width: 550px;
`;

NoFlights.defaultProps = {
  theme: themeDefault,
};

const StarredList = ({ trips, onRemove, tripsCount, shareUrl, goToJourneyNitro }: Props) => {
  return tripsCount >= 1 ? (
    <StarredTrips
      trips={trips}
      onRemove={onRemove}
      goToJourneyNitro={goToJourneyNitro}
      shareUrl={shareUrl}
    />
  ) : (
    <NoFlights>
      <Text t="starred.no_flights" />
    </NoFlights>
  );
};

export default StarredList;
