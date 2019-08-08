// @flow strict

import * as React from "react";
import Alert from "@kiwicom/orbit-components/lib/Alert";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import Grid from "@kiwicom/orbit-components/lib/utils/Grid";
import InputField from "@kiwicom/orbit-components/lib/InputField";
import Modal, { ModalSection, ModalHeader } from "@kiwicom/orbit-components/lib/Modal";
import ChevronLeft from "@kiwicom/orbit-components/lib/icons/ChevronLeft";
import styled, { css } from "styled-components";
import mq from "@kiwicom/orbit-components/lib/utils/mediaQuery";

import Button from "../../../../Button";
import { useIntl } from "../../../../../services/intl/context";
import DateInput from "../../../../DateInput/index";
import IataPicker from "../../../../IataPicker";
import { themeDefault } from "../../../../../records/Theme";

const Wrapper = styled.div`
  width: 100%;
  ${mq.tablet(css`
    width: 48.5%;
  `)};
`;

Wrapper.defaultProps = {
  theme: themeDefault,
};

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
  const intl = useIntl();

  return (
    <Modal>
      <form onSubmit={onSubmit}>
        <ModalHeader
          title="account.sign_in.single_booking.title"
          description="account.sign_in.single_booking.description"
        />
        <ModalSection dataTest="MagicLogin-GetSingleBooking">
          {error && (
            <Alert type="critical" icon>
              {error}
            </Alert>
          )}
          <Stack>
            <Grid
              gap="20px"
              tablet={{
                columns: "1fr 1fr",
              }}
            >
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
            </Grid>
            <DateInput
              value={departureDate}
              error={intl.translate(departureDateError)}
              onChange={onDepartureDateChange}
              label={__("account.sign_in.departure_date_label")}
            />
            {/* TODO: could not make Stack with basis to 50% */}
            <Wrapper>
              <IataPicker
                id="MagicLogin-IATA"
                value={IATA}
                onSelect={onIATAChange}
                error={IATAError}
              />
            </Wrapper>
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
        </ModalSection>
      </form>
    </Modal>
  );
};

export default GetSingleBooking;
