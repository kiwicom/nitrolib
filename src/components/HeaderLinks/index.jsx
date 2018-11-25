// @flow strict
import React from "react";
import AirplaneUp from "@kiwicom/orbit-components/lib/icons/AirplaneUp";
import ChevronDown from "@kiwicom/orbit-components/lib/icons/ChevronDown";
import styled, { css } from "styled-components";
import { left } from "@kiwicom/orbit-components/lib/utils/rtl";

import mq from "../../styles/mq";
import ClickOutside from "../ClickOutside";
import Toggle from "../Toggle";
import Popup from "./primitives/Popup";
import IconWrapper from "./primitives/IconWrapper";
import Links from "./Links";
import Desktop from "../Desktop";
import Mobile from "../Mobile";

const Margin = styled.div`
  ${mq.mobile(css`
    margin-${left}: 20px;
  `)};
`;

type Props = {|
  linkFlights: string,
  linkCars: string,
  linkRooms: string,
  inverted?: boolean,
  linkHolidays: string,
  forceNewWindow: boolean,
|};

const HeaderLinks = ({
  linkFlights,
  linkRooms,
  linkCars,
  linkHolidays,
  forceNewWindow,
  inverted,
}: Props) => (
  <>
    <Mobile display="flex">
      <Margin>
        <Toggle>
          {({ open, onToggle }) => (
            <ClickOutside active={open} onClickOutside={onToggle}>
              <>
                {open && (
                  <Popup>
                    <Links
                      linkFlights={linkFlights}
                      linkRooms={linkRooms}
                      linkCars={linkCars}
                      inverted={inverted}
                      linkHolidays={linkHolidays}
                      forceNewWindow={forceNewWindow}
                    />
                  </Popup>
                )}
                <IconWrapper act={open} onClick={onToggle} inverted={inverted}>
                  <AirplaneUp />
                  <ChevronDown size="small" />
                </IconWrapper>
              </>
            </ClickOutside>
          )}
        </Toggle>
      </Margin>
    </Mobile>
    <Desktop display="flex">
      <Links
        linkFlights={linkFlights}
        linkRooms={linkRooms}
        linkCars={linkCars}
        inverted={inverted}
        linkHolidays={linkHolidays}
        forceNewWindow={forceNewWindow}
      />
    </Desktop>
  </>
);

HeaderLinks.defaultProps = {
  forceNewWindow: false,
};

export default HeaderLinks;
