// @flow strict
import * as React from "react";

import { tKeys } from "../../../records/Continents";
import Translate from "../../Translate";

type Props = {|
  id: string,
|};

const ContinentName = ({ id }: Props) => <Translate t={tKeys[id]} />;

export default ContinentName;
