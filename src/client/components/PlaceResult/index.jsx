// @flow strict
import * as React from "react";
import { createFragmentContainer, graphql } from "react-relay";
import styled from "styled-components";

import type { PlaceResult_item } from "./__generated__/PlaceResult_item.graphql";

const Container = styled.button`
  display: flex;
  height: 44px;
  width: 100%;
  background: white;
`;

type Props = {|
  item: PlaceResult_item,
  onClick: (id: string) => void,
|};

class PlaceResult extends React.PureComponent<Props> {
  handleClick = () => {
    const { item, onClick } = this.props;

    if (typeof item.locationId === "string") {
      onClick(item.locationId);
    }
  };

  render() {
    return (
      <Container>
        <span>aAasdf</span>
      </Container>
    );
  }
}

export default createFragmentContainer(
  PlaceResult,
  graphql`
    fragment PlaceResult_item on Location {
      locationId
      name
      type
    }
  `,
);
