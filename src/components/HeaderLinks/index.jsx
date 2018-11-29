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

const Margin = styled.div`
  ${mq.ltDesktop(css`
    margin-${left}: 20px;
  `)}
  ${mq.ltSmallMobile(css`
    margin-${left}: 0;
  `)}
`;

const LtDesktop = styled.div`
  display: none;
  ${mq.ltDesktop(css`
    display: flex;
  `)}
`;

const GtDesktop = styled.div`
  display: none;
  ${mq.gtDesktop(css`
    display: flex;
  `)}
`;

type Props = {|
  linkFlights: string,
  linkCars: string,
  linkRooms: string,
  linkHolidays: string,
  forceNewWindow: boolean,
  inverted?: boolean,
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
    <LtDesktop>
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
    </LtDesktop>
    <GtDesktop>
      <Links
        linkFlights={linkFlights}
        linkRooms={linkRooms}
        linkCars={linkCars}
        inverted={inverted}
        linkHolidays={linkHolidays}
        forceNewWindow={forceNewWindow}
      />
    </GtDesktop>
  </>
);

HeaderLinks.defaultProps = {
  forceNewWindow: false,
};

export default HeaderLinks;
