// @flow strict
import * as React from "react";

import LocationPicker from "./components/LocationPicker";
import { Consumer as IntlConsumer } from "../../services/intl/context";

type Props = {|
  label: string,
  error: string,
  icon: React.Node,
|};

const SimpleLocationPicker = ({ icon, label, error }: Props) => (
  <IntlConsumer>
    {intl => (
      <LocationPicker
        label={intl.translate(label)}
        placeholder={intl.translate("common.iata_airport_placeholder")}
        icon={icon}
        error={intl.translate(error)}
      />
    )}
  </IntlConsumer>
);

export default SimpleLocationPicker;
