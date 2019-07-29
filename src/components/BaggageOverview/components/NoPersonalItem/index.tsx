import * as React from "react";
import Text from "@kiwicom/orbit-components/lib/Text";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import BaggagePersonalItemNone from "@kiwicom/orbit-components/lib/icons/BaggagePersonalItemNone";

import Translate from "../../../Translate";

const NoPersonalItem = () => (
  <Stack shrink spacing="condensed" align="center" dataTest="BaggageOverview-NoPersonalItem">
    <BaggagePersonalItemNone size="medium" color="primary" />
    <Text>
      <Translate t="baggage_modal.select.no_personal_item" />
    </Text>
  </Stack>
);

export default NoPersonalItem;
