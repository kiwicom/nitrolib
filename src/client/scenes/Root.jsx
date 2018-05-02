// @flow strict
import React from "react";
import styled from "styled-components";
import { hot } from "react-hot-loader";

import Day from "../components/Day";
import Modal from "../components/Modal";
import Price from "../components/Price";
import Text from "../components/Text";
import Time from "../components/Time";
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
            <span>
              Translated number: <Text t={__("common.number")} />
            </span>
            <br />
            <Day date={new Date()} />
            <br />
            <Time time={new Date()} />
            <br />
            <Modal>
              <h3>Modal</h3>
            </Modal>
            <Price value={1337} currency="EUR" />
          </Div>
        )}
      </intlContext.Consumer>
    )}
  </brandContext.Consumer>
);

// eslint-disable-next-line no-undef
export default hot(module)(Root);
