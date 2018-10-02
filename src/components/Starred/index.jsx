// @flow strict
import * as React from "react";
import StarIcon from "@kiwicom/orbit-components/lib/icons/StarFull";
import TextLink from "@kiwicom/orbit-components/lib/TextLink";

import Button from "../NavBar/primitives/Button";
import Text from "../Text";
import Toggle from "../Toggle";
import ClickOutside from "../ClickOutside";
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
          <TextLink type="secondary" onClick={onToggle}>
            Starred
          </TextLink>
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
