// @flow strict
import * as React from "react";
import Button from "@kiwicom/orbit-components/lib/Button";
import ButtonGroup from "@kiwicom/orbit-components/lib/ButtonGroup";
import Heading from "@kiwicom/orbit-components/lib/Heading";
import Modal from "@kiwicom/orbit-components/lib/Modal";
import ModalSection from "@kiwicom/orbit-components/lib/Modal/ModalSection";

type Props = {|
  onAccept: () => void,
  onCustomize: () => void
|};

const CookiesBanner = ({ onAccept, onCustomize }: Props) => (
  <Modal onClose={onAccept}>
    <ModalSection>
      <Heading>Cookies banner</Heading>
      Some cookies text
      <ButtonGroup>
        <Button onClick={onCustomize} size="small" type="secondary">
          Customize my preferences
        </Button>
        <Button onClick={onAccept} size="small">
          I agree
        </Button>
      </ButtonGroup>
    </ModalSection>
  </Modal>
);

export default CookiesBanner;
