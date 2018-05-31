// @flow strict
import * as React from "react";
import { withRouter } from "react-router-dom";
import type { ContextRouter } from "react-router-dom";

import { currencyDefault } from "client/records/Currency";
import type { Currencies } from "client/records/Currency";
import type { Countries } from "client/records/Country";
import getAffiliate from "client/services/session/getAffiliate";
import getIP from "client/services/session/getIP";
import getGeoIPCountry from "client/services/session/getGeoIPCountry";
import environment from "client/services/environment";
import getAvailableCurrencies from "./services/getAvailableCurrencies";
import getRequestCurrency from "./services/getRequestCurrency";
import resolveRates from "./services/resolveRates";
import resolveCurrency from "./services/resolveCurrency";
import * as store from "./services/store";
import fetchGeoData from "./services/CurrencyGeo";
import fetchRatesData from "./services/CurrencyRates";

type Props = {|
  all: Currencies,
  fromLanguage: string,
  countries: Countries,
  environment: typeof environment,
  children: React.Node,
  ...ContextRouter,
|};

type State = {|
  selected: ?string,
  available: Currencies,
  fromCountry: ?string,
|};

const { Consumer, Provider } = React.createContext({
  current: currencyDefault,
  available: { eur: currencyDefault },
  setCurrency: () => {},
});

export class CurrencyProvider extends React.PureComponent<Props, State> {
  static defaultProps = {
    environment,
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      selected: null,
      fromCountry: null,
      available: getAvailableCurrencies(props.all, getAffiliate(props.location.search)),
    };
  }

  componentDidMount() {
    if (!getRequestCurrency(this.props.location.search)) {
      this.fetchFromCountry();
    }

    this.updateRates();
  }

  setCurrency = (code: string) => {
    if (this.state.available[code]) {
      this.setState({ selected: code });
      store.saveValue(code);
    }
  };

  fetchFromCountry = () => {
    const { environment: activeEnvironment, location, countries } = this.props;

    fetchGeoData(activeEnvironment, getIP(location.search)).then(data => {
      const country = getGeoIPCountry(data, countries, null);

      if (country) {
        this.setState({ fromCountry: country.currency });
      }
    });
  };

  updateRates = () => {
    fetchRatesData(this.props.environment).then(data => {
      this.setState({
        // presumption: available never changes
        available: resolveRates(data, this.state.available),
      });
    });
  };

  render() {
    const { all, fromLanguage, location } = this.props;
    const { selected, available, fromCountry } = this.state;

    const current = resolveCurrency(all, available, [
      selected,
      getRequestCurrency(location.search),
      fromCountry,
      fromLanguage,
    ]);

    return (
      <Provider
        value={{
          current,
          available,
          setCurrency: this.setCurrency,
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

const CurrencyProviderWithRouter = withRouter(CurrencyProvider);

export { Consumer, CurrencyProviderWithRouter as Provider };
