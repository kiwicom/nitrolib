// @flow strict
import * as React from "react";
import styled from "styled-components";
import { graphql, QueryRenderer } from "react-relay";

import environmentReal from "client/services/environment";
import * as currencyContext from "client/services/currency/context";
import { brandDefault } from "client/records/Brand";
import type { ThemeProps } from "client/records/Brand";
import ClickOutside from "client/components/ClickOutside/index";
import mq from "client/services/utils/mediaQuery";
import Current from "./Current";
import Menu from "./Menu";

type Props = {|
  environment: typeof environmentReal,
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
    color: ${({ theme }: ThemeProps) => theme.colors["primary-600"]};
  }
`;

OpenButton.defaultProps = {
  theme: brandDefault,
};

class Currency extends React.Component<Props, State> {
  static defaultProps = {
    environment: environmentReal,
  };

  state = {
    shown: false,
  };

  handleToggle = () => {
    this.setState(state => ({ shown: !state.shown }));
  };

  handleHide = () => {
    this.setState({ shown: false });
  };

  render() {
    const { environment } = this.props;

    return (
      <QueryRenderer
        query={graphql`
          query CurrencyQuery($ip: IP!) {
            currencies {
              ...MenuList_list
            }

            geoIP(ip: $ip) {
              ...MenuGeo_geo
            }
          }
        `}
        environment={environment}
        variables={{ ip: "1.2.3.4" /* TODO remove once 'geoIP' can exist without a variable */ }}
        render={res => {
          if (res.error) {
            // TODO
            console.error(res.error);
            return <span>Error :(</span>;
          }

          if (!res.props) {
            // TODO
            return null;
          }

          const { shown } = this.state;

          return (
            <currencyContext.Consumer>
              {({ currency, available, setCurrency }) => (
                <Container>
                  <OpenButton onClick={this.handleToggle}>
                    <Current currency={currency} />
                  </OpenButton>

                  {shown && (
                    <ClickOutside onClickOutside={this.handleHide}>
                      <Menu
                        current={currency}
                        available={available}
                        onSetCurrency={setCurrency}
                        onHide={this.handleHide}
                        /* $FlowIssue */
                        list={res.props.currencies}
                        /* $FlowIssue */
                        geo={res.props.geoIP}
                      />
                    </ClickOutside>
                  )}
                </Container>
              )}
            </currencyContext.Consumer>
          );
        }}
      />
    );
  }
}

export default Currency;
