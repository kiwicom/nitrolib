// @flow strict
import * as React from "react";
import styled from "styled-components";

import environment from "client/services/environment";
import * as currencyContext from "client/services/currency/context";
import { brandDefault } from "client/records/Brand";
import type { ThemeProps } from "client/records/Brand";
import GeoData from "client/components/GeoData";
import ClickOutside from "client/components/ClickOutside/index";
import mq from "client/services/utils/mediaQuery";
import CurrencyItem from "./CurrencyItem";
import Menu from "./Menu";

type Props = {|
  environment: typeof environment,
|};

type State = {|
  shown: boolean,
|};

const Container = styled.div`
  ${mq.gtDesktop`
    position: relative;
  `};
`;

const OpenButton = styled.div`
  cursor: pointer;

  ${Container}:hover & {
    color: ${(props: ThemeProps) => props.theme.colors["primary-600"]};
  }
`;

OpenButton.defaultProps = {
  theme: brandDefault,
};

class Currency extends React.Component<Props, State> {
  static defaultProps = {
    environment,
  };

  state = {
    shown: false,
  };

  handleToggle = () => {
    this.setState({ shown: !this.state.shown });
  };

  hide = () => {
    this.setState({ shown: false });
  };

  render() {
    return (
      <GeoData
        environment={this.props.environment}
        render={res => (
          <currencyContext.Consumer>
            {({ current, available, setCurrency }) => (
              <Container>
                <OpenButton onClick={this.handleToggle}>
                  <CurrencyItem currency={current} separatorSign=" - " />
                </OpenButton>

                {this.state.shown && (
                  <ClickOutside onClickOutside={this.hide}>
                    <Menu
                      current={current}
                      available={available}
                      setCurrency={setCurrency}
                      geoIP={res.props}
                      hide={this.hide}
                    />
                  </ClickOutside>
                )}
              </Container>
            )}
          </currencyContext.Consumer>
        )}
      />
    );
  }
}

export default Currency;
