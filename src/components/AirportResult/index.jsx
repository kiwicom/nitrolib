// @flow strict
import * as React from "react";
import { createFragmentContainer, graphql } from "react-relay";
import styled from "styled-components";
import idx from "idx";

import Flag from "../Flag";
import { brandDefault } from "../../records/Brand";
import type { ThemeProps } from "../../records/Brand";
import type { AirportResult_item } from "./__generated__/AirportResult_item.graphql";

type ButtonProps = ThemeProps & {
  selected: boolean,
};

const Container = styled.button`
  display: flex;
  cursor: pointer;
  height: 48px;
  width: 100%;
  padding: 12px;
  margin: 0;
  background: ${({ theme, selected }: ButtonProps) =>
    theme.colors[selected ? "neutral-100" : "white"]};
  text-align: start;
  border: none;
  box-shadow: 0 1px 0 ${({ theme }: ThemeProps) => theme.colors["neutral-100"]};
  transition: background 0.3s;

  &:hover {
    background: ${({ theme }: ThemeProps) => theme.colors["neutral-100"]};
  }

  &:focus {
    outline: none;
  }
`;

Container.defaultProps = {
  theme: brandDefault.theme,
};

type Props = {|
  item: AirportResult_item,
  onClick: (id: string) => void,
  selected: boolean,
|};

class AirportResult extends React.PureComponent<Props> {
  static defaultProps = {
    selected: false,
  };

  handleClick = () => {
    const { item, onClick } = this.props;

    if (typeof item.locationId === "string") {
      onClick(item.locationId);
    }
  };

  render() {
    const { item, selected } = this.props;

    const country = idx(item, _ => _.country.locationId) || "anywhere";
    return (
      <Container onClick={this.handleClick} selected={selected}>
        <Flag country={country.toLowerCase()} />
        {`${String(idx(item, _ => _.city.name))} (${String(item.locationId)})`}
      </Container>
    );
  }
}

export const AirportResultUnwrapped = AirportResult;

export default createFragmentContainer(
  AirportResult,
  graphql`
    fragment AirportResult_item on Location {
      locationId
      name
      type
      city {
        name
      }
      country {
        locationId
      }
    }
  `,
);
