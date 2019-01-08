// @flow strict
import * as React from "react";
import Airplane from "@kiwicom/orbit-components/lib/icons/Airplane";
import ChevronDown from "@kiwicom/orbit-components/lib/icons/ChevronDown";
import styled, { css } from "styled-components";
import { left } from "@kiwicom/orbit-components/lib/utils/rtl";
import Text from "@kiwicom/orbit-components/lib/Text";

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
import type { HeaderLink, SearchForm } from "./records/HeaderLink";
import type { Decorated } from "../../services/log/decorator";
import type { Context } from "../../services/log/context";
import type { Splitster, Response } from "./services/api";

const Margin = styled.div`
  ${mq.ltDesktop(css`
    margin-${/* sc-custom "left" */ left}: 20px;
  `)}

  ${mq.ltSmallMobile(css`
    margin-${/* sc-custom "left" */ left}: 0;
  `)}
`;

type Props = {|
  searchString: string,
  languageId: string,
  currencyId: string,
  searchForm: SearchForm | null,
  splitster: Splitster,
  onFetch?: (services: Response) => void,
  inverted?: boolean,
  testResponse?: Response, // TODO solve using DI
  // context
  context: Context<"Header links error", null>, // TODO consts or whatever
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
      languageId,
      currencyId,
      searchForm,
      testResponse,
      splitster,
      onFetch,
      context,
    } = this.props;

    if (testResponse) {
      this.setState({ services: testResponse.items });
      return;
    }

    try {
      const services = await getNavBarLinks({
        searchString,
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
      context.log({ event: "Header links error", data: err });
    }
  };

  render() {
    const { inverted } = this.props;
    const { services } = this.state;

    if (!services) return null;

    return (
      // 'StyledLink' css was heavily incompatible with 'Text', so it had to be moved here
      // TODO cleanup @viktr
      <Text element="div">
        <Mobile display="flex">
          <Margin>
            <Toggle>
              {({ open, onToggle }) => (
                <>
                  {open && (
                    <ClickOutside onClickOutside={onToggle}>
                      <Popup>
                        {services && services.length > 0 && (
                          <Links inverted={inverted} services={services} />
                        )}
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
          {services && services.length > 0 && <Links inverted={inverted} services={services} />}
        </Desktop>
      </Text>
    );
  }
}

const WithLogHeaderLinks: Decorated<Props> = withLog(HeaderLinks);

export default WithLogHeaderLinks;
