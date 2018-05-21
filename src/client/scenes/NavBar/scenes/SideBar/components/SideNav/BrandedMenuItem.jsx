// @flow strict
import * as React from "react";
import * as R from "ramda";

import { Consumer } from "client/services/intl/context";
import MenuItem from "./MenuItem";

const BrandedMenuItem = ({ itemConfig }: { itemConfig: ?Map<string, string> }) =>
  itemConfig ? (
    <Consumer>
      {intl => (
        <MenuItem
          href={`${R.prop("link", itemConfig)}`}
          iconName={R.prop("iconClass", itemConfig)}
          text={intl.translate(R.prop("title", itemConfig), {
            companyName: "Kiwi.com",
          })}
        />
      )}
    </Consumer>
  ) : null;

export default BrandedMenuItem;
