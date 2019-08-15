// @flow strict
import * as React from "react";
import styled, { keyframes } from "styled-components";
import Text from "@kiwicom/orbit-components/lib/Text";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import Button from "@kiwicom/orbit-components/lib/Button";
import TextLink from "@kiwicom/orbit-components/lib/TextLink";
import CheckCircle from "@kiwicom/orbit-components/lib/icons/CheckCircle";
import Badge from "@kiwicom/orbit-components/lib/Badge";

import { themeDefault } from "../../../../../../records/Theme";
import Translate from "../../../../../Translate";
import TranslateNode from "../../../../../TranslateNode";
import Price from "../../../../../Price";
import type { PriceType } from "../../../../../../records/Price";

type Props = {|
  blueRibbonBagPrice: PriceType,
  isBlueRibbonBagAdded: boolean,
  addBlueRibbonBag: () => void,
  removeBlueRibbonBag: () => void,
  openBlueribbonBagsSmartFAQ: () => void,
|};

const fadeIn = keyframes`
  from {
    max-height: 0;
    opacity: 0;
  }
  to {
    max-height: 100%;
    opacity: 1;
  }
`;

const TranslateNodeWrapper = styled.span`
  white-space: pre;
`;

const RemoveButtonWrapper = styled.div`
  padding: ${themeDefault.orbit.spaceXXSmall} 0;
`;

const Wrapper = styled.div`
  animation: ${fadeIn} ${themeDefault.orbit.durationNormal} ease-in-out;
  overflow: hidden;
`;

const AddBlueRibbonBags = ({
  blueRibbonBagPrice,
  isBlueRibbonBagAdded,
  addBlueRibbonBag,
  removeBlueRibbonBag,
  openBlueribbonBagsSmartFAQ,
}: Props) => {
  return (
    <Wrapper dataTest="BaggagePickerBRBRedesign-AddBlueRibbonBags">
      <Stack spacing="compact">
        <Stack spacing="tight">
          <Text weight="bold" size="small" element="p">
            <Translate t="baggage_modal.blue_ribbon_bags.lost_bag_protection" />{" "}
            <Text type="secondary" size="small" element="span">
              <Translate t="baggage_modal.blue_ribbon_bags.provided_by_brb" />
            </Text>
          </Text>
          <Text element="p" size="small">
            <Translate t="baggage_modal.blue_ribbon_bags.collect_money_for_missing_bags" />{" "}
            <TextLink type="secondary" external={false} onClick={openBlueribbonBagsSmartFAQ}>
              <Translate t="common.learn_more" />
            </TextLink>
          </Text>
        </Stack>
        {isBlueRibbonBagAdded ? (
          <RemoveButtonWrapper>
            <Stack flex align="center">
              <Badge type="success" icon={<CheckCircle />}>
                <Translate t="baggage_modal.blue_ribbon_bags.added" />
              </Badge>
              <TextLink
                type="secondary"
                size="small"
                onClick={removeBlueRibbonBag}
                dataTest="BaggagePickerBRBRedesign-RemoveBlueRibbonBagButton"
              >
                <Translate t="baggage_modal.blue_ribbon_bags.remove" />
              </TextLink>
            </Stack>
          </RemoveButtonWrapper>
        ) : (
          <Button
            type="primary"
            size="small"
            onClick={addBlueRibbonBag}
            dataTest="BaggagePickerBRBRedesign-AddBlueRibbonBagButton"
          >
            <TranslateNodeWrapper>
              <TranslateNode
                t="baggage_modal.blue_ribbon_bags.add_bag_protection"
                values={{
                  price: <Price value={blueRibbonBagPrice.amount} />,
                }}
              />
            </TranslateNodeWrapper>
          </Button>
        )}
      </Stack>
    </Wrapper>
  );
};

export default AddBlueRibbonBags;
