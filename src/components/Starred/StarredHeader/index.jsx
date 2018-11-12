// @flow
import * as React from "react";

import Translate from "../../Translate";
import ButtonLink from "../../NavBar/primitives/ButtonLink";

type Props = {|
  tripsCount: number,
  onClearStorage: () => void,
|};

const StarredHeader = ({ tripsCount, onClearStorage }: Props) => (
  <>
    <ButtonLink color="secondary" marginLeft={20}>
      <Translate t={__("starred.total_flights")} values={{ total: tripsCount }} />
    </ButtonLink>
    <ButtonLink color="warning" marginRight={20} onClick={() => onClearStorage()}>
      <Translate t={__("starred.unstar_all_trips")} />
    </ButtonLink>
  </>
);

export default StarredHeader;
