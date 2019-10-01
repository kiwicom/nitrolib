// @flow strict
import * as React from "react";
import Faq from "@kiwicom/orbit-components/lib/icons/QuestionCircle";
import Mobile from "@kiwicom/orbit-components/lib/Mobile";
import Desktop from "@kiwicom/orbit-components/lib/Desktop";
import ButtonLink from "@kiwicom/orbit-components/lib/ButtonLink";

import Translate from "../../../Translate";

type Props = {|
  onOpen: () => void,
|};

const Help = ({ onOpen }: Props) => (
  <ButtonLink
    dataTest="NavBar-Help"
    onClick={onOpen}
    transparent
    disabled={!onOpen}
    type="secondary"
  >
    <Desktop>
      <Translate t="common.help" />
    </Desktop>
    <Mobile>
      <Faq />
    </Mobile>
  </ButtonLink>
);

export default Help;
