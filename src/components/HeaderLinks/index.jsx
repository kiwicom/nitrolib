// @flow strict
import * as React from "react";
import Airplane from "@kiwicom/orbit-components/lib/icons/Airplane";
import ChevronDown from "@kiwicom/orbit-components/lib/icons/ChevronDown";
import styled, { css } from "styled-components";

import type { Item } from "./Links";
import mq from "../../styles/mq";
import * as rtl from "../../styles/rtl";
import ClickOutside from "../ClickOutside";
import Toggle from "../Toggle";
import Popup from "./primitives/Popup";
import IconWrapper from "./primitives/IconWrapper";
import Links from "./Links";
import Desktop from "../Desktop";
import Mobile from "../Mobile";
import { getNavBarLinks } from "./services/api";

const Margin = styled.div`
  ${mq.mobile(css`
    margin-${rtl.left}: 20px;
  `)};
`;

type Services = ?(Item[]);

type State = {|
  services: ?Services,
|};

export type ReadyUrl = {|
  rooms: ?{
    query: string,
    base: string,
  },
|};

export type HiddenUrls = {|
  holidays: boolean,
  logitravel: boolean,
|};

type Props = {|
  searchParams: {
    language: string,
  },
  urlParam: string,
  readyUrls: ReadyUrl,
  hiddenUrls: HiddenUrls,
|};

class HeaderLinks extends React.Component<Props, State> {
  state = {
    services: null,
  };

  static defaultProps = {
    searchParams: {
      language: "en",
    },
    urlParam: "search",
    hiddenUrls: {
      holidays: true,
      logitravel: false,
    },
    readyUrls: {
      rooms: null,
    },
  };

  componentDidMount() {
    this.getNavBarLinks();
  }

  getNavBarLinks = async () => {
    try {
      // Fetch services
      const services: any = await getNavBarLinks();

      // Update state
      this.setState({ services: services.items });
    } catch (e) {
      // TODO: Track error
    }
  };

  render() {
    const { searchParams, urlParam, readyUrls, hiddenUrls } = this.props;
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
                        <Links
                          urlParam={urlParam}
                          searchParams={searchParams}
                          services={services}
                          readyUrls={readyUrls}
                          hiddenUrls={hiddenUrls}
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
            urlParam={urlParam}
            searchParams={searchParams}
            services={services}
            readyUrls={readyUrls}
            hiddenUrls={hiddenUrls}
          />
        </Desktop>
      </>
    );
  }
}

export default HeaderLinks;
