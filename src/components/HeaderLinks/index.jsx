// @flow strict
import * as React from "react";
import Airplane from "@kiwicom/orbit-components/lib/icons/Airplane";
import AirplaneUp from "@kiwicom/orbit-components/lib/icons/AirplaneUp";
import ChevronDown from "@kiwicom/orbit-components/lib/icons/ChevronDown";
import styled, { css } from "styled-components";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import mq from "@kiwicom/orbit-components/lib/utils/mediaQuery";

// Components
import Toggle from "../Toggle";
import Popup from "./primitives/Popup";
import IconWrapper from "./primitives/IconWrapper";
import Links from "./components/Links";
// Services
import ClickOutside from "../ClickOutside";
import getNavBarLinks from "./services/api";
import checkSearchFormChange from "./services/checkSearchFormChange";
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
  newDesign?: boolean,
  onClick?: (item: HeaderLink) => void,
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

  componentDidUpdate(prevProps: Props) {
    const { searchForm } = this.props;

    // Props which trigger re-render on change
    const updateOnPropsChange = [["destination", "slug"], ["checkIn"], ["checkOut"]];

    // Check if props got changed
    const searchFormChanged = checkSearchFormChange(
      prevProps.searchForm,
      searchForm,
      updateOnPropsChange,
    );

    if (searchFormChanged) {
      this.getNavBarLinks();
    }
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
    const { inverted, active, newDesign, onClick } = this.props;
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
                      <Stack direction="column" spacing="comfy">
                        <Links
                          inverted={inverted}
                          newDesign={newDesign}
                          services={services}
                          active={active}
                          onClick={onClick}
                        />
                      </Stack>
                    </Popup>
                  )}
                  {services && services.length > 0 && (
                    <IconWrapper
                      aria-label="open"
                      act={open}
                      inverted={inverted}
                      onClick={onToggle}
                    >
                      {newDesign ? <Airplane /> : <AirplaneUp />}
                      <ChevronDown size="small" />
                    </IconWrapper>
                  )}
                </>
              </ClickOutside>
            )}
          </Toggle>
        </Mobile>
        <Desktop>
          {services && services.length > 0 && (
            <Stack flex spacing="comfy">
              <Links
                inverted={inverted}
                newDesign={newDesign}
                services={services}
                active={active}
                onClick={onClick}
              />
            </Stack>
          )}
        </Desktop>
      </>
    );
  }
}
