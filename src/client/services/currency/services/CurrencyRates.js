// @flow strict
import { fetchQuery, graphql } from "relay-runtime";
import type { Environment } from "relay-runtime";

const query = graphql`
  query CurrencyRatesQuery {
    currencies {
      edges {
        node {
          code
          rate
        }
      }
    }
  }
`;

const currencyRates = (environment: Environment) => fetchQuery(environment, query);

export default currencyRates;
