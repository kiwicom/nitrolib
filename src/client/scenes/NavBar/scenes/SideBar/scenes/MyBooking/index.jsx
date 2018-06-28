// @flow strict
import * as React from "react";
import * as R from "ramda";
import styled from "styled-components";
import FaBarcode from "react-icons/lib/fa/barcode";
import FaCalendar from "react-icons/lib/fa/calendar";
import MdEmail from "react-icons/lib/md/email";
import addYears from "date-fns/addYears";

import InputText from "client/public/components/InputText";
import IconText from "client/public/components/IconText";
import Text from "client/public/components/Text";
import { Consumer as IntlConsumer } from "client/public/services/intl/context";
import IataPicker from "client/public/components/IataPicker";
import InputDate from "client/public/components/InputDate";
import isEmptish from "client/services/utils/isEmptish";
import * as validators from "./services/validators";
import * as normalizers from "./services/normalizers";
import mmbRedirect from "./services/mmbRedirect";

const FieldWrap = styled.div`
  position: relative;
  margin: 15px 0;
`;

type Props = {|
  lang: string,
  mmbRedirectCall: typeof mmbRedirect,
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
  loading: boolean,
  error: string,
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
    mmbRedirectCall: mmbRedirect,
    now: new Date(),
  };

  state = {
    submitted: false,
    loading: false,
    error: "",
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

  handleChange = (ev: SyntheticInputEvent<HTMLInputElement>) => {
    const { id, value } = ev.target;
    const { fields } = this.state;

    const field = fields[id];
    if (!field) {
      return;
    }

    const val = field.normalize(value);
    this.setState(state => ({
      fields: R.assoc(
        id,
        R.merge(field, {
          value: val,
          error: field.validate(val),
        }),
        state.fields,
      ),
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

  handleSubmit = async () => {
    try {
      const { lang, mmbRedirectCall } = this.props;
      const { fields } = this.state;

      this.setState({ submitted: true });
      if (!isEmptish(R.map(R.prop("error"), fields))) {
        return null;
      }

      this.setState({ loading: true });
      return await mmbRedirectCall({
        lang,
        bid: fields.bid.value,
        email: fields.email.value,
        iata: fields.iata.value,
        departure: fields.departure.value,
      });
    } catch (err) {
      this.setState({ error: String(err), loading: false });
      return null;
    }
  };

  render() {
    const { fields, submitted, loading, error } = this.state;

    return (
      <IntlConsumer>
        {intl => (
          <>
            {error !== "" && (
              <FieldWrap>
                <h2>Error! {error}</h2>
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
                error={intl.translate(fields.bid.error)}
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
            <button type="button" onClick={this.handleSubmit} disabled={loading}>
              Submit
            </button>
          </>
        )}
      </IntlConsumer>
    );
  }
}
