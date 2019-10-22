// @flow strict
import * as React from "react";
import styled from "styled-components";
import Text from "@kiwicom/orbit-components/lib/Text";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import Button from "@kiwicom/orbit-components/lib/Button";
import TextLink from "@kiwicom/orbit-components/lib/TextLink";
import List, { ListItem } from "@kiwicom/orbit-components/lib/List";
import CheckCircle from "@kiwicom/orbit-components/lib/icons/CheckCircle";
import Check from "@kiwicom/orbit-components/lib/icons/Check";
import PlusCircle from "@kiwicom/orbit-components/lib/icons/PlusCircle";
import Badge from "@kiwicom/orbit-components/lib/Badge";
import { rtlSpacing } from "@kiwicom/orbit-components/lib/utils/rtl";

import { themeDefault } from "../../../../../../records/Theme";
import Translate from "../../../../../Translate";
import TranslateRef from "../../../../../TranslateRef";
import Price from "../../../../../Price";
import type { PriceType } from "../../../../../../records/Price";

type Props = {|
  blueRibbonBagPrice: PriceType,
  isBlueRibbonBagAdded: boolean,
  addBlueRibbonBag: () => void,
  removeBlueRibbonBag: () => void,
  openBlueribbonBagsSmartFAQ: () => void,
|};

const TransitionWrapper = styled.div`
  transition: opacity ${themeDefault.orbit.durationNormal} linear;
  visibility: ${({ visible }) => (visible ? "visible" : "hidden")};
  opacity: ${({ visible }) => (visible ? "1" : "0")};
  max-height: ${({ visible }) => (visible ? "285px" : "0")};
`;

const AddSectionTransitionWrapper = styled(TransitionWrapper)`
  transition: all ${themeDefault.orbit.durationNormal} linear;
`;

const RemoveSectionTransitionWrapper = styled(TransitionWrapper)``;

const LearnMoreWrapper = styled.div`
  padding: ${rtlSpacing(`0 0 0 ${themeDefault.orbit.spaceLarge}`)};
`;

const Wrapper = styled.div`
  overflow: hidden;
`;

const ButtonContentWrapper = styled.span`
  line-height: ${themeDefault.orbit.lineHeightHeading};
`;

const LineHeightTextNormalWrapper = styled.span`
  line-height: ${themeDefault.orbit.lineHeightTextNormal};
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
      <Text
        weight="bold"
        size="small"
        element="p"
        spaceAfter={isBlueRibbonBagAdded ? "small" : "smallest"}
      >
        <TranslateRef
          t="baggage_modal.blue_ribbon_bags.lost_bag_protection"
          render={refContent => (
            <Text type="secondary" size="small" element="span">
              {refContent}
            </Text>
          )}
        />
      </Text>
      <AddSectionTransitionWrapper visible={!isBlueRibbonBagAdded}>
        <Stack spacing="compact">
          <Stack spacing="none">
            <List size="small">
              <ListItem icon={<Check />}>
                <Translate t="baggage_modal.blue_ribbon_bags.track_delayed_bags" />
              </ListItem>
              <ListItem icon={<Check />}>
                <Translate t="baggage_modal.blue_ribbon_bags.collect_money_for_missing_bags" />
              </ListItem>
            </List>
            <LearnMoreWrapper>
              <TextLink
                size="small"
                type="secondary"
                external={false}
                onClick={openBlueribbonBagsSmartFAQ}
              >
                <Translate t="common.learn_more" />
              </TextLink>
            </LearnMoreWrapper>
          </Stack>
          <Stack
            flex
            direction="column"
            spacing="tight"
            largeMobile={{ direction: "row", spacing: "natural", align: "center", wrap: true }}
          >
            <Stack inline grow={false} align="center" wrap>
              <Button
                type="primary"
                size="small"
                onClick={addBlueRibbonBag}
                iconLeft={<PlusCircle />}
                dataTest="BaggagePickerBRBRedesign-AddBlueRibbonBagButton"
              >
                <ButtonContentWrapper>
                  <Translate t="baggage_modal.blue_ribbon_bags.add_bag_protection" />
                </ButtonContentWrapper>
              </Button>
              <Text weight="bold" size="small">
                <LineHeightTextNormalWrapper>
                  <Price value={blueRibbonBagPrice.amount} />
                </LineHeightTextNormalWrapper>
              </Text>
            </Stack>
            <Text type="secondary" size="small">
              <Translate t="baggage_modal.blue_ribbon_bags.applies_all_bags_per_pax" />
            </Text>
          </Stack>
        </Stack>
      </AddSectionTransitionWrapper>
      <RemoveSectionTransitionWrapper visible={isBlueRibbonBagAdded}>
        <Stack flex align="center" wrap>
          <Badge type="success" icon={<CheckCircle />}>
            <Translate t="baggage_modal.blue_ribbon_bags.added" />
          </Badge>
          <TextLink
            type="secondary"
            size="small"
            onClick={removeBlueRibbonBag}
            dataTest="BaggagePickerBRBRedesign-RemoveBlueRibbonBagButton"
          >
            <LineHeightTextNormalWrapper>
              <Translate t="baggage_modal.blue_ribbon_bags.remove" />
            </LineHeightTextNormalWrapper>
          </TextLink>
        </Stack>
      </RemoveSectionTransitionWrapper>
    </Wrapper>
  );
};

export default AddBlueRibbonBags;
