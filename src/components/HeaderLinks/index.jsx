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
import { Consumer as InvertedConsumer } from "../../services/inverted/context";

const Margin = styled.div`
  ${mq.mobile(css`
    margin-${rtl.left}: 20px;
  `)};
`;

type Props = {|
  linkFlights: string,
  linkCars: string,
  linkRooms: string,
  linkHolidays: string,
  forceNewWindow: boolean,
|};

const HeaderLinks = ({ linkFlights, linkRooms, linkCars, linkHolidays, forceNewWindow }: Props) => (
  <InvertedConsumer>
    {({ inverted }) => (
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
                          inverted={inverted}
                          linkHolidays={linkHolidays}
                          forceNewWindow={forceNewWindow}
                        />
                      </Popup>
                    </ClickOutside>
                  )}
                  <IconWrapper act={open} onClick={onToggle} inverted={inverted}>
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
            inverted={inverted}
            linkHolidays={linkHolidays}
            forceNewWindow={forceNewWindow}
          />
        </Desktop>
      </>
    )}
  </InvertedConsumer>
);

HeaderLinks.defaultProps = {
  forceNewWindow: false,
};

export default HeaderLinks;
