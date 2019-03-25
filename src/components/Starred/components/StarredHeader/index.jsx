// @flow strict
import * as React from "react";

import Translate from "../../../Translate";
import ButtonLink from "../../../NavBar/primitives/ButtonLink";

type Props = {|
  tripsCount: number,
  onClear: (e: SyntheticEvent<HTMLDivElement>) => void,
|};

const StarredHeader = ({ tripsCount, onClear }: Props) => (
  <>
    <ButtonLink color="secondary" marginLeft={20}>
      <Translate t="starred.total_flights" values={{ total: tripsCount }} />
    </ButtonLink>
    <ButtonLink color="warning" marginRight={20} onClick={e => onClear(e)}>
      <Translate t="starred.unstar_all_trips" />
    </ButtonLink>
  </>
);

export default StarredHeader;
