// @flow strict
import * as React from "react";

import Button from "../../../../primitives/Button";
import ItemWrapper from "../../primitives/ItemWrapper";
import Text from "../../../../../Text";

type Props = {|
  children: React.Node,
|};

const TripListBottom = ({ children }: Props) => (
  <ItemWrapper>
    {children}
    <Button primary fontSize="1.1em" marginLeft={25} y="center">
      <Text t={__("account.all_trips")} />
    </Button>
  </ItemWrapper>
);

export default TripListBottom;
