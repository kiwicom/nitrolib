// @flow
import * as React from "react";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import Close from "@kiwicom/orbit-components/lib/icons/Close";
import Text from "@kiwicom/orbit-components/lib/Text";

import Translate from "../../../../../Translate/index";
import type { BaggageCategory } from "../../../../../../records/Baggage.js.flow";

type Props = {
  pickerType: BaggageCategory,
  isCurrentCombination: boolean,
};

const EmptyLabel = ({ pickerType, isCurrentCombination }: Props) => (
  <Stack
    spacing="condensed"
    flex
    align="center"
    justify="between"
    dataTest="BaggagePicker-EmptyLabel"
  >
    <Stack flex align="center" inline>
      <Close size="medium" />
      <Text>
        <Translate
          t={
            pickerType === "handBag"
              ? "baggage_modal.select.no_cabin_baggage"
              : "baggage_modal.select.no_checked_baggage"
          }
        />
      </Text>
    </Stack>
    {isCurrentCombination && (
      <Stack flex align="center" justify="end" inline>
        <Text element="p" weight="bold" type="secondary">
          <Translate t="baggage_modal.select.current" />
        </Text>
      </Stack>
    )}
  </Stack>
);

export default EmptyLabel;
