// @flow strict
import * as React from "react";
import styled from "styled-components";
import * as R from "ramda";

import Modal from "client/components/Modal";
import Text from "client/components/Text";

import { Consumer as BrandConsumer } from "client/services/brand/context";

const Container = styled.div``;

const Title = styled.h1``;

const Content = styled.p``;

type Props = {|
  close: () => void,
|};

const getCookiesTKey = R.path(["content", "legal", "cookies", "t_key"]);

const InfoModal = ({ close }: Props) => (
  <Modal onClose={close}>
    <Container>
      <Title>
        <Text t={__("content.pages.cookies.title")} />
      </Title>
      <Content>
        <BrandConsumer>
          {brand => <Text t={`content.cookies.${getCookiesTKey(brand)}`} html />}
        </BrandConsumer>
      </Content>
    </Container>
  </Modal>
);

export default InfoModal;
