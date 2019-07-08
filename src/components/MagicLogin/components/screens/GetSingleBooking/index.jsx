// @flow strict

import * as React from "react";
import Alert from "@kiwicom/orbit-components/lib/Alert";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import Heading from "@kiwicom/orbit-components/lib/Heading";
import InputField from "@kiwicom/orbit-components/lib/InputField";
import ModalSection from "@kiwicom/orbit-components/lib/Modal/ModalSection";
import ChevronLeft from "@kiwicom/orbit-components/lib/icons/ChevronLeft";

import Translate from "../../../../Translate";
import Text from "../../../../Text";
import Button from "../../../../Button";
import IntlContext from "../../../../../services/intl/context";
import DateInput from "../../../../DateInput/index";
import IataPicker from "../../../../IataPicker";

type Props = {|
  departureDate: ?Date,
  departureDateError: string,
  bookingId: string,
  bookingIdError: string,
  email: string,
  emailError: string,
  IATA: string,
  IATAError: string,
  error?: React.Node,
  onDepartureDateChange: (?Date) => void,
  onBookingIdChange: (ev: SyntheticInputEvent<HTMLInputElement>) => void,
  onEmailChange: (ev: SyntheticInputEvent<HTMLInputElement>) => void,
  onIATAChange: (value: string) => void,
  onBack: () => void,
  onSubmit: () => void,
|};

const GetSingleBooking = ({
  bookingId,
  bookingIdError,
  email,
  emailError,
  departureDate,
  departureDateError,
  IATA,
  IATAError,
  error,
  onBookingIdChange,
  onEmailChange,
  onDepartureDateChange,
  onIATAChange,
  onBack,
  onSubmit,
}: Props) => {
  const intl = React.useContext(IntlContext);

  return (
    <ModalSection dataTest="MagicLogin-GetSingleBooking">
      <form onSubmit={onSubmit}>
        <Stack direction="column">
          <Stack direction="column" spacing="tight">
            <Heading element="h2">
              <Translate t="account.sign_in.single_booking.title" />
            </Heading>
            <Text t="account.sign_in.single_booking.description" />
          </Stack>
          {error && (
            <Alert type="critical" icon>
              {error}
            </Alert>
          )}
          <Stack inline>
            <InputField
              type="number"
              label={intl.translate(__("account.sign_in.bid_number_label"))}
              placeholder={intl.translate(__("account.sign_in.bid_number_placeholder"))}
              value={bookingId}
              error={intl.translate(bookingIdError)}
              onChange={onBookingIdChange}
              dataTest="MagicLogin-BookingId"
            />
            <InputField
              label={intl.translate(__("account.sign_in.incorrect_email_label"))}
              placeholder={intl.translate(__("account.sign_in.incorrect_email_placeholder"))}
              value={email}
              error={intl.translate(emailError)}
              onChange={onEmailChange}
              dataTest="MagicLogin-Email"
            />
          </Stack>
          <Stack inline>
            <DateInput
              value={departureDate}
              error={intl.translate(departureDateError)}
              onChange={onDepartureDateChange}
              label={__("account.sign_in.departure_date_label")}
            />
          </Stack>
          <div>
            <Stack inline spaceAfter="large">
              <IataPicker
                id="MagicLogin-IATA"
                value={IATA}
                onSelect={onIATAChange}
                error={IATAError}
              />
            </Stack>
          </div>
          <Stack direction="row" justify="between">
            <Button
              t="account.back"
              type="secondary"
              iconLeft={<ChevronLeft />}
              onClick={onBack}
              dataTest="MagicLogin-GetSingleBookingBack"
            />
            <Button t="submit" submit dataTest="MagicLogin-GetSingleBookingSubmit" />
          </Stack>
        </Stack>
      </form>
    </ModalSection>
  );
};

export default GetSingleBooking;
