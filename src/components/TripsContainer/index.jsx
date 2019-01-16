// @flow
import * as React from "react";
import Portal from "@kiwicom/orbit-components/lib/Portal";
import Modal from "@kiwicom/orbit-components/lib/Modal";
import ModalHeader from "@kiwicom/orbit-components/lib/Modal/ModalHeader";
import ModalSection from "@kiwicom/orbit-components/lib/Modal/ModalSection";

import Mobile from "../Mobile";
import Desktop from "../Desktop";
import Popup from "./primitives/Popup";
import Header from "./primitives/Header";
import Content from "./primitives/Content";

type Props = {|
  header?: React.Node,
  children: React.Node,
  padding?: boolean,
  width?: string,
  positionMenuTablet?: number,
  positionMenuDesktop?: number,
  portal: string,
|};

const TripContainer = ({
  header,
  children,
  padding,
  width,
  positionMenuTablet,
  positionMenuDesktop,
  portal,
}: Props) => (
  <>
    <Mobile>
      <Portal element={portal}>
        <Modal>
          <ModalHeader>
            <ModalSection>
              <Header mobile>{header}</Header>
            </ModalSection>
          </ModalHeader>
          <ModalSection>{children}</ModalSection>
        </Modal>
      </Portal>
    </Mobile>
    <Desktop>
      <Popup
        positionMenuTablet={positionMenuTablet}
        positionMenuDesktop={positionMenuDesktop}
        width={width}
      >
        {header && <Header>{header}</Header>}
        <Content padding={padding}>{children}</Content>
      </Popup>
    </Desktop>
  </>
);

export default TripContainer;
