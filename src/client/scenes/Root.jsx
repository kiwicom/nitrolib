/* @flow */
import React from "react";
import styled from "styled-components";
import { hot } from "react-hot-loader";

import Day from "../public/Day";
import Num from "../public/Num";
import Price from "../public/Price";
import Text from "../public/Text";
import Time from "../public/Time";
import { brandDefault } from "../records/Brand";
import * as brandContext from "../services/brand/context";
import * as intlContext from "../services/intl/context";

const H1 = styled.h1`
  margin-top: 0;
`;

const Div = styled.div`
  background: ${props => props.theme.colors["primary-500"]};
`;

Div.defaultProps = {
  theme: brandDefault.theme,
};

// TODO add currency to state, take from cookies, don't render initially
const Root = () => (
  <brandContext.Consumer>
    {brand => (
      <intlContext.Consumer>
        {intl => (
          <Div>
            <H1>{brand.name}</H1>
            <h3>Locale: {intl.language.id}</h3>
            <Text t={__("Do you even lift?")} />
            <br />
            <Day date={new Date()} />
            <br />
            <Num value={1337} />
            <br />
            <Time time={new Date()} />
            <br />
            <Price value={1337} currency="EUR" />
          </Div>
        )}
      </intlContext.Consumer>
    )}
  </brandContext.Consumer>
);

// eslint-disable-next-line no-undef
export default hot(module)(Root);
