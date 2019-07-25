// @flow strict
import * as React from "react";
import styled, { css } from "styled-components";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import Close from "@kiwicom/orbit-components/lib/icons/Close";
import Text from "@kiwicom/orbit-components/lib/Text";
import mq from "@kiwicom/orbit-components/lib/utils/mediaQuery";

import Translate from "../../../../../Translate";
import type { BaggageCategory } from "../../../../../../records/Baggage";

type Props = {
  pickerType: BaggageCategory,
  isCurrentCombination: boolean,
};

const TextWrapper = styled.div`
  max-width: 110px;

  ${mq.mediumMobile(css`
    max-width: 200px;
  `)};
  ${mq.largeMobile(css`
    max-width: none;
  `)};
`;

const LineHeightFix = styled.div`
  > p {
    line-height: 24px;
  }
`;

const EmptyLabel = ({ pickerType, isCurrentCombination }: Props) => (
  <Stack
    spacing="condensed"
    flex
    align="start"
    largeMobile={{ align: "center" }}
    justify="between"
    dataTest="BaggagePicker-EmptyLabel"
  >
    <Stack flex align="start" largeMobile={{ align: "center" }} spacing="condensed" inline>
      <Close size="medium" />
      <TextWrapper>
        <LineHeightFix>
          <Text>
            <Translate
              t={
                pickerType === "handBag"
                  ? __("baggage_modal.select.no_cabin_baggage")
                  : __("baggage_modal.select.no_checked_baggage")
              }
            />
          </Text>
        </LineHeightFix>
      </TextWrapper>
    </Stack>
    {isCurrentCombination && (
      <Stack flex align="center" justify="end" inline>
        <LineHeightFix>
          <Text element="p" weight="bold" type="secondary">
            <Translate t="baggage_modal.select.current" />
          </Text>
        </LineHeightFix>
      </Stack>
    )}
  </Stack>
);

export default EmptyLabel;
