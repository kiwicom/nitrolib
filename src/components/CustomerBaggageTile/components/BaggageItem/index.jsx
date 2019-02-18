// @flow strict
import * as React from "react";
import styled, { css } from "styled-components";
import BaggageChecked from "@kiwicom/orbit-components/lib/icons/BaggageChecked";
import BaggagePersonalItem from "@kiwicom/orbit-components/lib/icons/BaggagePersonalItem";
import BaggageCabin from "@kiwicom/orbit-components/lib/icons/BaggageCabin";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import Text from "@kiwicom/orbit-components/lib/Text";

import type { Restrictions, BaggageSubCategory } from "../../../../records/Baggage";
import { getIconFromCategory, getTextFromCategory } from "../../../../services/baggage/utils";
import Translate from "../../../Translate/index";
import { themeDefault } from "../../../../records/Theme";
import type { ThemeProps } from "../../../../records/Theme";
import mq from "../../../../styles/mq";

const BaggageRestrictionsWrapper = styled.div`
  display: flex;
  width: 100%;
  ${mq.ltBigMobile(css`
    width: 80%;
  `)};
  ${mq.ltMiddleMobile(css`
    display: none;
  `)};
`;
type BaggageRestrictionsProps = ThemeProps & {
  isMobile: boolean,
};

const BaggageRestrictions = styled.span`
  display: ${({ isMobile }: BaggageRestrictionsProps) => (isMobile ? "none" : "block")};
  color: ${({ theme }): ThemeProps => theme.orbit.colorTextSecondary};
  font-size: ${({ theme, isMobile }: BaggageRestrictionsProps) =>
    isMobile ? theme.orbit.fontSizeTextNormal : "inherit"};
  font-family: ${({ theme }): ThemeProps => theme.orbit.fontFamily};

  ${mq.ltMiddleMobile(css`
    display: ${({ isMobile }: BaggageRestrictionsProps) => (isMobile ? "inline-block" : "none")};
    padding-left: ${({ isMobile }: BaggageRestrictionsProps) => (isMobile ? "24px" : "0px")};
  `)};
`;

BaggageRestrictions.defaultProps = {
  theme: themeDefault,
  isMobile: false,
};

const getBaggageSize = ({ height, length, weight, width }) =>
  `${length} x ${width} x ${height} cm, ${weight} kg`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;
type Props = {
  category: BaggageSubCategory,
  amount: number,
  restrictions: Restrictions,
};

const BaggageItem = ({ category, amount, restrictions }: Props) => {
  const textWeight = category === "holdBag" ? "bold" : "normal";
  return (
    <Wrapper>
      <Stack shrink spacing="tight" direction="column">
        <Stack grow flex align="center" spacing="condensed">
          {getIconFromCategory(category, "small", "primary")}
          <Text element="span" weight={textWeight}>
            {`${amount}x ${restrictions.weight}kg `}
            {getTextFromCategory(category)}
          </Text>
        </Stack>
        <BaggageRestrictions isMobile>{getBaggageSize(restrictions)}</BaggageRestrictions>
      </Stack>
      <BaggageRestrictionsWrapper shrink>
        <BaggageRestrictions>{getBaggageSize(restrictions)}</BaggageRestrictions>
      </BaggageRestrictionsWrapper>
    </Wrapper>
  );
};

export default BaggageItem;
