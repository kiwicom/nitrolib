// @flow
import * as React from "react";
import BaggagePersonalItemNone from "@kiwicom/orbit-components/lib/icons/BaggagePersonalItemNone";
import Stack from "@kiwicom/orbit-components/lib/Stack";

import BaggageItem from "../BaggageItem";

type Props = {
  handBags: {},
  holdBags: {},
  orderStatus: "unpaid" | "processing" | "notAvailable",
};

const TileContent = ({ handBags, holdBags }: Props) => {
  const handBagsArr = Object.keys(handBags).map(key => ({ key, ...handBags[key] }));
  const holdBagsArr = Object.keys(holdBags).map(key => ({ key, ...holdBags[key] }));
  // $FlowFixMe
  const hasPersonalItem = Boolean(handBagsArr.find(bag => bag.category === "personalItem"));

  return (
    <Stack>
      {!hasPersonalItem && (
        <span>
          <BaggagePersonalItemNone size="small" /> No personal item
        </span>
      )}
      {handBagsArr.map(bag => (
        <BaggageItem
          key={bag.key}
          amount={bag.amount}
          restrictions={bag.restrictions}
          category={bag.category}
        />
      ))}
      {holdBagsArr.map(bag => (
        <BaggageItem
          key={bag.key}
          amount={bag.amount}
          restrictions={bag.restrictions}
          category={bag.category}
        />
      ))}
    </Stack>
  );
};

export default TileContent;
