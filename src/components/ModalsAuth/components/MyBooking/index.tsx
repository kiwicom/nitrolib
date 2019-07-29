import * as React from "react";
import * as R from "ramda";
import styled from "styled-components";
import addYears from "date-fns/addYears";
import parse from "date-fns/parse";
import Button from "@kiwicom/orbit-components/lib/Button";
import Envelope from "@kiwicom/orbit-components/lib/icons/Email";
import Ticket from "@kiwicom/orbit-components/lib/icons/Ticket";
import Calendar from "@kiwicom/orbit-components/lib/icons/Calendar";
import Alert from "@kiwicom/orbit-components/lib/Alert";

import Query from "../../../Query";
import LogMount from "../../../LogMount";
import InputText from "../../../InputText";
import { Change } from "../../../InputText";
import IconText from "../../../IconText";
import Translate from "../../../Translate";
import IataPicker from "../../../IataPicker";
import InputDate from "../../../InputDate";
import parseDateFormat from "../../../InputDate/services/parseDateFormat";
import firstFormError from "../../../NavBar/services/firstFormError";
import { Consumer as IntlConsumer } from "../../../../services/intl/context";
import * as normalizers from "../../../../services/input/normalizers";
import * as validators from "../../../../services/input/validators";
import isEmptish from "../../../../services/utils/isEmptish";
import { MyBookingInput } from "../../../../services/auth/api";
import { MODAL_OPEN } from "../../../../consts/events";

const FieldWrap = styled.div`
  position: relative;
  margin: 15px 0;
`;

type Props = {
  loading: boolean,
  onMyBooking: (input: MyBookingInput) => Promise<void>,
  onChange: () => void,
  // DI
  now: Date,
};

type Field<T> = {
  value: T,
  error: string,
  validate: (value: T) => string,
  normalize: (value: T) => T,
};

type State = {
  submitted: boolean,
  error: string,
  fields: {
    bid: Field<string>,
    email: Field<string>,
    iata: Field<string>,
    departure: Field<Date>,
  },
};

const MIN = addYears(new Date(), -5);
const MAX = addYears(new Date(), 1);

export default class MyBooking extends React.PureComponent<Props, State> {
  static defaultProps = {
    now: new Date(),
  };

  state = {
    fields: {
      bid: {
        value: ,
        error: __("forms.this_field_must_be_filled"),
        validate: validators.required,
        normalize: normalizers.numbers,
      },
      email: {
        value: ,
        error: __("forms.this_field_must_be_filled"),
        validate: validators.email,
        normalize: R.identity,
      },
      iata: {
        value: ,
        error: __("forms.enter_iata_code"),
        validate: validators.iata,
        normalize: R.identity,
      },
      departure: {
        value: this.props.now, // eslint-disable-line react/destructuring-assignment
        error: ,
        validate: validators.departure,
        normalize: R.identity,
      },
    },
    submitted: false,
    error: ,
  };

  handleMount = (query: { [key: string]: string }) => {
    const { now } = this.props;

    // ?bid=123&email=joe@doe.com&src=BRQ&dtime=18/10/2010
    if (query.bid) {
      this.setState(state => R.assocPath(["fields", "bid", "value"], query.bid, state));
      this.setState(state => R.assocPath(["fields", "bid", "error"], , state));
    }

    if (query.email) {
      this.setState(state => R.assocPath(["fields", "email", "value"], query.email, state));
      this.setState(state => R.assocPath(["fields", "email", "error"], , state));
    }

    if (query.src) {
      this.setState(state => R.assocPath(["fields", "iata", "value"], query.src, state));
      this.setState(state => R.assocPath(["fields", "iata", "error"], , state));
    }

    if (query.dtime) {
      this.setState(state =>
        R.assocPath(["fields", "departure", "value"], parse(query.dtime, "dd/MM/yyyy", now), state),
      );
      this.setState(state => R.assocPath(["fields", "departure", "error"], , state));
    }
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

  handleSubmit = (ev: SyntheticEvent<HTMLFormElement>) => {
    ev.preventDefault();

    const { loading, onMyBooking, onChange } = this.props;
    const { fields } = this.state;

    if (loading) {
      return Promise.resolve(null);
    }

    this.setState({ submitted: true, error:  });
    // $FlowExpected: Date !== string
    if (!isEmptish(R.map(R.prop("error"), fields))) {
      return Promise.resolve(null);
    }

    return onMyBooking({
      bid: fields.bid.value,
      email: fields.email.value,
      iata: fields.iata.value,
      departure: fields.departure.value,
    })
      .then(() => {
        onChange();
      })
      .catch(err => {
        const msg = err.message;

        if (msg === "Booking not found") {
          this.setState({ error: __("account.my_booking_login_incorrect") });
          return;
        }

        this.setState({ error: __("common.api_error") });
      });
  };

  render() {
    const { fields, submitted, error } = this.state;
    const { loading } = this.props;

    const errorSync = firstFormError(fields);

    return (
      <form onSubmit={this.handleSubmit}>
        <IntlConsumer>
          {intl => (
            <>
              <Query onMount={this.handleMount} />
              <LogMount event={MODAL_OPEN} props={{ modal: "myBooking" }} />

              <FieldWrap>
                <IconText icon={<Ticket color="primary" size="small" />}>
                  <Translate t="common.booking_number_colon" />
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
                <IconText icon={<Envelope color="primary" size="small" />}>
                  <Translate t="common.email_colon" />
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
                />
              </FieldWrap>
              <FieldWrap>
                <IconText icon={<Calendar color="primary" size="small" />}>
                  <Translate t="common.departure_date_colon" />
                </IconText>
                <InputDate
                  id="departure"
                  value={fields.departure.value}
                  onChange={this.handleChangeDeparture}
                  format={parseDateFormat(intl.language.dateFormatLong)}
                  min={MIN}
                  max={MAX}
                />
              </FieldWrap>
              {error && (
                <FieldWrap>
                  <Alert type="critical">
                    <Translate t={error} />
                  </Alert>
                </FieldWrap>
              )}
              {submitted && errorSync && (
                <FieldWrap>
                  <Alert type="critical">
                    <Translate t={errorSync} />
                  </Alert>
                </FieldWrap>
              )}
              <Button block submit disabled={loading}>
                <Translate t="submit" />
              </Button>
            </>
          )}
        </IntlConsumer>
      </form>
    );
  }
}
