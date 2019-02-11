// @flow strict
import * as React from "react";
import styled from "styled-components";
import Text from "@kiwicom/orbit-components/lib/Text";
import Button from "@kiwicom/orbit-components/lib/Button";
import InformationCircle from "@kiwicom/orbit-components/lib/icons/InformationCircle";
import ChevronDown from "@kiwicom/orbit-components/lib/icons/ChevronDown";
import Close from "@kiwicom/orbit-components/lib/icons/Close";
import Stack from "@kiwicom/orbit-components/lib/Stack";

import Translate from "../../../Translate/index";
import Tooltip from "../../../Tooltip/index";
import { themeDefault } from "../../../../records/Theme";
import type { ThemeProps } from "../../../../records/Theme";
import Flex from "../../../../primitives/Flex";
import Option from "../Option/index";
import type { OptionBaggage, BaggageCategory } from "../../../../records/Baggage";

type State = {
  showedItems: Array<OptionBaggage>,
  hiddenItems: number,
};

type Props = {|
  options: Array<OptionBaggage>,
  pickerType: BaggageCategory,
  onChange: (pickerType: BaggageCategory, index: number) => void,
  selectedIndex: number,
  context: "booking" | "mmb",
|};

const TooltipContent = styled.p`
  width: 240px;
  border-radius: 3px;
  box-shadow: 0 4px 12px 0 rgba(23, 27, 30, 0.3);
  line-height: 1.33;
  font-size: 12px;
  padding: 9px 11px;
`;

const EmptyOption = styled.div`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.orbit.spaceSmall};
  border-radius: ${({ theme }) => theme.orbit.borderRadiusNormal};
  border: 1px solid ${({ theme }: ThemeProps) => theme.orbit.borderColorCard};
  > * {
    margin-right: ${({ theme }: ThemeProps) => theme.orbit.spaceSmall};
  }
`;

EmptyOption.defaultProps = {
  theme: themeDefault,
};

const Title = styled.div`
  display: flex;
  align-items: center;
  height: 16px;
  > * {
    margin-right: ${({ theme }) => theme.orbit.spaceXXSmall};
  }
  span {
    display: flex;
    align-items: center;
  }
`;

Title.defaultProps = {
  theme: themeDefault,
};

class BaggagePicker extends React.Component<Props, State> {
  state = {
    showedItems: [],
    hiddenItems: 0,
  };

  componentDidMount() {
    const { options } = this.props;
    if (options.length > 4) {
      const showedOptionsItems = options.slice(0, 3);
      const hiddenOptionsItems = options.length - showedOptionsItems.length;
      this.setState({
        showedItems: showedOptionsItems,
        hiddenItems: hiddenOptionsItems,
      });
    } else {
      this.setState({ showedItems: options, hiddenItems: 0 });
    }
  }

  handleShowOptions = () => {
    const { options } = this.props;
    this.setState({ showedItems: options, hiddenItems: 0 });
  };

  getTitle = (type: string): React$Node =>
    type === "handBag" ? (
      <Translate t="common.baggage.cabin_baggage" />
    ) : (
      <Translate t="common.baggage.checked_baggage" />
    );

  getTooltip = (type: string): React$Node =>
    type === "handBag" ? (
      <Translate t="common.baggage.tooltip.cabin_baggage" />
    ) : (
      <Translate t="common.baggage.tooltip.checked_baggage" />
    );

  getEmptyOptionText = (type: string): React$Node =>
    type === "handBag" ? (
      <Translate t="common.baggage.cabin_baggage_not_available" />
    ) : (
      <Translate t="common.baggage.checked_baggage_not_available" />
    );

  render() {
    const { context, pickerType, options, selectedIndex, onChange } = this.props;
    const { showedItems, hiddenItems } = this.state;

    return (
      <Stack spacing="condensed" spaceAfter="largest">
        <Title>
          <Text weight="bold" uppercase element="p">
            {this.getTitle(pickerType)}
          </Text>
          <Tooltip
            tip={<TooltipContent>{this.getTooltip(pickerType)}</TooltipContent>}
            position="right"
            inline
          >
            <InformationCircle size="small" color="secondary" />
          </Tooltip>
        </Title>
        {options.length > 0 && (
          <Text>
            {context === "booking" ? (
              <Translate t="common.baggage.select_option" />
            ) : (
              <Translate t="common.baggage.switch_option" />
            )}
            :
          </Text>
        )}
        {options.length > 0 ? (
          showedItems.map(item => (
            <Option
              key={item.originalIndex}
              items={item.items}
              price={item.price}
              isChecked={item.originalIndex === selectedIndex}
              onClick={() => onChange(pickerType, item.originalIndex)}
            />
          ))
        ) : (
          <EmptyOption>
            <Close size="medium" color="critical" />
            <Text>{this.getEmptyOptionText(pickerType)}</Text>
          </EmptyOption>
        )}
        {hiddenItems > 0 && (
          <Flex x="center">
            <Button
              onClick={this.handleShowOptions}
              size="small"
              type="secondary"
              icon={<ChevronDown />}
            >
              <Translate t="common.baggage.show_more" values={{ number: hiddenItems }} />
            </Button>
          </Flex>
        )}
      </Stack>
    );
  }
}

export default BaggagePicker;
