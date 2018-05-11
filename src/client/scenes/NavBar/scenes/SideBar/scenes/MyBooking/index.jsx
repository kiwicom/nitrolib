// @flow strict
import * as React from "react";
import * as R from "ramda";
import styled from "styled-components";
import FaBarcode from "react-icons/lib/fa/barcode";
import KwEmail from "@kiwicom/orbit-components/lib/icons/Email";

import InputText from "client/components/InputText";
import IconText from "client/components/IconText";
import Text from "client/components/Text";
import { Consumer as IntlConsumer } from "client/services/intl/context";
import IataPicker from "../../../../../../components/IataPicker";
import * as validators from "./services/validators";
import * as normalizers from "./services/normalizers";

const FieldWrap = styled.div`
  position: relative;
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
      bid: __("forms.this_field_must_be_filled"),
      email: __("forms.this_field_must_be_filled"),
      iata: __("forms.enter_iata_code"),
      departure: __("forms.this_field_must_be_filled"),
    },
  };

  handleChange = (ev: SyntheticInputEvent<HTMLInputElement>) => {
    const { id, value } = ev.target;

    const validator = validate[id];
    const normalizer = normalize[id];

    if (!validator || !normalizer) {
      return;
    }

    const val = normalizer(value);
    this.setState(state => ({
      values: R.assoc(id, val, state.values),
      errors: R.assoc(id, validator(val), state.errors),
    }));
  };

  handleSelectIata = (value: string) => {
    this.setState(state => ({
      values: R.assoc("iata", value, state.values),
      errors: R.assoc("iata", validate.iata(value), state.errors),
    }));
  };

  render() {
    const { values, errors } = this.state;

    return (
      <IntlConsumer>
        {intl => (
          <>
            <FieldWrap>
              <InputText
                id="bid"
                value={values.bid}
                onChange={this.handleChange}
                placeholder={intl.translate(__("common.booking_number_placeholder"))}
                label={
                  <IconText Icon={FaBarcode}>
                    <Text t={__("common.booking_number_colon")} />
                  </IconText>
                }
                error={intl.translate(errors.bid)}
              />
            </FieldWrap>
            <FieldWrap>
              <InputText
                id="email"
                value={values.email}
                onChange={this.handleChange}
                placeholder={intl.translate(__("price_alert.web.email_placeholder"))}
                label={
                  <IconText Icon={KwEmail}>
                    <Text t={__("common.email_colon")} />
                  </IconText>
                }
                error={intl.translate(errors.email)}
                autoComplete="email"
              />
            </FieldWrap>
            <FieldWrap>
              <IataPicker
                id="iata"
                value={values.iata}
                onSelect={this.handleSelectIata}
                error={intl.translate(errors.iata)}
              />
            </FieldWrap>
          </>
        )}
      </IntlConsumer>
    );
  }
}
