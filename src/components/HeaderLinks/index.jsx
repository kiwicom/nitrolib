// @flow strict
import React from "react";
import Airplane from "@kiwicom/orbit-components/lib/icons/Airplane";
import ChevronDown from "@kiwicom/orbit-components/lib/icons/ChevronDown";
import styled, { css } from "styled-components";

import mq from "../../styles/mq";
import * as rtl from "../../styles/rtl";
import ClickOutside from "../ClickOutside";
import Toggle from "../Toggle";
import Popup from "./primitives/Popup";
import IconWrapper from "./primitives/IconWrapper";
import Links from "./Links";
import Desktop from "../Desktop";
import Mobile from "../Mobile";

const Margin = styled.div`
  ${mq.mobile(css`
    margin-${rtl.left}: 20px;
  `)};
`;

type Props = {|
  linkFlights: string,
  linkCars: string,
  linkRooms: string | null,
  linkHolidays: string | null,
  forceNewWindow: boolean,
|};

const HeaderLinks = ({ linkFlights, linkRooms, linkCars, linkHolidays, forceNewWindow }: Props) => (
  <>
    <Mobile display="flex">
      <Margin>
        <Toggle>
          {({ open, onToggle }) => (
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
              <IconWrapper hover onClick={onToggle}>
                <Airplane />
                <ChevronDown size="small" />
              </IconWrapper>
            </>
          )}
        </Toggle>
      </Margin>
    </Mobile>
    <Desktop display="flex">
      <Links
        linkFlights={linkFlights}
        linkRooms={linkRooms}
        linkCars={linkCars}
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
