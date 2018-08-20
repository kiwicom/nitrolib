// @flow
import React from "react";
import styled from "styled-components";

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
`;

const BottomTripItem = ({ id, imageUrl, lang }: Props) => (
  <ItemWrapper onClick={() => handleSelect(id, lang)}>
    <Img src={imageUrl} alt="trips" height="45" />
  </ItemWrapper>
);

export default BottomTripItem;
