// @flow strict
import * as React from "react";

import GeoData from "client/components/GeoData";
import ClientOnly from "client/public/components/ClientOnly";
import Price from "client/public/components/Price";

/* istanbul ignore next */
const SearchForm = () => (
  <>
    <ClientOnly>
      <GeoData
        render={res => {
          if (res.error) {
            // TODO handle error
            return null;
          }

          if (!res.props) {
            // TODO loading
            return null;
          }

          return <pre>{JSON.stringify(res.props.geoIP)}</pre>;
        }}
      />
    </ClientOnly>
    <div>Search Form</div>
    <Price value={100} />
  </>
);

export default SearchForm;
