// @flow strict
/* eslint-disable react/no-unused-prop-types, react/no-unused-state */
import * as React from "react";

import { save, load } from "../../services/session/cookies";
import { CURRENCY_ID } from "../../consts/cookies";
import type { Brand } from "../../records/Brand";
import type { Currency, Currencies } from "../../records/Currency";
import { currencyDefault, MOST_USED_CURRENCIES } from "../../records/Currency";
import type { Countries } from "../../records/Country";
import getGeoCountryCall from "./services/getGeoCountry";
import init from "../../services/currency/init";
import getCurrenciesCall from "../../services/currency/getAll";
import rewriteCurrencies from "../../services/currency/services/rewriteCurrencies";

type Arg = {|
  currency: Currency,
  available: Currencies,
  recommended: Currency[],
  onChange: (code: string) => void,
|};

type Props = {|
  brand: Brand,
  countries: Countries,
  affiliate: string,
  ip: string,
  langCurrency: string,
  children: (arg: Arg) => React.Node,
  onChange: (currency: string) => void,
  // defaulted
  mostUsed: string[],
  // DI
  getCurrencies: typeof getCurrenciesCall,
  getGeoCountry: typeof getGeoCountryCall,
  url?: string,
|};

type State = {|
  currency: Currency | null,
  loading: boolean,
  all: Currencies,
  available: Currencies,
  recommended: Currency[],
  country: string,
|};

// FIXME try to rewrite to Relay
// would require too much 'Currencies' type refactoring, so not done immediately
export default class CurrencyProvider extends React.PureComponent<Props, State> {
  static defaultProps = {
    mostUsed: MOST_USED_CURRENCIES,
    getCurrencies: getCurrenciesCall,
    getGeoCountry: getGeoCountryCall,
  };

  state = {
    currency: null,
    loading: false,
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

    const countryCurrency = props.countries[state.country].currency || "";
    const languageCurrency = props.langCurrency;

    return init({
      currencies: state.all,
      initialCurrency: load(CURRENCY_ID) || "eur",
      countryCurrency,
      languageCurrency,
      affiliate: props.affiliate,
      brandCurrencies: props.brand.payments.whitelisted_currencies,
      mostUsedCurrencies: props.mostUsed,
    });
  }

  handleChange = (code: string) => {
    const { available } = this.state;
    const { onChange } = this.props;

    save(CURRENCY_ID, code);

    const currency = available[code];
    if (currency) {
      this.setState({ currency });
      onChange(code);
    }
  };

  async loadData() {
    const { getCurrencies, getGeoCountry, ip, url } = this.props;

    this.setState({ loading: true });

    const [all, country] = await Promise.all([
      getCurrencies({ options: { url } }),
      getGeoCountry(ip),
    ]);

    this.setState({ loading: false, all: rewriteCurrencies(all), country });
  }

  render() {
    const { currency, available, recommended } = this.state;
    const { children } = this.props;

    if (!currency) {
      return children({
        currency: currencyDefault,
        available: {},
        recommended: [],
        onChange: () => {},
      });
    }

    return children({
      currency,
      available,
      recommended,
      onChange: this.handleChange,
    });
  }
}
