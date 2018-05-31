// @flow strict
import * as React from "react";
import * as R from "ramda";
import styled from "styled-components";

import * as fetchedContext from "client/services/fetched/context";
import * as intlContext from "client/services/intl/context";
import type { Currency, Currencies } from "client/records/Currency";
import type { GeoDataQueryResponse } from "client/components/GeoData/__generated__/GeoDataQuery.graphql";
import getGeoIPCountry from "client/services/session/getGeoIPCountry";
import { BORDER_RADIUS } from "client/consts/layout";
import mq from "client/services/utils/mediaQuery";
import { brandDefault } from "client/records/Brand";
import getRecommended from "./services/getRecommended";
import CurrencyList from "./CurrencyList";

type Props = {|
  current: Currency,
  available: Currencies,
  setCurrency: string => void,
  geoIP: ?GeoDataQueryResponse,
  hide: () => void,
|};

const Container = styled.div`
  position: absolute;
  right: 0;
  width: calc(100% - 40px);
  max-height: calc(100vh - 200px);
  margin 0 20px;
  box-sizing: border-box;
  padding: 15px 12px;
  overflow-y: scroll;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, .1);
  border-radius: ${BORDER_RADIUS}px;
  background: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors["grey-800"]};

  ${mq.gtTablet`
    width: 500px;
    padding: 20px;
    margin: 0;
    max-height: calc(100vh - 60px);
    overflow-y: auto;
  `}

  ${mq.tablet`
    right: 0; /* TODO: RTL */
    left: inherit; /* TODO: RTL */
  `}

  ${mq.gtDesktop`
    left: -290px; /* TODO: RTL */
    right: inherit; /* TODO: RTL */
  `}
`;

const Recommended = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 13px;
  margin-bottom: 12px;

  &:after {
    position: absolute;
    bottom: 0;
    left: 0;
    display: block;
    content: "";
    width: calc(100% - 10px);
    height: 1px;
    margin: 0 5px;
    background: ${props => props.theme.colors["grey-200"]};
  }
`;

Recommended.defaultProps = {
  theme: brandDefault.theme,
};

class Menu extends React.Component<Props> {
  setCurrency = (code: string) => {
    // TODO: logging
    this.props.setCurrency(code);
    this.props.hide();
  };

  render() {
    const { current, available, geoIP } = this.props;

    return (
      <fetchedContext.Consumer>
        {/* istanbul ignore next */
        ({ countries }) => (
          <intlContext.Consumer>
            {({ language }) => {
              const recommended = getRecommended(
                getGeoIPCountry(geoIP, countries),
                language,
                available,
              );

              return (
                <Container>
                  {!R.isEmpty(recommended) && (
                    <Recommended>
                      <CurrencyList
                        currencies={recommended}
                        active={current}
                        setCurrency={this.setCurrency}
                      />
                    </Recommended>
                  )}
                  <CurrencyList
                    currencies={available}
                    active={current}
                    setCurrency={this.setCurrency}
                  />
                </Container>
              );
            }}
          </intlContext.Consumer>
        )}
      </fetchedContext.Consumer>
    );
  }
}

export default Menu;
