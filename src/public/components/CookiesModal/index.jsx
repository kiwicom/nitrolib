// @flow strict
import * as React from "react";
import styled from "styled-components";

import Modal from "public/components/Modal/index";
import Text from "public/components/Text/index";
import { Consumer as BrandConsumer } from "public/services/brand/context";

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

const CookiesModal = ({ onClose }: Props) => (
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

export default CookiesModal;
