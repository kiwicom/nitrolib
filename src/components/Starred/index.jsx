// @flow strict
import * as React from "react";
import StarIcon from "@kiwicom/orbit-components/lib/icons/StarFull";

import Text from "../Text";
import Toggle from "../Toggle";
import ClickOutside from "../ClickOutside";
import Button from "../NavBar/primitives/Button";
import Desktop from "../Desktop";
import Mobile from "../Mobile";
import TripsContainer from "../TripsContainer";
import LogMount from "../LogMount";

type Props = {|
  children: React.Node,
  positionMenuTablet?: number,
  positionMenuDesktop?: number,
|};

const Starred = ({ children, positionMenuTablet, positionMenuDesktop }: Props) => (
  <Toggle>
    {({ open, onToggle }) => (
      <>
        {open && (
          <ClickOutside onClickOutside={onToggle}>
            <LogMount event={{ event: "openStarred", data: null }} />
            <TripsContainer
              positionMenuTablet={positionMenuTablet || 0}
              positionMenuDesktop={positionMenuDesktop || 0}
              padding
              header={<Text t={__("starred.starred_flights")} />}
            >
              {children}
            </TripsContainer>
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
