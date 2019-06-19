// @flow strict

import * as React from "react";
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

type Props = {|
  departureDate: ?Date,
  departureDateError: string,
  bookingId: string,
  bookingIdError: string,
  email: string,
  emailError: string,
  IATA: string,
  IATAError: string,
  onDepartureDateChange: (?Date) => void,
  onBookingIdChange: (ev: SyntheticInputEvent<HTMLInputElement>) => void,
  onEmailChange: (ev: SyntheticInputEvent<HTMLInputElement>) => void,
  onIATAChange: (ev: SyntheticInputEvent<HTMLInputElement>) => void,
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
              <Translate t="account.single_booking.title" />
            </Heading>
            <Text t="account.single_booking.description" />
          </Stack>
          <Stack inline>
            <InputField
              type="number"
              label={intl.translate(__("common.booking_number"))}
              placeholder={intl.translate(__("common.booking_number_placeholder"))}
              value={bookingId}
              error={bookingIdError && intl.translate(bookingIdError)}
              onChange={onBookingIdChange}
              dataTest="MagicLogin-BookingId"
            />
            <InputField
              label={intl.translate(__("account.single_booking.incorrect_email_label"))}
              placeholder={intl.translate(__("account.single_booking.incorrect_email_placeholder"))}
              value={email}
              error={emailError && intl.translate(emailError)}
              onChange={onEmailChange}
              dataTest="MagicLogin-Email"
            />
          </Stack>
          <Stack inline>
            <DateInput
              value={departureDate}
              error={departureDateError && intl.translate(departureDateError)}
              onChange={onDepartureDateChange}
              label={intl.translate(__("common.departure_date"))}
            />
          </Stack>
          <div>
            <Stack inline spaceAfter="large">
              <InputField
                label={intl.translate(__("account.single_booking.iata_label"))}
                placeholder={intl.translate(__("account.single_booking.iata_placeholder"))}
                help={intl.translate(__("account.single_booking.iata_help"))}
                value={IATA}
                error={IATAError && intl.translate(IATAError)}
                onChange={onIATAChange}
                dataTest="MagicLogin-IATA"
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
