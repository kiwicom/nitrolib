import * as React from "react";
import TripSegment from "@kiwicom/orbit-components/lib/TripSegment";
import Clock from "@kiwicom/orbit-components/lib/icons/Clock";
import Check from "@kiwicom/orbit-components/lib/icons/Check";
import Alert from "@kiwicom/orbit-components/lib/icons/Alert";
import List from "@kiwicom/orbit-components/lib/List";
import ListItem from "@kiwicom/orbit-components/lib/List/ListItem";
import TripLayover from "@kiwicom/orbit-components/lib/TripSector/TripLayover";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import CarrierLogo from "@kiwicom/orbit-components/lib/CarrierLogo";
import Wifi from "@kiwicom/orbit-components/lib/icons/Wifi";
import Entertainment from "@kiwicom/orbit-components/lib/icons/Entertainment";
import Seat from "@kiwicom/orbit-components/lib/icons/Seat";
import PowerPlug from "@kiwicom/orbit-components/lib/icons/PowerPlug";
import styled from "styled-components";

import TranslateTooltip from "../TranslateTooltip";
import TranslateNode from "../../../TranslateNode";
import Translate from "../../../Translate";
import setHours from "../../services/setHours";
import Time from "../../../Time";
import rewriteType from "../../services/rewriteType";
import { Segment, Carrier } from "../../../../records/Segment";
import getCarrier from "../../services/getCarrier";

type Props = {
  segment: Segment,
  carriers: Carrier[],
  last: boolean,
  highlight: boolean,
  returnTrip?: boolean,
};

const Values = styled.span`
  text-transform: lowercase;
`;

// TODO: pnr and number are not present in date structure yet
const CARRIER_TYPES = {
  FLIGHT: {
    type: __("common.airline"),
    number: __("common.flight_number"),
    pnr: __("common.pnr"),
  },
  TRAIN: {
    type: __("common.carrier_colon"),
    number: __("common.train_number"),
    pnr: __("common.pnr"),
  },
  BUS: {
    type: __("common.carrier_colon"),
    number: __("common.bus_number"),
    pnr: __("common.pnr"),
  },
};

const ItinerarySegment = ({ segment, last, highlight, returnTrip, carriers }: Props) => {
  const {
    duration,
    carrier,
    type,
    source,
    destination,
    layover,
    code,
    operatingCarrier,
    seatInfo,
  } = segment;
  const { isStationChange, guarantee } = layover;
  const { hasWifi, hasAudioVideo, hasPower, pitch, recline, width } = seatInfo;

  return (
    <>
      <TripSegment
        duration={setHours(duration)}
        carrier={{ code, type: rewriteType(type), name: carrier }}
        departure={
          <Stack flex spacing="tight">
            <span>{source.station.name}</span>
            <TranslateTooltip
              arrivalName={destination.station.name}
              departureName={source.station.name}
              returnTrip={returnTrip}
              highlight={highlight}
            >
              <span>{source.station.code}</span>
            </TranslateTooltip>
          </Stack>
        }
        departureTime={<Time time={new Date(source.time)} />}
        arrival={
          <Stack flex spacing="tight">
            {destination.station.name} {destination.station.code}
          </Stack>
        }
        arrivalTime={<Time time={new Date(destination.time)} />}
      >
        <List size="small" type="secondary">
          {operatingCarrier !== carrier ? (
            <ListItem
              icon={<CarrierLogo size="small" carriers={getCarrier(carriers, operatingCarrier)} />}
            >
              <Translate t="common.operating_airline" /> {operatingCarrier}
            </ListItem>
          ) : (
            <ListItem icon={<CarrierLogo size="small" carriers={[{ code, name: carrier }]} />}>
              <Translate t={CARRIER_TYPES[type].type} />
            </ListItem>
          )}
          {/* SeatInfo */}
          {pitch && (
            <ListItem icon={<Seat size="small" />}>
              <Stack inline align="center" justify="between">
                <Translate html t="search.result.flight_details.seat_pitch.label" />
                <Values>
                  {pitch.value} {pitch.unit}
                </Values>
              </Stack>
            </ListItem>
          )}
          {width && (
            <ListItem icon={<Seat size="small" />}>
              <Stack inline align="center" justify="between">
                <Translate html t="search.result.flight_details.seat_width.label" />
                <Values>
                  {width.value} {width.unit}
                </Values>
              </Stack>
            </ListItem>
          )}
          {recline && (
            <ListItem icon={<Seat size="small" />}>
              <Stack inline align="center" justify="between">
                <Translate html t="search.result.flight_details.seat_recline.label" />
                <Values>
                  {recline.value} {recline.unit}
                </Values>
              </Stack>
            </ListItem>
          )}
          {hasAudioVideo && (
            <ListItem icon={<Entertainment size="small" />}>
              <Translate t="search.result.flight_details.audio_video.label" />
            </ListItem>
          )}
          {hasPower && (
            <ListItem icon={<PowerPlug size="small" />}>
              <Translate t="search.result.flight_details.inseat_power.label" />
            </ListItem>
          )}
          {hasWifi && (
            <ListItem icon={<Wifi size="small" />}>
              <Translate t="search.result.flight_details.wifi.label" />
            </ListItem>
          )}
        </List>
      </TripSegment>

      {!last && (
        <TripLayover>
          <List size="small" type="secondary">
            {layover.duration > 0 && (
              <ListItem icon={<Clock />}>
                <TranslateNode
                  t="booking.global.layover"
                  values={{
                    time: <Time time={new Date(layover.duration)} />,
                  }}
                />
              </ListItem>
            )}

            {guarantee === "KIWI_COM" && (
              <ListItem icon={<Check />}>
                <Translate t="booking.global.guarantee.company_covered" />
              </ListItem>
            )}
            {(guarantee === "CARRIER" || isStationChange) && (
              <ListItem icon={<Check />}>
                <Translate t="booking.global.guarantee.airline_covered" />
              </ListItem>
            )}
            {isStationChange && (
              <ListItem icon={<Alert />}>
                <Translate t="booking.global.guarantee.airport_change" />
              </ListItem>
            )}
          </List>
        </TripLayover>
      )}
    </>
  );
};

export default ItinerarySegment;
