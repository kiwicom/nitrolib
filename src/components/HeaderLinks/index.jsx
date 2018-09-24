// @flow strict
import * as React from "react";
import Airplane from "@kiwicom/orbit-components/lib/icons/Airplane";
import ChevronDown from "@kiwicom/orbit-components/lib/icons/ChevronDown";
import styled, { css } from "styled-components";
import { left } from "@kiwicom/orbit-components/lib/utils/rtl";

import mq from "../../styles/mq";
import ClickOutside from "../ClickOutside";
import Toggle from "../Toggle";
import Popup from "./primitives/Popup";
import IconWrapper from "./primitives/IconWrapper";
import Links from "./Links";
import Desktop from "../Desktop";
import Mobile from "../Mobile";
import { Consumer as InvertedConsumer } from "../../services/inverted/context";
import { getNavBarLinks } from "./services/api";

const Margin = styled.div`
  ${mq.ltDesktop(css`
    margin-${left}: 20px;
  `)}
  ${mq.ltSmallMobile(css`
    margin-${left}: 0;
  `)}
`;

const LtDesktop = styled.div`
  display: none;
  ${mq.ltDesktop(css`
    display: flex;
  `)}
`;

const GtDesktop = styled.div`
  display: none;
  ${mq.gtDesktop(css`
    display: flex;
  `)}
`;

// TODO: edit this
type Services = any;

type State = {|
  services: ?Services,
|};

type Props = {|
  currency: string,
  language: string,
  adultsCount: number,
  childrenCount: number,
  aid: boolean,
|};

class HeaderLinks extends React.Component<Props, State> {
  state = {
    services: null,
  };

  static defaultProps = {
    currency: "EUR",
    language: "HR",
    adultsCount: 1,
    childrenCount: 0,
    aid: true,
  };

  componentDidMount() {
    this.getNavBarLinks();
  }

  getNavBarLinks = async () => {
    try {
      // Fetch services
      const services: any = await getNavBarLinks();

      // Update state
      this.setState({ services });
    } catch (e) {
      // TODO: Track error
    }
  };

  render() {
    const { currency, language, adultsCount, childrenCount, aid } = this.props;
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
                          services={services}
                          currency={currency}
                          language={language}
                          childrenCount={childrenCount}
                          adultsCount={adultsCount}
                          aid={aid}
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
            services={services}
            currency={currency}
            language={language}
            childrenCount={childrenCount}
            adultsCount={adultsCount}
            aid={aid}
          />
        </Desktop>
      </>
    );
  }
}

export default HeaderLinks;
