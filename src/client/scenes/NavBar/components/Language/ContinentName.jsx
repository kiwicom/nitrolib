// @flow strict
import * as React from "react";

import { tKeys } from "public/records/Continents";
import Text from "public/components/Text";

type Props = {|
  id: string,
|};

const ContinentName = ({ id }: Props) => <Text t={tKeys[id]} />;

export default ContinentName;
