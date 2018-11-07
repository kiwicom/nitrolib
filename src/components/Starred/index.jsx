// @flow strict
import * as React from "react";
import StarIcon from "@kiwicom/orbit-components/lib/icons/StarFull";

import Button from "../NavBar/primitives/Button";
import Text from "../Text";
import Toggle from "../Toggle";
import ClickOutside from "../ClickOutside";
import Desktop from "../Desktop";
import Mobile from "../Mobile";

type Props = {|
  children: React.Node,
|};

const Starred = ({ children }: Props) => (
  <Toggle>
    {({ open, onToggle }) => (
      <>
        {open && <ClickOutside onClickOutside={onToggle}>{children}</ClickOutside>}
        <Desktop>
          <Button onClick={onToggle}>
            <Text t={__("starred.starred")} />
          </Button>
        </Desktop>
        <Mobile>
          <Button onClick={onToggle}>
            <StarIcon color="primary" />
          </Button>
        </Mobile>
      </>
    )}
  </Toggle>
);

export default Starred;
