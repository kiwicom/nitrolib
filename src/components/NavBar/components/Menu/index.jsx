// @flow strict
import * as React from "react";
import AccountCircle from "@kiwicom/orbit-components/lib/icons/AccountCircle";

import Desktop from "../../../Desktop";
import Mobile from "../../../Mobile";
import Translate from "../../../Translate";
import ValueBind from "../../../ValueBind";
import { useModal } from "../../../../services/modal/context";
import { useAuth } from "../../../../services/auth/context";
import Button from "../Button";
import Trips from "../Trips";
import SideNav from "../SideNav";
import * as MODALS from "../../../../consts/modals";
import type { Modal } from "../../../../consts/modals";

type Props = {|
  subscription: React.Node,
  debug?: React.Node,
  portal: string,
  inverted: boolean,
  onSetModal: (modal: Modal) => void,
  onSaveLanguage: (lang: string) => void,
  onSelectTrip: (bid: string) => void,
|};

const Menu = ({
  subscription,
  debug,
  portal,
  inverted,
  onSaveLanguage,
  onSelectTrip,
  onSetModal,
}: Props) => {
  const { auth, environment } = useAuth();
  const { onChange } = useModal();

  return (
    <>
      {auth === null ? (
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
        <Trips auth={auth} env={environment} inverted={inverted} onSelect={onSelectTrip} />
      )}
      <SideNav
        subscription={subscription}
        debug={debug}
        inverted={inverted}
        portal={portal}
        onOpenModal={onChange}
        onSaveLanguage={onSaveLanguage}
        onSetModal={onSetModal}
      />
    </>
  );
};

export default Menu;
