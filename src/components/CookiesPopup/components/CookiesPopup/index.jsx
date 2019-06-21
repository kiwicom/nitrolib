// @flow strict
import * as React from "react";
import Button from "@kiwicom/orbit-components/lib/Button";
import ButtonGroup from "@kiwicom/orbit-components/lib/ButtonGroup";
import Heading from "@kiwicom/orbit-components/lib/Heading";
import Text from "@kiwicom/orbit-components/lib/Text";
import Modal from "@kiwicom/orbit-components/lib/Modal";
import ModalSection from "@kiwicom/orbit-components/lib/Modal/ModalSection";
import Stack from "@kiwicom/orbit-components/lib/Stack";

type Props = {|
  onAccept: () => void,
  onCustomize: () => void,
|};

const CookiesBanner = ({ onAccept, onCustomize }: Props) => (
  <Modal onClose={onAccept}>
    <ModalSection>
      <Heading spaceAfter="medium">Cookies banner</Heading>
      <Text spaceAfter="large" element="p">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In molestie dictum congue. Nam vel
        lectus egestas, eleifend lorem ut, rutrum velit. Ut finibus semper gravida. Donec facilisis
        varius iaculis. Aliquam quis semper dolor. Ut vestibulum purus sit amet lectus vehicula
        sagittis. Mauris ut ullamcorper mi. Vestibulum feugiat tellus sit amet feugiat porttitor.
      </Text>
      <ButtonGroup>
        <Stack justify="end">
          <Button onClick={onCustomize} size="small" type="secondary">
            <Text weight="bold">Customize my preferences</Text>
          </Button>
          <Button onClick={onAccept} size="small">
            <Text type="white" weight="bold">
              I agree
            </Text>
          </Button>
        </Stack>
      </ButtonGroup>
    </ModalSection>
  </Modal>
);

export default CookiesBanner;
