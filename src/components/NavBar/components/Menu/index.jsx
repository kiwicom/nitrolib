// @flow strict
import * as React from "react";

import Text from "../../../Text";
import ValueBind from "../../../ValueBind";
import { useModal } from "../../../../services/modal/context";
import { useAuth } from "../../../../services/auth/context";
// import Trips from "../Trips";
import SideNav from "../SideNav";
import LoginButton from "../LoginButton";
import Account from "../Account";
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
  // eslint-disable-next-line no-unused-vars
  onSelectTrip,
  onSetModal,
}: Props) => {
  const { auth } = useAuth();
  const { onChange } = useModal();

  return (
    <>
      {auth === null ? (
        <ValueBind value={MODALS.MY_BOOKING} onChange={onChange}>
          {({ onClick }) => (
            <LoginButton onClick={onClick}>
              <Text t="account.sign_in" weight="bold" size="small" />
            </LoginButton>
          )}
        </ValueBind>
      ) : (
        // Deprecated: Account should open Account page, without Trips dropdown
        // <Trips auth={auth} env={environment} inverted={inverted} onSelect={onSelectTrip} />
        <Account auth={auth} inverted={inverted} />
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
