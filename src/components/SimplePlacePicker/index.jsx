// @flow strict
import * as React from "react";

import PlacePicker from "./components/SimplePlacePicker";
import { Consumer as IntlConsumer } from "../../services/intl/context";

type Props = {|
  label: string,
  error: string,
  icon?: React.Node,
  onBlur?: () => void,
  value: string,
  onFocus?: () => void,
|};

const SimplePlacePicker = ({ icon, onBlur, value, label, error, onFocus }: Props) => (
  <IntlConsumer>
    {intl => (
      <PlacePicker
        icon={icon}
        locale={intl.language.phraseApp}
        onBlur={onBlur}
        onFocus={onFocus}
        value={value}
        error={intl.translate(error)}
        label={intl.translate(label)}
      />
    )}
  </IntlConsumer>
);

export default SimplePlacePicker;
