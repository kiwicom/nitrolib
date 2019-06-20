// @flow strict
import * as React from "react";
import { createFragmentContainer, graphql } from "react-relay";
import styled from "styled-components";
import CountryFlag from "@kiwicom/orbit-components/lib/CountryFlag";

import { themeDefault } from "../../records/Theme";
import type { ThemeProps } from "../../records/Theme";
import type { AirportResult_item } from "./__generated__/AirportResult_item.graphql";
import buttonMixin from "../../styles/mixins/button";

type ButtonProps = {|
  ...ThemeProps,
  selected?: boolean,
|};

const Container = styled.button`
  ${buttonMixin};
  display: flex;
  cursor: pointer;
  height: 48px;
  width: 100%;
  padding: 12px;
  background: ${({ theme, selected }: ButtonProps) =>
    theme.orbit[selected ? "paletteCloudNormal" : "paletteWhite"]};
  text-align: start;
  box-shadow: 0 1px 0 ${({ theme }: ThemeProps) => theme.orbit.paletteCloudNormal};
  transition: background ${({ theme }: ThemeProps) => theme.orbit.durationNormal};

  &:hover {
    background: ${({ theme }: ThemeProps) => theme.orbit.paletteCloudNormal};
  }
`;

Container.defaultProps = {
  theme: themeDefault,
};

const Name = styled.span`
  direction: ltr;
  margin: 0 6px;
`;

type Props = {|
  item: AirportResult_item,
  onClick: (id: string) => void,
  selected?: boolean,
|};

class AirportResult extends React.PureComponent<Props> {
  handleClick = () => {
    const { item, onClick } = this.props;

    if (typeof item.locationId === "string") {
      onClick(item.locationId);
    }
  };

  render() {
    const { item, selected } = this.props;

    const country = item.country?.locationId || "anywhere";

    return (
      <Container onClick={this.handleClick} selected={selected}>
        {/* $FlowExpected: CountryFlag's types are way too explicit */}
        <CountryFlag code={country.toLowerCase()} />
        <Name>{`${String(item.city?.name)} (${String(item.locationId)})`}</Name>
      </Container>
    );
  }
}

export const AirportResultUnwrapped = AirportResult;

export default createFragmentContainer(AirportResult, {
  item: graphql`
    fragment AirportResult_item on Location {
      locationId
      name
      city {
        name
      }
      country {
        locationId
      }
    }
  `,
});
