// @flow strict
import * as React from "react";
import * as R from "ramda";

import { geolocationDefault } from "client/records/Geolocation";
import * as fetchedContext from "client/services/fetched/context";
import GeolocationData from "./GeolocationData";
import { countryDefault } from "../../records/Country";

const { Consumer, Provider } = React.createContext(geolocationDefault);

type Props = {|
  ip: string,
  children: React.Node,
|};

const GeolocationProvider = (props: Props) => (
  <GeolocationData
    ip={props.ip}
    render={res => (
      <fetchedContext.Consumer>
        {({ countries }) => (
          <Provider
            value={
              !res.props || res.error
                ? geolocationDefault
                : {
                    ...res.props.geoIP.coordinates,
                    country: R.propOr(
                      countryDefault,
                      R.toLower(res.props.geoIP.isoCountryCode),
                      countries,
                    ),
                    fresh: true,
                  }
            }
          >
            {props.children}
          </Provider>
        )}
      </fetchedContext.Consumer>
    )}
  />
);

export { Consumer, GeolocationProvider as Provider };
