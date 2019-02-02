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
import type { HeaderLink, SearchForm } from "./records/HeaderLink";
import LogContext from "../../services/log/context";
import type { Context } from "../../services/log/context";
import type { Splitster, Response } from "./services/api";

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
|};

type State = {|
  services: HeaderLink[] | null,
|};

export default class HeaderLinks extends React.Component<Props, State> {
  static contextType = LogContext;

  state = {
    services: null,
  };

  componentDidMount() {
    this.getNavBarLinks();
  }

  getNavBarLinks = async () => {
    const { languageId, currencyId, searchForm, testResponse, splitster, onFetch } = this.props;
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
      });

      this.setState({ services: services.items });
      if (onFetch) {
        onFetch(services);
      }
    } catch (err) {
      log({ event: "Header links error", data: err });
    }
  };

  context: Context<"Header links error", null>;

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
                  <IconWrapper act={open} hover onClick={onToggle}>
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
