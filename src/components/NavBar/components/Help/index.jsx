// @flow strict
import * as React from "react";

import Text from "../../../Text";
import Button from "../../primitives/Button";

type Props = {|
  onOpen: () => void,
|};

const Help = ({ onOpen }: Props) => (
  <Button onClick={onOpen}>
    <Text t={__("common.help")} />
  </Button>
);

export default Help;
