// @flow strict
import * as React from "react";
import * as R from "ramda";
import Faq from "@kiwicom/orbit-components/lib/icons/QuestionCircle";

import Translate from "../../../Translate";
import Button from "../../primitives/Button";
import Desktop from "../../../Desktop";
import Mobile from "../../../Mobile";

type Props = {|
  onOpen: ?() => void,
  inverted: boolean,
|};

const Help = ({ onOpen, inverted }: Props) => (
  <Button
    onClick={onOpen || R.identity}
    disabled={!onOpen}
    color={!inverted && "secondary"}
    dataTest="NavbarSupport"
  >
    <Desktop>
      <Translate t="common.help" />
    </Desktop>
    <Mobile>
      <Faq />
    </Mobile>
  </Button>
);

export default Help;
