// @flow
import * as React from "react";
import type { Environment } from "@kiwicom/relay";
import AccountCircle from "@kiwicom/orbit-components/lib/icons/AccountCircle";

import Trips from "../Trips";
import ValueBind from "../../../ValueBind";
import Desktop from "../../../Desktop";
import Mobile from "../../../Mobile";
import type { Auth } from "../../../../records/Auth";
import * as MODALS from "../../../../consts/modals";
import Button from "../Button";
import Translate from "../../../Translate";

type Props = {|
  auth: Auth | null,
  env: Environment,
  onSelectTrip: (bid: string) => void,
  inverted: boolean,
  onChange: () => void,
|};

const LoginButtonOld = ({ auth, env, onSelectTrip, inverted, onChange }: Props) =>
  auth === null ? (
    <ValueBind value={MODALS.MY_BOOKING} onChange={onChange}>
      {({ onClick }) => (
        <>
          <Desktop display="flex">
            <Button onClick={onClick} color={inverted ? "white" : "secondary"}>
              <Translate t="account.my_bookings_action" />
            </Button>
          </Desktop>
          <Mobile display="flex">
            <Button
              color={inverted ? "white" : "secondary"}
              ariaLabel="account.my_bookings_action"
              onClick={onClick}
            >
              <AccountCircle />
            </Button>
          </Mobile>
        </>
      )}
    </ValueBind>
  ) : (
    <Trips auth={auth} env={env} inverted={inverted} onSelect={onSelectTrip} />
  );

export default LoginButtonOld;
