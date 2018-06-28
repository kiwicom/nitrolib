// @flow strict
import * as React from "react";
import styled from "styled-components";

import Modal from "client/components/Modal";
import Text from "client/components/Text";
import { Consumer as BrandConsumer } from "client/services/brand/context";

const Container = styled.div``;

const Title = styled.h1``;

const Content = styled.p``;

const tKeys = {
  kayakwhite: __("content.cookies.kayakwhite"),
  kiwicom: __("content.cookies.kiwicom"),
  paragraphs: __("content.cookies.paragraphs"),
};

type Props = {|
  onClose: () => void,
|};

const InfoModal = ({ onClose }: Props) => (
  <Modal onClose={onClose}>
    <Container>
      <Title>
        <Text t={__("content.pages.cookies.title")} />
      </Title>
      <Content>
        <BrandConsumer>
          {brand => <Text t={tKeys[brand.content.legal.cookies.t_key]} html />}
        </BrandConsumer>
      </Content>
    </Container>
  </Modal>
);

export default InfoModal;
