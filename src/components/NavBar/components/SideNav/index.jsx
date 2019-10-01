// @flow strict
import * as React from "react";
import Modal from "@kiwicom/orbit-components/lib/Modal";
import Portal from "@kiwicom/orbit-components/lib/Portal";
import ModalSection from "@kiwicom/orbit-components/lib/Modal/ModalSection";
import Drawer from "@kiwicom/orbit-components/lib/Drawer";

import ContentNew from "./ContentNew";
import Content from "./Content";
import ClientOnly from "../../../ClientOnly";
import * as MODALS from "../../../../consts/modals";
import type { Modal as ModalType } from "../../../../consts/modals";

type Props = {|
  subscription: React.Node,
  debug?: React.Node,
  portal: string,
  onOpenModal: (value: string) => void,
  onToggle: () => void,
  isOpenNav: string,
  newDesign: boolean,
  onSaveLanguage: (lang: string) => void,
  onSetModal: (modal: ModalType) => void,
|};

const SideNav = ({
  subscription,
  debug,
  newDesign,
  onSaveLanguage,
  portal,
  onSetModal,
  onOpenModal,
  isOpenNav,
  onToggle,
}: Props) => {
  const [state, setState] = React.useState({
    modalOpen: MODALS.NONE,
  });

  React.useEffect(() => {
    onSetModal(MODALS.SIDE_NAV);
    setState({ modalOpen: isOpenNav });
  }, [isOpenNav, onSetModal]);

  const { modalOpen } = state;

  const handleOpenSignIn = () => {
    onOpenModal(MODALS.SIGN_IN);

    setState({ modalOpen: MODALS.NONE });
  };

  const handleOpenRegister = () => {
    onOpenModal(MODALS.REGISTER);

    setState({ modalOpen: MODALS.NONE });
  };

  const handleOpenSubscription = () => {
    onSetModal(MODALS.SUBSCRIPTION);

    setState({ modalOpen: MODALS.SUBSCRIPTION });
  };

  const handleOpenDebug = () => {
    onSetModal(MODALS.DEBUG);

    setState({ modalOpen: MODALS.DEBUG });
  };

  return (
    <>
      <ClientOnly>
        <Portal renderInto={portal}>
          <Drawer noPadding onClose={onToggle} shown={isOpenNav === MODALS.SIDE_NAV}>
            {newDesign ? (
              <ContentNew
                handleOpenDebug={handleOpenDebug}
                handleOpenSignIn={handleOpenSignIn}
                handleOpenSubscription={handleOpenSubscription}
                handleOpenRegister={handleOpenRegister}
                onSaveLanguage={onSaveLanguage}
                onToggle={onToggle}
                debug={debug}
              />
            ) : (
              <Content
                handleOpenDebug={handleOpenDebug}
                handleOpenSignIn={handleOpenSignIn}
                handleOpenSubscription={handleOpenSubscription}
                handleOpenRegister={handleOpenRegister}
                onSaveLanguage={onSaveLanguage}
                onToggle={onToggle}
                debug={debug}
              />
            )}
          </Drawer>
        </Portal>
      </ClientOnly>
      {/* MODALS */}
      {modalOpen === MODALS.SUBSCRIPTION && (
        <Portal renderInto={portal}>
          <Modal onClose={onToggle}>
            <ModalSection>{subscription}</ModalSection>
          </Modal>
        </Portal>
      )}
      {modalOpen === MODALS.DEBUG && (
        <Portal renderInto={portal}>
          <Modal onClose={onToggle}>
            <ModalSection>{debug || null}</ModalSection>
          </Modal>
        </Portal>
      )}
    </>
  );
};

export default SideNav;
