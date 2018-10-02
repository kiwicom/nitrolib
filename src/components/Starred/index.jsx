// @flow strict
import * as React from "react";
import StarIcon from "@kiwicom/orbit-components/lib/icons/StarFull";
import TextLink from "@kiwicom/orbit-components/lib/TextLink";
import ButtonLink from "@kiwicom/orbit-components/lib/ButtonLink";

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
            <Text t={__("starred.starred")} />
          </TextLink>
        </Desktop>
        <Mobile>
          <ButtonLink onClick={onToggle} icon={<StarIcon color="primary" />} />
        </Mobile>
      </>
    )}
  </Toggle>
);

export default Starred;
