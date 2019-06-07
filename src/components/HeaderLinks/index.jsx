// @flow strict
import * as React from "react";
import AirplaneUp from "@kiwicom/orbit-components/lib/icons/AirplaneUp";
import ChevronDown from "@kiwicom/orbit-components/lib/icons/ChevronDown";
import styled, { css } from "styled-components";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import mq from "@kiwicom/orbit-components/lib/utils/mediaQuery";

import ClickOutside from "../ClickOutside";
import Toggle from "../Toggle";
import Popup from "./primitives/Popup";
import IconWrapper from "./primitives/IconWrapper";
import Links from "./components/Links";
import getNavBarLinks from "./services/api";
import type { HeaderLink, SearchForm, HeaderLinksContext } from "./records/HeaderLink";
import LogContext from "../../services/log/context";
import type { Context } from "../../services/log/context";
import type { Splitster, Response } from "./services/api";
import { HEADER_LINKS_ERROR } from "./consts/events";

// Different size than the existing component
const Mobile = styled.div`
  display: flex;

  ${mq.desktop(css`
    display: none;
  `)};
`;

// Different size than the existing component
const Desktop = styled.div`
  display: none;

  ${mq.desktop(css`
    display: flex;
  `)};
`;

type Props = {|
  languageId: string,
  currencyId: string,
  searchForm: SearchForm | null,
  splitster: Splitster,
  active?: string,
  inverted?: boolean,
  onFetch?: (services: Response) => void,
  testResponse?: Response, // TODO solve using DI
  context?: HeaderLinksContext,
|};

type State = {|
  services: HeaderLink[] | null,
|};

export default class HeaderLinks extends React.Component<Props, State> {
  static contextType = LogContext;

  state = {
    services: null,
  };

  context: Context;

  componentDidMount() {
    this.getNavBarLinks();
  }

  getNavBarLinks = async () => {
    const {
      languageId,
      currencyId,
      searchForm,
      testResponse,
      splitster,
      onFetch,
      context,
    } = this.props;
    const { log } = this.context;

    if (testResponse) {
      this.setState({ services: testResponse.items });
      return;
    }

    try {
      const services = await getNavBarLinks({
        languageId,
        currencyId,
        searchForm,
        splitster,
        context,
      });

      this.setState({ services: services.items });
      if (onFetch) {
        onFetch(services);
      }
    } catch (err) {
      log(HEADER_LINKS_ERROR, { error: String(err) });
    }
  };

  render() {
    const { inverted, active } = this.props;
    const { services } = this.state;

    if (!services) return null;

    return (
      <>
        <Mobile>
          <Toggle>
            {({ open, onToggle }) => (
              <ClickOutside active={open} onClickOutside={onToggle}>
                <>
                  {open && (
                    <Popup>
                      {services && services.length > 0 && (
                        <Stack direction="column" spacing="comfy">
                          <Links inverted={inverted} services={services} active={active} />
                        </Stack>
                      )}
                    </Popup>
                  )}
                  <IconWrapper act={open} inverted={inverted} onClick={onToggle}>
                    <AirplaneUp />
                    <ChevronDown size="small" />
                  </IconWrapper>
                </>
              </ClickOutside>
            )}
          </Toggle>
        </Mobile>
        <Desktop>
          {services && services.length > 0 && (
            <Stack flex>
              <Links inverted={inverted} services={services} active={active} />
            </Stack>
          )}
        </Desktop>
      </>
    );
  }
}
