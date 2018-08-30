// @flow strict
import React from "react";
import Airplane from "@kiwicom/orbit-components/lib/icons/Airplane";
import ChevronDown from "@kiwicom/orbit-components/lib/icons/ChevronDown";
import styled, { css } from "styled-components";

import mq from "../../styles/mediaQuery";
import ClickOutside from "../ClickOutside";
import Toggle from "../Toggle";
import Popup from "./primitives/Popup";
import IconWrapper from "./primitives/IconWrapper";
import Links from "./Links";

const MediaTablet = styled.div`
  display: none;
  ${mq.mobile(css`
    display: flex;
    width: 50%;
    margin-left: 20px;
  `)};
`;

const MediaDesktop = styled.div`
  display: flex;
  ${mq.mobile(css`
    display: none;
  `)};
`;

type Props = {|
  linkFlights: string,
  linkRooms: string,
  linkCars: string,
  linkHolidays: string,
  forceNewWindow: boolean,
|};

const HeaderLinks = ({ linkFlights, linkRooms, linkCars, linkHolidays, forceNewWindow }: Props) => (
  <>
    <MediaTablet>
      <Toggle>
        {({ open, active, onToggle }) => (
          <>
            {open && (
              <ClickOutside onClickOutside={onToggle}>
                <Popup>
                  <Links
                    linkFlights={linkFlights}
                    linkRooms={linkRooms}
                    linkCars={linkCars}
                    linkHolidays={linkHolidays}
                    forceNewWindow={forceNewWindow}
                  />
                </Popup>
              </ClickOutside>
            )}
            <IconWrapper hover onClick={onToggle} act={active}>
              <Airplane />
              <ChevronDown size="small" />
            </IconWrapper>
          </>
        )}
      </Toggle>
    </MediaTablet>
    <MediaDesktop>
      <Links
        linkFlights={linkFlights}
        linkRooms={linkRooms}
        linkCars={linkCars}
        linkHolidays={linkHolidays}
        forceNewWindow={forceNewWindow}
      />
    </MediaDesktop>
  </>
);

HeaderLinks.defaultProps = {
  forceNewWindow: false,
};

export default HeaderLinks;
