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

// Types
type Services = Item[] | null;

type SearchForm = {|
  mode: string,
  destination: { type: string, name: string },
  checkIn?: Date,
  checkOut?: Date | null,
  adults: number,
  children: number,
|};

type Props = {|
  searchString: string,
  language: {
    id: string,
  },
  currency: {
    id: string,
  },
  searchForm: SearchForm,
  testResponse?: Services,
|};

type State = {|
  services: ?Services,
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
    currency: { id: "gbp" },
    searchForm: {
      mode: "oneWay",
      destination: {
        type: "2",
        name: "Warsaw",
      },
      checkIn: new Date(),
      checkOut: null,
      adults: 1,
      children: 0,
    },
  };

  componentDidMount() {
    this.getNavBarLinks();
  }

  getNavBarLinks = async () => {
    const { searchString, language, currency, searchForm, testResponse } = this.props;

    if (testResponse) {
      this.setState({ services: testResponse });
    } else {
      try {
        // Fetch services
        const services = await getNavBarLinks({
          searchString,
          language,
          currency,
          searchForm,
        });

        // Update state
        this.setState({ services: services.items });
      } catch (e) {
        // TODO: Track error
      }
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
