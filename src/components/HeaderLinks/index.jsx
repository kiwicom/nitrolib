// @flow strict
import * as React from "react";
import Airplane from "@kiwicom/orbit-components/lib/icons/Airplane";
import ChevronDown from "@kiwicom/orbit-components/lib/icons/ChevronDown";
import styled, { css } from "styled-components";
import { left } from "@kiwicom/orbit-components/lib/utils/rtl";

import type { HeaderLink } from "./records/HeaderLink";
import mq from "../../styles/mq";
import ClickOutside from "../ClickOutside";
import Toggle from "../Toggle";
import Popup from "./primitives/Popup";
import IconWrapper from "./primitives/IconWrapper";
import Links from "./components/Links";
import Desktop from "../Desktop";
import Mobile from "../Mobile";
import getNavBarLinks from "./services/api";
import withLog from "../../services/log/decorator";
import type { Decorated } from "../../services/log/decorator";
import type { Context } from "../../services/log/context";

const Margin = styled.div`
  ${mq.ltDesktop(css`
    margin-${/* sc-custom "left" */ left}: 20px;
  `)}

  ${mq.ltSmallMobile(css`
    margin-${/* sc-custom "left" */ left}: 0;
  `)}
`;

type SearchForm = {|
  mode: string,
  destination: { type: string, name: string },
  checkIn: Date,
  checkOut: Date | null,
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
  testResponse?: HeaderLink[],
  splitster: $FlowFixMe, // TODO specify types
  onFetch?: (services: $FlowFixMe) => void, // TODO specify types
  // context
  context: Context<"Header links error", null>,
|};

type State = {|
  services: HeaderLink[] | null,
|};

class HeaderLinks extends React.Component<Props, State> {
  state = {
    services: null,
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
      testResponse,
      splitster,
      onFetch,
      context,
    } = this.props;

    if (testResponse) {
      this.setState({ services: testResponse });
      return;
    }

    try {
      const services = await getNavBarLinks({
        searchString,
        language,
        currency,
        searchForm,
        splitster,
      });

      this.setState({ services: services.items });
      if (onFetch) {
        onFetch(services);
      }
    } catch (err) {
      context.log({ event: "Header links error", data: err });
    }
  };

  render() {
    const { services } = this.state;

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

const WithLogHeaderLinks: Decorated<Props> = withLog(HeaderLinks);

export default WithLogHeaderLinks;
