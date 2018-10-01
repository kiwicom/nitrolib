// @flow strict
import * as React from "react";
import * as R from "ramda";
import styled from "styled-components";
import FaBarcode from "react-icons/lib/fa/barcode";
import FaCalendar from "react-icons/lib/fa/calendar";
import MdEmail from "react-icons/lib/md/email";
import addYears from "date-fns/addYears";
import Alert from "@kiwicom/orbit-components/lib/Alert";
import Button from "@kiwicom/orbit-components/lib/Button";

import InputText from "../../../../../InputText";
import type { Change } from "../../../../../InputText";
import IconText from "../../../../../IconText";
import Text from "../../../../../Text";
import IataPicker from "../../../../../IataPicker";
import InputDate from "../../../../../InputDate";
import { Consumer as IntlConsumer } from "../../../../../../services/intl/context";
import * as normalizers from "../../../../../../services/input/normalizers";
import * as validators from "../../../../../../services/input/validators";
import isEmptish from "../../../../../../services/utils/isEmptish";
import type { MyBookingInput } from "../../../../../../services/auth/api";

const FieldWrap = styled.div`
  position: relative;
  margin: 15px 0;
`;

type Props = {|
  loading: boolean,
  error: string,
  onMyBooking: (input: MyBookingInput) => Promise<boolean>,
  onCloseSuccess: () => void,
  // DI
  now: Date,
|};

type Field<T> = {|
  value: T,
  error: string,
  validate: (value: T) => string,
  normalize: (value: T) => T,
|};

type State = {|
  submitted: boolean,
  fields: {|
    bid: Field<string>,
    email: Field<string>,
    iata: Field<string>,
    departure: Field<Date>,
  |},
|};

const MIN = addYears(new Date(), -5);
const MAX = addYears(new Date(), 1);

export default class MyBooking extends React.PureComponent<Props, State> {
  static defaultProps = {
    now: new Date(),
  };

  state = {
    submitted: false,
    fields: {
      bid: {
        value: "",
        error: __("forms.this_field_must_be_filled"),
        validate: validators.required,
        normalize: normalizers.numbers,
      },
      email: {
        value: "",
        error: __("forms.this_field_must_be_filled"),
        validate: validators.email,
        normalize: R.identity,
      },
      iata: {
        value: "",
        error: __("forms.enter_iata_code"),
        validate: validators.iata,
        normalize: R.identity,
      },
      departure: {
        value: this.props.now, // eslint-disable-line react/destructuring-assignment
        error: "",
        validate: validators.departure,
        normalize: R.identity,
      },
    },
  };

  handleChange = ({ id, value, error }: Change) => {
    this.setState(state => ({
      fields: R.assoc(id, { value, error }, state.fields),
    }));
  };

  handleSelectIata = (value: string) => {
    const { fields } = this.state;

    const field = fields.iata;

    this.setState(state => ({
      fields: R.assoc(
        "iata",
        R.merge(field, {
          value,
          error: field.validate(value),
        }),
        state.fields,
      ),
    }));
  };

  handleChangeDeparture = (value: Date) => {
    const { fields } = this.state;

    const field = fields.departure;

    this.setState(state => ({
      fields: R.assoc(
        "departure",
        R.merge(field, {
          value,
          error: field.validate(value),
        }),
        state.fields,
      ),
    }));
  };

  handleSubmit = () => {
    const { onMyBooking, onCloseSuccess } = this.props;
    const { fields } = this.state;

    this.setState({ submitted: true });
    // $FlowFixMe - Date !== string
    if (!isEmptish(R.map(R.prop("error"), fields))) {
      return Promise.resolve(null);
    }

    return onMyBooking({
      bid: fields.bid.value,
      email: fields.email.value,
      iata: fields.iata.value,
      departure: fields.departure.value,
    }).then(ok => {
      if (ok) {
        onCloseSuccess();
      }
    });
  };

  render() {
    const { loading, error } = this.props;
    const { fields, submitted } = this.state;

    return (
      <IntlConsumer>
        {intl => (
          <>
            {error && (
              <FieldWrap>
                <Alert type="critical">{error}</Alert>
              </FieldWrap>
            )}
            <FieldWrap>
              <IconText Icon={FaBarcode}>
                <Text t={__("common.booking_number_colon")} />
              </IconText>
              <InputText
                id="bid"
                value={fields.bid.value}
                onChange={this.handleChange}
                placeholder={intl.translate(__("common.booking_number_placeholder"))}
                error={fields.bid.error}
                normalize={normalizers.numbers}
                validate={validators.required}
                showState={submitted}
              />
            </FieldWrap>
            <FieldWrap>
              <IconText Icon={MdEmail}>
                <Text t={__("common.email_colon")} />
              </IconText>
              <InputText
                id="email"
                value={fields.email.value}
                onChange={this.handleChange}
                placeholder={intl.translate(__("price_alert.web.email_placeholder"))}
                error={intl.translate(fields.email.error)}
                validate={validators.email}
                showState={submitted}
                autoComplete="email"
              />
            </FieldWrap>
            <FieldWrap>
              <IataPicker
                id="iata"
                value={fields.iata.value}
                onSelect={this.handleSelectIata}
                error={intl.translate(fields.iata.error)}
                showState={submitted}
              />
            </FieldWrap>
            <FieldWrap>
              <IconText Icon={FaCalendar}>
                <Text t={__("common.departure_date_colon")} />
              </IconText>
              <InputDate
                id="departure"
                value={fields.departure.value}
                onChange={this.handleChangeDeparture}
                min={MIN}
                max={MAX}
              />
            </FieldWrap>
            <Button block onClick={this.handleSubmit} disabled={loading}>
              <Text t={__("submit")} />
            </Button>
          </>
        )}
      </IntlConsumer>
    );
  }
}
