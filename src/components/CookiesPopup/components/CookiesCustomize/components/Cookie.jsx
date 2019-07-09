// @flow strict
import * as React from "react";
import styled, { css } from "styled-components";
import Text from "@kiwicom/orbit-components/lib/Text";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import Separator from "@kiwicom/orbit-components/lib/Separator";
import mq from "@kiwicom/orbit-components/lib/utils/mediaQuery";

import { themeDefault } from "../../../../../records/Theme";
import Translate from "../../../../Translate";

type Props = {|
  category: string,
  description: string,
  children: React.Node,
  borderOff?: boolean,
|};

const CategoryWrapper = styled.div`
  width: 100%;

  ${mq.tablet(css`
    max-width: 220px;
  `)}
`;

CategoryWrapper.defaultProps = {
  theme: themeDefault,
};

const Cookie = ({ category, description, children, borderOff }: Props) => (
  <Stack flex direction="column" justify="between" tablet={{ direction: "row" }}>
    <CategoryWrapper>
      <Text weight="bold" spaceAfter="small">
        <Translate t={category} />
      </Text>
    </CategoryWrapper>
    <Stack flex shrink direction="column">
      <Text spaceAfter="medium" size="small">
        <Translate t={description} />
      </Text>
      {children}
      {!borderOff && <Separator />}
    </Stack>
  </Stack>
);

export default Cookie;
