// @flow strict
import * as React from "react";
import Airplane from "@kiwicom/orbit-components/lib/icons/Airplane";
import ChevronDown from "@kiwicom/orbit-components/lib/icons/ChevronDown";
import styled, { css } from "styled-components";
import { left } from "@kiwicom/orbit-components/lib/utils/rtl";

import type { Item } from "./components/Links";
import mq from "../../styles/mq";
import ClickOutside from "../ClickOutside";
import Toggle from "../Toggle";
import Popup from "./primitives/Popup";
import IconWrapper from "./primitives/IconWrapper";
import Links from "./components/Links/index";
import Desktop from "../Desktop";
import Mobile from "../Mobile";
import getNavBarLinks from "./services/api";

const Margin = styled.div`
  ${mq.ltDesktop(css`
    margin-${left}: 20px;
  `)}
  ${mq.ltSmallMobile(css`
    margin-${left}: 0;
  `)}
`;

type Services = ?(Item[]);

type State = {|
  services: ?Services,
|};

type Props = {|
  searchString: string,
  language: {
    id: string,
  },
  currency: string,
  searchForm: any,
  roomsProvider: string,
  holidaysProvider: string,
  lastminuteSupported: boolean,
|};

class HeaderLinks extends React.Component<Props, State> {
  state = {
    services: null,
  };

  static defaultProps = {
    searchString: "search",
    language: {
      id: "us",
    },
    currency: "usd",
    searchForm: {
      destination: {
        type: "oneWay",
        name: "kifla",
      },
      checkIn: "sdoqjo",
      checkOut: "sdhiqow",
      adults: 1,
      children: 2,
    },
    roomsProvider: "roomsKiwi",
    holidaysProvider: "lastminute",
    lastminuteSupported: true,
  };

  componentDidMount() {
    this.getNavBarLinks();
  }

  getNavBarLinks = async () => {
    const {
      searchString,
      language,
      currency,
      searchForm,
      roomsProvider,
      holidaysProvider,
      lastminuteSupported,
    } = this.props;

    try {
      // Fetch services
      const services = await getNavBarLinks({
        searchString,
        language: language.id,
        currency,
        searchForm,
        roomsProvider,
        holidaysProvider,
        lastminuteSupported,
      });

      // Update state
      this.setState({ services: services.items });
    } catch (e) {
      // TODO: Track error
    }
  };

  render() {
    const { services } = this.state;

    // Hide until response
    if (!services) return null;

    return (
      <>
        <Mobile display="flex">
          <Margin>
            <Toggle>
              {({ open, onToggle }) => (
                <>
                  {open && (
                    <ClickOutside onClickOutside={onToggle}>
                      <Popup>
                        {services && services.length > 0 && <Links services={services} />}
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
          {services && services.length > 0 && <Links services={services} />}
        </Desktop>
      </>
    );
  }
}

export default HeaderLinks;
