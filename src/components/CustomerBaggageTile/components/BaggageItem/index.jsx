// @flow strict
import * as React from "react";
import styled, { css } from "styled-components";
import BaggageChecked from "@kiwicom/orbit-components/lib/icons/BaggageChecked";
import BaggagePersonalItem from "@kiwicom/orbit-components/lib/icons/BaggagePersonalItem";
import BaggageCabin from "@kiwicom/orbit-components/lib/icons/BaggageCabin";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import Text from "@kiwicom/orbit-components/lib/Text";

import type { Restrictions, BaggageSubCategory } from "../../../../records/Baggage";
import Translate from "../../../Translate/index";
import { themeDefault } from "../../../../records/Theme";
import type { ThemeProps } from "../../../../records/Theme";
import mq from "../../../../styles/mq";

const getIconFromCategory = category => {
  switch (category) {
    case "personalItem":
      return <BaggagePersonalItem size="small" color="primary" />;
    case "cabinBag":
      return <BaggageCabin size="small" color="primary" />;
    case "holdBag":
      return <BaggageChecked size="small" color="primary" />;
    default:
      break;
  }
};

const getTextFromCategory = category => {
  switch (category) {
    case "personalItem":
      return <Translate t="common.baggage.personal_item" />;
    case "cabinBag":
      return <Translate t="common.baggage.cabin_bag" />;
    case "holdBag":
      return <Translate t="common.baggage.checked_bag" />;
    default:
      return <Translate t="common.baggage.no_checked_baggage" />;
  }
};

type BaggageSizeTextProps = ThemeProps & {
  isMobile: boolean,
};
const BaggageSizeText = styled.p`
  display: ${({ isMobile }: BaggageSizeTextProps) => (isMobile ? "none" : "block")};
  color: ${({ theme }): ThemeProps => theme.orbit.colorTextSecondary};
  font-size: ${({ theme, isMobile }: BaggageSizeTextProps) =>
    isMobile ? theme.orbit.fontSizeTextSmall : theme.orbit.fontSizeTextNormal};
  font-family: ${({ theme }): ThemeProps => theme.orbit.fontFamily};
  margin: 0;

  ${mq.ltBigMobile(css`
    display: ${({ isMobile }: BaggageSizeTextProps) => (isMobile ? "block" : "none")};
  `)};
`;

BaggageSizeText.defaultProps = {
  theme: themeDefault,
  isMobile: false,
};

const getBaggageSize = ({ height, length, weight, width }) =>
  `${length} x ${width} x ${height} cm, ${weight} kg`;

const Wrapper = styled.div`
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
      <Stack spacing="tight">
        <Stack grow flex align="center" spacing="condensed">
          {getIconFromCategory(category)}
          <Text element="span" weight={textWeight}>
            {`${amount}x ${restrictions.weight}kg `}
            {getTextFromCategory(category)}
          </Text>
        </Stack>
        <BaggageSizeText isMobile>{getBaggageSize(restrictions)}</BaggageSizeText>
      </Stack>
      <Stack shrink>
        <BaggageSizeText>{getBaggageSize(restrictions)}</BaggageSizeText>
      </Stack>
    </Wrapper>
  );
};

export default BaggageItem;
