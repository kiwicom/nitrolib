// @flow strict
import * as React from "react";
import * as R from "ramda";
import styled from "styled-components";
import FaBarcode from "react-icons/lib/fa/barcode";
import FaPlane from "react-icons/lib/fa/plane";
import KwEmail from "@kiwicom/orbit-components/lib/icons/Email";

import InputText from "client/components/InputText";
import IconText from "client/components/IconText";
import Text from "client/components/Text";
import { Consumer as IntlConsumer } from "client/services/intl/context";
import * as validators from "./services/validators";
import * as normalizers from "./services/normalizers";

const Spacing = styled.div`
  margin: 15px 0;
`;

type Props = {||};

type State = {|
  values: {|
    bid: string,
    email: string,
    iata: string,
    departure: Date,
  |},
  errors: {|
    bid: string,
    email: string,
    iata: string,
    departure: string,
  |},
|};

const validate = {
  bid: validators.required,
  email: validators.email,
  iata: validators.iata,
  departure: validators.departure,
};

const normalize = {
  bid: normalizers.numbers,
  email: R.identity,
  iata: R.identity,
  departure: R.identity,
};

export default class MyBooking extends React.PureComponent<Props, State> {
  state = {
    values: {
      bid: "",
      email: "",
      iata: "",
      departure: new Date(),
    },
    errors: {
      bid: "",
      email: "",
      iata: "",
      departure: "",
    },
  };

  handleChange = (val: string, id: string) => {
    const validator = validate[id];
    const normalizer = normalize[id];

    if (!validator || !normalizer) {
      return;
    }

    const value = normalizer(val);
    this.setState(state => ({
      values: R.assoc(id, value, state.values),
      errors: R.assoc(id, validator(value), state.errors),
    }));
  };

  handleBlur = (val: string, id: string) => {
    const validator = validate[id];
    const normalizer = normalize[id];

    if (!validator || !normalizer) {
      return;
    }

    this.setState(state => ({
      errors: R.assoc(id, validator(normalizer(val)), state.errors),
    }));
  };

  render() {
    const { values, errors } = this.state;

    return (
      <IntlConsumer>
        {intl => (
          <>
            <Spacing>
              <InputText
                id="bid"
                value={values.bid}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                placeholder={intl.translate(__("common.booking_number_placeholder"))}
                label={
                  <IconText Icon={FaBarcode}>
                    <Text t={__("common.booking_number_colon")} />
                  </IconText>
                }
                error={intl.translate(errors.bid)}
              />
            </Spacing>
            <Spacing>
              <InputText
                id="email"
                value={values.email}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                placeholder={intl.translate(__("price_alert.web.email_placeholder"))}
                label={
                  <IconText Icon={KwEmail}>
                    <Text t={__("common.email_colon")} />
                  </IconText>
                }
                error={intl.translate(errors.email)}
                autoComplete="email"
              />
            </Spacing>
            <Spacing>
              <InputText
                id="iata"
                value={values.iata}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                placeholder={intl.translate(__("common.iata_airport_placeholder"))}
                label={
                  <IconText Icon={FaPlane}>
                    <Text t={__("common.iata_code")} />
                  </IconText>
                }
                error={intl.translate(errors.iata)}
                autoComplete="email"
              />
            </Spacing>
          </>
        )}
      </IntlConsumer>
    );
  }
}
