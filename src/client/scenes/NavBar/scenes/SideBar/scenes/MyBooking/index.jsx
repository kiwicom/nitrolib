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
import * as validators from "./services/validators";

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

  handleChangeBid = (val: string) => {
    this.setState(state => ({
      values: R.assoc("bid", val, state.values),
      errors: R.assoc("bid", validators.checkRequired(val), state.errors),
    }));
  };

  handleChangeEmail = (val: string) => {
    this.setState(state => ({
      values: R.assoc("email", val, state.values),
      errors: R.assoc("email", validators.checkEmail(val), state.errors),
    }));
  };

  handleChangeIata = (val: string) => {
    this.setState(state => ({
      values: R.assoc("iata", val, state.values),
      errors: R.assoc("iata", validators.checkIata(val), state.errors),
    }));
  };

  handleChangeDeparture = (val: Date) => {
    this.setState(state => ({
      values: R.assoc("departure", val, state.values),
      errors: R.assoc("departure", validators.checkDeparture(val), state.errors),
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
                onChange={this.handleChangeBid}
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
                onChange={this.handleChangeEmail}
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
          </>
        )}
      </IntlConsumer>
    );
  }
}
