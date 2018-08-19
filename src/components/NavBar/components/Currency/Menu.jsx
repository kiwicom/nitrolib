// @flow strict
import * as React from "react";
import * as R from "ramda";
import styled, { css } from "styled-components";
import { graphql, createFragmentContainer } from "react-relay";

import type { ThemeProps } from "records/Theme";
import * as fetchedContext from "services/fetched/context";
import * as intlContext from "services/intl/context";
import type { Currency, Currencies } from "records/Currency";
import { themeDefault } from "records/Theme";
import mq from "styles/mediaQuery";
import getRecommended from "./services/getRecommended";
import CurrencyList from "./CurrencyList";
import type { MenuList_list } from "./__generated__/MenuList_list.graphql";
import type { MenuGeo_geo } from "./__generated__/MenuGeo_geo.graphql";

type Props = {|
  current: Currency,
  available: Currencies,
  list: MenuList_list,
  geo: MenuGeo_geo,
  onSetCurrency: (code: string) => void,
  onHide: () => void,
|};

const Container = styled.div`
  position: absolute;
  right: 0;
  width: calc(100% - 40px);
  max-height: calc(100vh - 200px);
  margin: 0 20px;
  box-sizing: border-box;
  padding: 15px 12px;
  overflow-y: scroll;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, .1);
  border-radius: 3px;
  background: ${({ theme }: ThemeProps) => theme.orbit.paletteWhite};
  color: ${({ theme }: ThemeProps) => theme.orbit.paletteInkNormal};

  ${mq.gtTablet(css`
    width: 500px;
    padding: 20px;
    margin: 0;
    max-height: calc(100vh - 60px);
    overflow-y: auto;
  `)}

  ${mq.tablet(css`
    right: 0; /* TODO: RTL */
    left: inherit; /* TODO: RTL */
  `)}

  ${mq.gtDesktop(css`
    left: -290px; /* TODO: RTL */
    right: inherit; /* TODO: RTL */
  `)}
`;

Container.defaultProps = {
  theme: themeDefault,
};

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
    background: ${({ theme }: ThemeProps) => theme.orbit.paletteCloudNormal};
  }
`;

Recommended.defaultProps = {
  theme: themeDefault,
};

class Menu extends React.Component<Props> {
  handleSetCurrency = (code: string) => {
    // TODO: logging
    const { onSetCurrency, onHide } = this.props;

    onSetCurrency(code);
    onHide();
  };

  render() {
    const { current, available, geo, list } = this.props;

    return (
      <fetchedContext.Consumer>
        {({ countries }) => (
          <intlContext.Consumer>
            {({ language }) => {
              // TODO turn this into an array of common recommended, and a country one
              // then supply to 'CurrencyList' as an optional prop and filter there
              const recommended = getRecommended(
                countries[geo.isoCountryCode || ""],
                language,
                available,
              );

              return (
                <Container>
                  {!R.isEmpty(recommended) && (
                    <Recommended>
                      {/* $FlowIssue */}
                      <CurrencyList
                        list={list}
                        available={recommended}
                        active={current}
                        onSetCurrency={this.handleSetCurrency}
                      />
                    </Recommended>
                  )}
                  {/* $FlowIssue */}
                  <CurrencyList
                    list={list}
                    available={available}
                    active={current}
                    onSetCurrency={this.handleSetCurrency}
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

export const MenuUnwrapped = Menu;

export default createFragmentContainer(
  Menu,
  graphql`
    fragment MenuList_list on CurrencyDetailConnection {
      ...CurrencyList_list
    }

    fragment MenuGeo_geo on GeoIP {
      isoCountryCode
    }
  `,
);
