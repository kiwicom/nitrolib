// @flow strict
import * as React from "react";
import styled from "styled-components";
import Text from "@kiwicom/orbit-components/lib/Text";
import Stack from "@kiwicom/orbit-components/lib/Stack";

import { themeDefault } from "../../../../records/Theme";

type Props = {
  text?: React.Node,
  children: React.Node,
};

const Menu = styled.div``;

Menu.defaultProps = {
  theme: themeDefault,
};

const MenuGroup = ({ text, children }: Props) => (
  <Menu itemScope itemType="http://www.schema.org/SiteNavigationElement">
    {text && (
      <Text uppercase weight="bold" size="small" spaceAfter="normal">
        {text}
      </Text>
    )}
    <Stack spaceAfter="large">{children}</Stack>
  </Menu>
);

export default MenuGroup;
