// @flow strict
import * as React from "react";
import BaggageChecked from "@kiwicom/orbit-components/lib/icons/BaggageChecked";
import BaggagePersonalItem from "@kiwicom/orbit-components/lib/icons/BaggagePersonalItem";
import BaggageCabin from "@kiwicom/orbit-components/lib/icons/BaggageCabin";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import Text from "@kiwicom/orbit-components/lib/Text";

import type { Restrictions, BaggageSubCategory } from "../../../../records/Baggage";
import Translate from "../../../Translate/index";

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

const getBaggageSize = ({ height, length, weight, width }) =>
  `${length} x ${width} x ${height} cm, ${weight} kg`;

type Props = {
  category: BaggageSubCategory,
  amount: number,
  restrictions: Restrictions,
};

const BaggageItem = ({ category, amount, restrictions }: Props) => {
  const textWeight = category === "holdBag" ? "bold" : "normal";
  return (
    <Stack flex align="center" shrink>
      <Stack align="center" shrink spacing="tight">
        <Stack flex spacing="condensed">
          {getIconFromCategory(category)}
          <Text element="span" weight={textWeight}>
            {`${amount}x ${restrictions.weight}kg `}
            {getTextFromCategory(category)}
          </Text>
        </Stack>
      </Stack>

      <Stack>
        <Text element="span" weight={textWeight} type="secondary">
          {getBaggageSize(restrictions)}
        </Text>
      </Stack>
    </Stack>
  );
};

export default BaggageItem;
