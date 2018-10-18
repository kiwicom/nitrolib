// @flow strict
import * as React from "react";
import Faq from "@kiwicom/orbit-components/lib/icons/QuestionCircle";

import Text from "../../../Text";
import Button from "../../primitives/Button";
import Desktop from "../../../Desktop";
import Mobile from "../../../Mobile";

type Props = {|
  onOpen: () => void,
|};

const Help = ({ onOpen }: Props) => (
  <Button onClick={onOpen} dataTest="NavbarSupport" background="white">
    <Desktop>
      <Text t={__("common.help")} />
    </Desktop>
    <Mobile>
      <Faq />
    </Mobile>
  </Button>
);

export default Help;
