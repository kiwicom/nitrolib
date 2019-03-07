// @flow strict

import * as React from "react";
import styled from "styled-components";
import Modal from "@kiwicom/orbit-components/lib/Modal";
import ModalHeader from "@kiwicom/orbit-components/lib/Modal/ModalHeader";
import ModalSection from "@kiwicom/orbit-components/lib/Modal/ModalSection";
import ModalFooter from "@kiwicom/orbit-components/lib/Modal/ModalFooter";
import Button from "@kiwicom/orbit-components/lib/Button";
import Text from "@kiwicom/orbit-components/lib/Text";

import Translate from "../../../Translate";
import { themeDefault } from "../../../../records/Theme";
import type { LocationType } from "../../records/Location";
import LocationMap from "../LocationMap";

export type Props = {|
  location: LocationType,
  onClose: Function,
|};

const Address = styled.div`
  margin-top: -${({ theme }) => theme.orbit.spaceMedium};
  margin-bottom: ${({ theme }) => theme.orbit.spaceSmall};
`;

Address.defaultProps = {
  theme: themeDefault,
};

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const AccommodationModal = ({ location, onClose }: Props) => {
  return (
    <Modal onClose={onClose(false)} fixedFooter>
      <ModalHeader title={<Translate t="holidays.accommodation_modal.title" />} />
      <ModalSection>
        {location.address && (
          <Address>
            <Text size="large">{location.address}</Text>
          </Address>
        )}
        <LocationMap {...location} />
      </ModalSection>
      <ModalFooter flex="1 1 100%">
        <ButtonWrapper>
          <Button onClick={onClose(false)}>
            <Translate t="holidays.accommodation_modal.close" />
          </Button>
        </ButtonWrapper>
      </ModalFooter>
    </Modal>
  );
};

export default AccommodationModal;
