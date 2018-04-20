// @flow strict
import * as React from "react";

import { tKeys } from "client/records/Continents";
import Text from "client/components/Text";

type Props = {|
  id: string,
|};

const ContinentName = (props: Props) => <Text t={tKeys[props.id]} />;

export default ContinentName;
