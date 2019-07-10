// @flow strict
import * as React from "react";
import Button from "@kiwicom/orbit-components/lib/Button";
import ButtonGroup from "@kiwicom/orbit-components/lib/ButtonGroup";
import Heading from "@kiwicom/orbit-components/lib/Heading";
import Text from "@kiwicom/orbit-components/lib/Text";
import Modal from "@kiwicom/orbit-components/lib/Modal";
import ModalSection from "@kiwicom/orbit-components/lib/Modal/ModalSection";
import Stack from "@kiwicom/orbit-components/lib/Stack";

import Translate from "../../../Translate";

type Props = {|
  onAccept: () => void,
  onCustomize: () => void
|};

const CookiesBanner = ({ onAccept, onCustomize }: Props) => (
  <Modal onClose={onAccept}>
    <ModalSection>
      <Heading spaceAfter="medium">
        <Translate t="content.cookies.banner.your_privacy.title" />
      </Heading>
      <Text spaceAfter="large" element="p">
        <Translate t="content.cookies.banner.your_privacy.text" html />
      </Text>
      <ButtonGroup>
        <Stack justify="end">
          <Button onClick={onCustomize} size="small" type="secondary">
            <Text weight="bold">
              <Translate t="content.cookies.banner.customize" />
            </Text>
          </Button>
          <Button onClick={() => onAccept()} size="small">
            <Text type="white" weight="bold">
              <Translate t="content.cookies.banner.accept" />
            </Text>
          </Button>
        </Stack>
      </ButtonGroup>
    </ModalSection>
  </Modal>
);

export default CookiesBanner;
