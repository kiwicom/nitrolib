// @flow strict
import * as React from "react";

import { tKeys } from "../../../records/Continents";
import Text from "../../Text";

type Props = {|
  id: string,
|};

const ContinentName = ({ id }: Props) => <Text t={tKeys[id]} />;

export default ContinentName;
