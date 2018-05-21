// @flow strict
import * as React from "react";
import styled from "styled-components";

import Text from "client/components/Text";
import { getIcon } from "./Constants";

type Props = {|
  onClick?: ?() => void,
  iconName: string,
  text: string,
  href?: ?string,
|};

const Container = styled.div``;

const MenuItem = ({ onClick, iconName, text, href }: Props) => {
  const Icon = getIcon(iconName || "Kiwicom");

  const inner = (
    <>
      <Icon />
      <span itemProp="name">
        <Text t={text} />
      </span>
    </>
  );

  return (
    <Container onClick={onClick}>
      {href === undefined ? (
        <a href={href} itemProp="url">
          {inner}
        </a>
      ) : (
        <a>{inner}</a>
      )}
    </Container>
  );
};

export default MenuItem;
