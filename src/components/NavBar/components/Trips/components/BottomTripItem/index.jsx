// @flow
import React from "react";
import styled, { css } from "styled-components";

import mq from "../../../../../../styles/mq";
import ItemWrapper from "../../primitives/ItemWrapper";

const handleSelect = (id: string, language: string) => {
  window.location.href = `/${language}/account/bookings/${id}`;
};

type Props = {|
  id: string,
  imageUrl: string,
  lang: string,
|};

const Img = styled.img`
  display: flex;
  justify-content: center;
  overflow: hidden;
  height: 50px;
  width: 45px;
  ${mq.ltMiddleMobile(css`
    height: 30px;
    width: auto;
  `)};
`;

const BottomTripItem = ({ id, imageUrl, lang }: Props) => (
  <ItemWrapper onClick={() => handleSelect(id, lang)}>
    <Img src={imageUrl} alt="trips" />
  </ItemWrapper>
);

export default BottomTripItem;
