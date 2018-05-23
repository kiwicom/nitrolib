// @flow strict
import * as React from "react";

import * as geolocationContext from "client/services/geolocation/context";

const SearchForm = () => (
  <>
    <geolocationContext.Consumer>
      {geo => <div>{JSON.stringify(geo)}</div>}
    </geolocationContext.Consumer>
    <div>Search Form</div>
  </>
);

export default SearchForm;
