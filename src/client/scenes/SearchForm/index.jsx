// @flow strict
import * as React from "react";

import ClientOnly from "public/components/ClientOnly";
import Price from "public/components/Price";
import GeoData from "client/components/GeoData";

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
