// @flow strict
/* eslint-disable react/no-unused-prop-types, react/no-unused-state */
import * as React from "react";
import idx from "idx";

import { currencyDefault, MOST_USED_CURRENCIES } from "../../records/Currency";
import type { Currency, Currencies } from "../../records/Currency";
import type { Countries } from "../../records/Country";
import filterCurrencies from "./services/filterCurrencies";
import resolveCurrency from "./services/resolveCurrency";
import getGeoCountryCall from "./services/getGeoCountry";
import getCurrenciesCall from "./services/getCurrencies";
import getCandidate from "./services/getCandidate";
import getRecommended from "./services/getRecommended";

type Props = {|
  whitelist: string[],
  countries: Countries,
  affiliate: string,
  ip: string,
  initialCurrency: string,
  langCurrency: string,
  mostUsed: string[],
  children: React.Node,
  onChange: string => void,
  // DI
  getCurrencies: typeof getCurrenciesCall,
  getGeoCountry: typeof getGeoCountryCall,
|};

type State = {|
  currency: ?Currency,
  all: Currencies,
  available: Currencies,
  recommended: Currency[],
  country: string,
|};

type Context = {|
  currency: Currency,
  available: Currencies,
  recommended: Currency[],
  setCurrency: (code: string) => void,
|};

const { Consumer, Provider } = React.createContext(
  ({
    currency: currencyDefault,
    available: { eur: currencyDefault },
    recommended: [],
    setCurrency: () => {},
  }: Context),
);

// FIXME try to rewrite to Relay
// would require too much 'Currencies' type refactoring, so not done immediately
export class CurrencyProvider extends React.PureComponent<Props, State> {
  static defaultProps = {
    mostUsed: MOST_USED_CURRENCIES,
    getCurrencies: getCurrenciesCall,
    getGeoCountry: getGeoCountryCall,
  };

  state = {
    currency: null,
    all: {},
    available: {},
    recommended: [],
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

    const countryCurrency = idx(props.countries, _ => _[state.country].currency) || "";
    const languageCurrency = props.langCurrency;

    const candidate = getCandidate({
      initial: props.initialCurrency,
      country: countryCurrency,
      lang: languageCurrency,
    });

    const available = filterCurrencies(props.affiliate, props.whitelist, state.all);

    const recommended = getRecommended(
      countryCurrency,
      languageCurrency,
      props.mostUsed,
      available,
    );

    return {
      currency: resolveCurrency(state.all, available, candidate),
      available,
      recommended,
    };
  }

  setCurrency = (code: string) => {
    const { available } = this.state;
    const { onChange } = this.props;

    const currency = available[code];
    if (currency) {
      this.setState({ currency });
      onChange(code);
    }
  };

  async loadData() {
    const { getCurrencies, getGeoCountry, ip } = this.props;

    const [all, country] = await Promise.all([getCurrencies(), getGeoCountry(ip)]);

    this.setState({ all, country });
  }

  render() {
    const { currency, available, recommended } = this.state;
    const { children } = this.props;

    if (!currency) {
      return children;
    }

    return (
      <Provider
        value={{
          currency,
          available,
          recommended,
          setCurrency: this.setCurrency,
        }}
      >
        {children}
      </Provider>
    );
  }
}

export { Consumer, CurrencyProvider as Provider };
