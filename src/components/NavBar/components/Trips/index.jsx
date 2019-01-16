// @flow strict
import * as React from "react";
import type { Environment } from "react-relay";

import ClickOutside from "../../../ClickOutside";
import TripDataList from "./components/TripDataList";

type Props = {|
  env: Environment,
  portal: string,
  open: boolean,
  onToggle: () => void,
  onSelect: (bid: string) => void,
|};

const Trips = ({ env, portal, open, onToggle, onSelect }: Props) =>
  open && (
    <ClickOutside
      onClickOutside={ev => {
        ev.stopPropagation();
        onToggle();
      }}
    >
      <TripDataList env={env} portal={portal} onSelect={onSelect} />
    </ClickOutside>
  );

export default Trips;
