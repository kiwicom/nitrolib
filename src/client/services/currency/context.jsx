// @flow strict
/* eslint-disable react/no-unused-prop-types, react/no-unused-state */
import * as React from "react";
import idx from "idx";

import { currencyDefault } from "client/public/records/Currency";
import type { Currency, Currencies } from "client/public/records/Currency";
import type { Countries } from "client/public/records/Country";
import filterCurrencies from "./services/filterCurrencies";
import resolveCurrency from "./services/resolveCurrency";
import * as store from "./services/store";
import getGeoCountryCall from "./services/getGeoCountry";
import getCurrenciesCall from "./services/getCurrencies";
import getCandidate from "./services/getCandidate";

type Props = {|
  whitelist: string[],
  countries: Countries,
  affiliate: string,
  ip: string,
  initialCurrency: string,
  langCurrency: string,
  children: React.Node,
  // DI
  getValue: typeof store.getValue,
  saveValue: typeof store.saveValue,
  getCurrencies: typeof getCurrenciesCall,
  getGeoCountry: typeof getGeoCountryCall,
|};

type State = {|
  currency: ?Currency,
  all: Currencies,
  available: Currencies,
  country: string,
|};

type Context = {|
  currency: Currency,
  available: Currencies,
  setCurrency: (code: string) => void,
|};

const { Consumer, Provider } = React.createContext(
  ({
    currency: currencyDefault,
    available: { eur: currencyDefault },
    setCurrency: () => {},
  }: Context),
);

// FIXME try to rewrite to Relay
// would require too much 'Currencies' type refactoring, so not done immediately
export class CurrencyProvider extends React.PureComponent<Props, State> {
  static defaultProps = {
    getValue: store.getValue,
    saveValue: store.saveValue,
    getCurrencies: getCurrenciesCall,
    getGeoCountry: getGeoCountryCall,
  };

  state = {
    currency: null,
    all: {},
    available: {},
    country: "",
  };

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(props: Props, state: State) {
    if (!state.all) {
      this.loadData();
    }
  }

  static getDerivedStateFromProps(props: Props, state: State) {
    if (state.currency !== null) {
      return null;
    }

    if (!state.all || !state.country) {
      return null;
    }

    const candidate = getCandidate({
      initial: props.initialCurrency,
      country: idx(props.countries, _ => _[state.country].currency) || "",
      lang: props.langCurrency,
    });

    const available = filterCurrencies(props.affiliate, props.whitelist, state.all);

    return {
      currency: resolveCurrency(state.all, available, candidate),
      available,
    };
  }

  setCurrency = (code: string) => {
    const { available } = this.state;
    const { saveValue } = this.props;

    const currency = available[code];
    if (currency) {
      this.setState({ currency });
      saveValue(code);
    }
  };

  async loadData() {
    const { getCurrencies, getGeoCountry, ip } = this.props;

    const [all, country] = await Promise.all([getCurrencies(), getGeoCountry(ip)]);

    this.setState({ all, country });
  }

  render() {
    const { currency, available } = this.state;
    const { children } = this.props;

    if (!currency) {
      return children;
    }

    return (
      <Provider
        value={{
          currency,
          available,
          setCurrency: this.setCurrency,
        }}
      >
        {children}
      </Provider>
    );
  }
}

export { Consumer, CurrencyProvider as Provider };
