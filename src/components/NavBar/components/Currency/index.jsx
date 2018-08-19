// @flow strict
import * as React from "react";
import styled, { css } from "styled-components";
import { graphql, QueryRenderer } from "react-relay";

import Button from "../../primitives/Button";
import environmentReal from "services/environment";
import * as currencyContext from "services/currency/context";
import ClickOutside from "components/ClickOutside";
import mq from "styles/mediaQuery";
import Current from "./Current";
import Menu from "./Menu";

const Container = styled.div`
  ${mq.gtDesktop(css`
    position: relative;
  `)};
`;

type Props = {|
  // DI
  environment: typeof environmentReal,
|};

type State = {|
  shown: boolean,
|};

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
    const { shown } = this.state;

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

          return (
            <currencyContext.Consumer>
              {({ currency, available, setCurrency }) => (
                <Container>
                  <Button onClick={this.handleToggle}>
                    <Current currency={currency} />
                  </Button>

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
