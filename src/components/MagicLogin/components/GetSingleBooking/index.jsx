// @flow strict

import * as React from "react";

import GetSingleBookingScreen from "../screens/GetSingleBooking";
import * as validators from "../../../../services/input/validators";

type Props = {|
  onBack: () => void,
|};

type State = {|
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

class GetSingleBooking extends React.Component<Props, State> {
  state = {
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

  handleSubmit = (ev: SyntheticInputEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const { bookingId, email, departureDate, IATA } = this.state;
    const bookingIdError = validators.required(bookingId);
    const emailError = validators.email(email);
    const departureDateError = validators.required(departureDate);
    const IATAError = validators.iata(IATA);
    this.setState({
      bookingIdError,
      emailError,
      departureDateError,
      IATAError,
      submitted: true,
    });

    if (IATAError || emailError || bookingIdError || departureDateError) {
      // TODO
    }
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

export default GetSingleBooking;
