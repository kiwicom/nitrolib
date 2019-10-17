// @flow strict
import * as React from "react";

import Text from "../../../Text";
import ValueBind from "../../../ValueBind";
import { useModal } from "../../../../services/modal/context";
import { useAuth } from "../../../../services/auth/context";
import SideNav from "../SideNav";
import LoginButton from "../LoginButton";
import Account from "../Account";
import * as MODALS from "../../../../consts/modals";
import type { Modal } from "../../../../consts/modals";
import OldLoginButton from "../LoginButtonOld";

type Props = {|
  subscription: React.Node,
  debug?: React.Node,
  portal: string,
  shown: boolean,
  isOpenNav: boolean,
  onToggle: () => void,
  onSetModal: (modal: Modal) => void,
  onSaveLanguage: (lang: string) => void,
  onSelectTrip: (bid: string) => void,
  newDesign: boolean,
  sideNav: boolean,
|};

const Menu = ({
  subscription,
  debug,
  portal,
  shown,
  onSaveLanguage,
  onSelectTrip,
  onToggle,
  newDesign,
  sideNav,
  onSetModal,
  isOpenNav,
}: Props) => {
  const { auth } = useAuth();
  const { onChange } = useModal();

  return (
    // TODO: remove that ugly stuff after new navbar release
    <>
      {shown &&
        ((newDesign &&
          (auth === null ? (
            <ValueBind value={MODALS.MY_BOOKING} onChange={onChange}>
              {({ onClick }) => (
                <LoginButton onClick={onClick}>
                  <Text t="account.sign_in" size="small" weight="bold" />
                </LoginButton>
              )}
            </ValueBind>
          ) : (
            <Account auth={auth} />
          ))) || <OldLoginButton auth={auth} onChange={onChange} onSelectTrip={onSelectTrip} />)}

      {sideNav && (
        <SideNav
          subscription={subscription}
          debug={debug}
          portal={portal}
          onToggle={onToggle}
          isOpenNav={isOpenNav}
          newDesign={newDesign}
          onOpenModal={onChange}
          onSaveLanguage={onSaveLanguage}
          onSetModal={onSetModal}
        />
      )}
    </>
  );
};

export default Menu;
