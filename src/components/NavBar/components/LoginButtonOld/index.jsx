// @flow
import * as React from "react";
import AccountCircle from "@kiwicom/orbit-components/lib/icons/AccountCircle";
import Mobile from "@kiwicom/orbit-components/lib/Mobile";
import Desktop from "@kiwicom/orbit-components/lib/Desktop";
import ButtonLink from "@kiwicom/orbit-components/lib/ButtonLink";

import Trips from "../Trips";
import ValueBind from "../../../ValueBind";
import type { Auth } from "../../../../records/Auth";
import * as MODALS from "../../../../consts/modals";
import Translate from "../../../Translate";

type Props = {|
  auth: Auth | null,
  onSelectTrip: (bid: string) => void,
  onChange: () => void,
|};

const LoginButtonOld = ({ auth, onSelectTrip, onChange }: Props) =>
  auth === null ? (
    <ValueBind value={MODALS.MY_BOOKING} onChange={onChange}>
      {({ onClick }) => (
        <>
          <Desktop>
            <ButtonLink transparent onClick={onClick} type="secondary">
              <Translate html t="account.my_bookings_action" />
            </ButtonLink>
          </Desktop>
          <Mobile>
            <ButtonLink type="secondary" transparent onClick={onClick}>
              <AccountCircle />
            </ButtonLink>
          </Mobile>
        </>
      )}
    </ValueBind>
  ) : (
    <Trips auth={auth} onSelect={onSelectTrip} />
  );

export default LoginButtonOld;
