// @flow strict
import * as React from "react";

import { tKeys } from "client/records/Continents";
import Text from "client/components/Text";

type Props = {|
  id: string,
|};

const ContinentName = ({ id }: Props) => <Text t={tKeys[id]} />;

export default ContinentName;
