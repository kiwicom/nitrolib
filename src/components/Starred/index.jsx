// @flow strict
import * as React from "react";
import StarIcon from "@kiwicom/orbit-components/lib/icons/StarFull";

import Text from "../Text";
import Toggle from "../Toggle";
import ClickOutside from "../ClickOutside";
import Button from "../NavBar/primitives/Button";
import Desktop from "../Desktop";
import Mobile from "../Mobile";
import TripContainer from "../TripsContainer";

type Props = {|
  children: React.Node,
|};

const Starred = ({ children }: Props) => (
  <Toggle>
    {({ open, onToggle }) => (
      <>
        {open && (
          <ClickOutside onClickOutside={onToggle}>
            <TripContainer padding header={<Text t={__("starred.starred_flights")} />}>
              {children}
            </TripContainer>
          </ClickOutside>
        )}
        <Desktop>
          <Button onClick={onToggle}>Starred</Button>
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
