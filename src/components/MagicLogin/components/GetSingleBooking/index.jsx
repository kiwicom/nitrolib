// @flow strict

import * as React from "react";
import format from "date-fns/format";
import { useRelayEnvironment } from "@kiwicom/relay";
import type { Environment } from "@kiwicom/relay";

import Text from "../../../Text";
import GetSingleBookingScreen from "../screens/GetSingleBooking";
import createSimpleToken from "../../mutations/createSimpleToken";
import * as validators from "../../../../services/input/validators";
import { API_ERROR, API_REQUEST_FAILED } from "../../../../consts/events";
import { SIMPLE_TOKEN_RETRIEVED } from "../../consts/events";
import { useLog } from "../../../../services/log/context";
import type { AuthToken } from "../../../../records/Auth";
import type { Event, Props as EventProps } from "../../../../records/Event";
import errors from "../../../../consts/errors";

type OwnProps = {|
  onBack: () => void,
  onClose: boolean => void,
  onGetSimpleToken?: AuthToken => void,
|};

type Props = {|
  ...OwnProps,
  environment: Environment,
  log: (event: Event, props: EventProps) => void,
|};

type State = {|
  error: ?string,
  submitted: boolean,
  bookingId: string,
  bookingIdError: string,
  email: string,
  emailError: string,
  departureDate: ?Date,
  departureDateError: string,
  IATA: string,
  IATAError: string,
|};

export class GetSingleBookingWithoutContext extends React.Component<Props, State> {
  state = {
    error: null,
    submitted: false,
    bookingId: "",
    bookingIdError: "",
    email: "",
    emailError: "",
    departureDate: null,
    departureDateError: "",
    IATA: "",
    IATAError: "",
  };

  handleBookingId = (ev: SyntheticInputEvent<HTMLInputElement>) => {
    const { value } = ev.target;
    const { submitted } = this.state;

    this.setState({
      bookingId: value,
      bookingIdError: submitted ? validators.required(value) : "",
    });
  };

  handleEmail = (ev: SyntheticInputEvent<HTMLInputElement>) => {
    const { value } = ev.target;
    const { submitted } = this.state;

    this.setState({
      email: value,
      emailError: submitted ? validators.email(value) : "",
    });
  };

  handleDepartureDate = (departureDate: ?Date) => {
    const { submitted } = this.state;

    this.setState({
      departureDate,
      departureDateError: submitted ? validators.required(departureDate) : "",
    });
  };

  handleIATA = (value: string) => {
    const { submitted } = this.state;

    this.setState({
      IATA: value,
      IATAError: submitted ? validators.iata(value) : "",
    });
  };

  handleSimpleToken = (payload: AuthToken) => {
    const { onGetSimpleToken, onClose } = this.props;

    onClose(true);

    if (onGetSimpleToken) {
      onGetSimpleToken(payload);
      return;
    }

    window.location = `${window.location.origin}/manage/${payload.bid}/${payload.token}`;
  };

  handleSubmit = (ev: SyntheticInputEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const { log, environment } = this.props;
    const { bookingId, email, departureDate, IATA } = this.state;
    const bookingIdError = validators.required(bookingId);
    const emailError = validators.email(email);
    const departureDateError = validators.required(departureDate);
    const IATAError = validators.iata(IATA);
    const bid = Number(bookingId);

    this.setState({
      bookingIdError,
      emailError,
      departureDateError,
      IATAError,
      submitted: true,
      error: null,
    });

    if (IATAError || emailError || bookingIdError || departureDateError) {
      return;
    }

    const date = departureDate ? format(departureDate, "yyyy-MM-dd") : null;
    const input = {
      email,
      bookingId: bid,
      origin: { iataCode: IATA, date },
    };

    createSimpleToken(environment, { input })
      .then(res => {
        const token = res.createSimpleToken?.token;

        if (token) {
          log(SIMPLE_TOKEN_RETRIEVED, {});
          this.handleSimpleToken({
            type: "token",
            bid,
            token,
          });
          return;
        }

        const errorCode = res.createSimpleToken?.code || "";
        const error = errorCode === "NOT_FOUND" ? errors.incorrectBidIATAInput : errors.general;
        log(API_REQUEST_FAILED, {
          operation: "createSimpleToken",
          error: errorCode,
        });
        this.setState({ error });
      })
      .catch(err => {
        log(API_ERROR, {
          operation: "createSimpleToken",
          error: String(err),
        });
        this.setState({ error: errors.general });
      });
  };

  render() {
    const { onBack } = this.props;
    const {
      bookingId,
      email,
      departureDate,
      IATA,
      emailError,
      IATAError,
      departureDateError,
      bookingIdError,
      error,
    } = this.state;

    return (
      <GetSingleBookingScreen
        bookingId={bookingId}
        bookingIdError={bookingIdError}
        IATA={IATA}
        IATAError={IATAError}
        email={email}
        emailError={emailError}
        departureDate={departureDate}
        departureDateError={departureDateError}
        error={error ? <Text t={error} /> : null}
        onIATAChange={this.handleIATA}
        onEmailChange={this.handleEmail}
        onBookingIdChange={this.handleBookingId}
        onDepartureDateChange={this.handleDepartureDate}
        onBack={onBack}
        onSubmit={this.handleSubmit}
      />
    );
  }
}

const GetSingleBooking = (props: OwnProps) => {
  const { log } = useLog();
  const environment = useRelayEnvironment();

  return <GetSingleBookingWithoutContext {...props} environment={environment} log={log} />;
};

export default GetSingleBooking;
