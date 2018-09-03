// @flow
import * as React from "react";
import StarIcon from "@kiwicom/orbit-components/lib/icons/StarFull";

import Text from "../Text";
import Toggle from "../Toggle";
import ClickOutside from "../ClickOutside";
import Button from "../NavBar/primitives/Button";
import Desktop from "../../primitives/Desktop";
import Mobile from "../../primitives/Mobile";
import TripContainer from "../TripsContainer";

const Starred = () => (
  <Toggle>
    {({ open, onToggle, active }) => (
      <>
        {open && (
          <ClickOutside onClickOutside={onToggle}>
            <TripContainer padding header={<Text t={__("starred.starred_flight")} />}>
              <Text t={__("starred.no_flights")} />
            </TripContainer>
          </ClickOutside>
        )}
        <Desktop>
          <Button onClick={onToggle}>Starred</Button>
        </Desktop>
        <Mobile>
          <Button onClick={onToggle}>
            <StarIcon color={active ? "secondary" : "primary"} />
          </Button>
        </Mobile>
      </>
    )}
  </Toggle>
);

export default Starred;
