// @flow strict
import * as React from "react";
import StarIcon from "@kiwicom/orbit-components/lib/icons/StarFull";

import Text from "../Text";
import ToggleLogger from "../ToggleLogger";
import ClickOutside from "../ClickOutside";
import Button from "../NavBar/primitives/Button";
import Desktop from "../Desktop";
import Mobile from "../Mobile";
import TripContainer from "../TripsContainer";
import type { Event } from "../../records/Event";

type Props = {|
  children: React.Node,
  positionMenuTablet?: number,
  positionMenuDesktop?: number,
  onLog: (event: Event<"openStarred", {}>) => void,
|};

export default class Starred extends React.PureComponent<Props> {
  handleOpen = () => {
    const { onLog } = this.props;

    onLog({ event: "openStarred", data: {} });
  };

  render() {
    const { children, positionMenuTablet, positionMenuDesktop } = this.props;

    return (
      <ToggleLogger onOpen={this.handleOpen}>
        {({ open, onToggle }) => (
          <>
            {open && (
              <ClickOutside onClickOutside={onToggle}>
                <TripContainer
                  positionMenuTablet={positionMenuTablet || 0}
                  positionMenuDesktop={positionMenuDesktop || 0}
                  padding
                  header={<Text t={__("starred.starred_flights")} />}
                >
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
      </ToggleLogger>
    );
  }
}
