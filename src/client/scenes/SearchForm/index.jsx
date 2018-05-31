// @flow strict
import * as React from "react";

import GeoData from "client/components/GeoData";
import ClientOnly from "client/components/ClientOnly";

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
  </>
);

export default SearchForm;
