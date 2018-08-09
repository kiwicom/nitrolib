// @flow strict
import * as React from "react";
import styled from "styled-components";
import { storiesOf } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs/react";
import { action } from "@storybook/addon-actions";

import Currency from "../src/components/Currency";
import * as currencyContext from "../src/services/currency/context";
import { countryDefault } from "../src/records/Country";

const countries = {
  gb: countryDefault,
};

const whitelist = [
  "eur",
  "gbp",
  "czk",
  "aed",
  "amd",
  "aud",
  "bhd",
  "brl",
  "byn",
  "cad",
  "chf",
  "clp",
  "cny",
];

const state = {
  current: "eur",
};

const CurrencyWithContext = props => (
  <currencyContext.Provider
    affiliate=""
    countries={countries}
    initialCurrency={state.current}
    ip="123.45.67.89"
    langCurrency="eur"
    onChange={code => {
      state.current = code;
      action("currency changed")(code);
    }}
    whitelist={whitelist}
  >
    <Currency {...props} />
  </currencyContext.Provider>
);

const RegularWrap = styled.div`
  float: right;
  margin-right: 200px;
`;

storiesOf("Currency", module)
  .addDecorator(withKnobs)
  .add("regular", () => (
    <RegularWrap>
      <CurrencyWithContext />
    </RegularWrap>
  ))
  .add("native", () => <CurrencyWithContext native />);
