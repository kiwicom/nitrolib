// @flow strict
import * as React from "react";
import styled from "styled-components";
import Text from "@kiwicom/orbit-components/lib/Text";
import Button from "@kiwicom/orbit-components/lib/Button";
import InformationCircle from "@kiwicom/orbit-components/lib/icons/InformationCircle";
import ChevronDown from "@kiwicom/orbit-components/lib/icons/ChevronDown";
import Close from "@kiwicom/orbit-components/lib/icons/Close";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import Tooltip from "@kiwicom/orbit-components/lib/Tooltip";

import Translate from "../../../Translate/index";
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
  currentCombination?: number,
|};

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
    this.handleDefaultStateValues(this.props);
  }

  componentDidUpdate(prevProps: Props) {
    // eslint-disable-next-line
    if (this.props.options.length !== prevProps.options.length) {
      this.handleDefaultStateValues(this.props);
    }
  }

  handleDefaultStateValues = (props: Props) => {
    const { options } = props;
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
  };

  handleShowOptions = () => {
    const { options } = this.props;
    this.setState({ showedItems: options, hiddenItems: 0 });
  };

  getTitle = (type: string): React$Node =>
    type === "handBag" ? (
      <Translate t="baggage_modal.subheader.cabin_baggage" />
    ) : (
      <Translate t="baggage_modal.subheader.checked_baggage" />
    );

  getTooltip = (type: string): React$Node =>
    type === "handBag" ? (
      <Translate t="baggage_modal.tooltip.cabin_baggage" />
    ) : (
      <Translate t="baggage_modal.tooltip.checked_baggage" />
    );

  getEmptyOptionText = (type: string): React$Node =>
    type === "handBag" ? (
      <Translate t="baggage_modal.error.cabin_baggage_not_available" />
    ) : (
      <Translate t="baggage_modal.error.checked_baggage_not_available" />
    );

  handleOptionClick = (pickerType: BaggageCategory, originalIndex: number) =>
    this.props.onChange(pickerType, originalIndex); // eslint-disable-line

  // get info about presence of personal item in all options
  // to validate if "no personal item" should be showed
  getPersonalItemPresence = (): boolean => {
    const { pickerType, options } = this.props;
    if (pickerType === "holdBag") return false;
    return options
      .reduce((acc, option) => {
        const items = Object.keys(option.items).map(key => option.items[key].category);
        return [...acc, ...items];
      }, [])
      .some(i => i === "personalItem");
  };

  render() {
    const { context, pickerType, options, selectedIndex, currentCombination } = this.props;
    const { showedItems, hiddenItems } = this.state;
    const isPersonalItemPresent = this.getPersonalItemPresence();

    return (
      <Stack spacing="condensed" spaceAfter="largest">
        <Title>
          <Text weight="bold" uppercase element="p">
            {this.getTitle(pickerType)}
          </Text>
          <Tooltip content={this.getTooltip(pickerType)} preferredPosition="right" size="small">
            <InformationCircle size="small" color="secondary" />
          </Tooltip>
        </Title>
        {options.length > 0 && (
          <Text>
            {context === "booking" ? (
              <Translate t="baggage_modal.subheader.select_option" />
            ) : (
              <Translate t="baggage_modal.subheader.switch_option" />
            )}
            :
          </Text>
        )}
        {options.length > 0 ? (
          showedItems.map(item => (
            <Option
              key={item.originalIndex}
              pickerType={pickerType}
              items={item.items}
              price={item.price}
              isChecked={item.originalIndex === selectedIndex}
              isCurrentCombination={item.originalIndex === currentCombination}
              onClick={() => this.handleOptionClick(pickerType, item.originalIndex)}
              isPersonalItemPresent={isPersonalItemPresent}
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
              <Translate t="baggage_modal.select.show_more" values={{ number: hiddenItems }} />
            </Button>
          </Flex>
        )}
      </Stack>
    );
  }
}

export default BaggagePicker;
