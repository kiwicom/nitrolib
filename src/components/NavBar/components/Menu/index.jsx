// @flow strict
import * as React from "react";
import AccountCircle from "@kiwicom/orbit-components/lib/icons/AccountCircle";
import Stack from "@kiwicom/orbit-components/lib/Stack";

import Desktop from "../../../Desktop";
import Mobile from "../../../Mobile";
import Translate from "../../../Translate";
import ValueBind from "../../../ValueBind";
import { Consumer as ModalConsumer } from "../../../../services/modal/context";
import { Consumer as AuthConsumer } from "../../../../services/auth/context";
import Button from "../../primitives/Button";
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
}: Props) => (
  <ModalConsumer>
    {({ onChange }) => (
      <>
        <AuthConsumer>
          {({ auth, environment }) =>
            auth === null ? (
              <ValueBind value={MODALS.MY_BOOKING} onChange={onChange}>
                {({ onClick }) => (
                  <>
                    <Desktop display="flex">
                      <Button onClick={onClick} color={!inverted && "secondary"}>
                        <Translate t="account.my_bookings_action" />
                      </Button>
                    </Desktop>
                    <Mobile display="flex">
                      <Button color={!inverted && "secondary"} onClick={onClick}>
                        <AccountCircle />
                      </Button>
                    </Mobile>
                  </>
                )}
              </ValueBind>
            ) : (
              <Trips auth={auth} env={environment} onSelect={onSelectTrip} />
            )
          }
        </AuthConsumer>

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
    )}
  </ModalConsumer>
);

export default Menu;
