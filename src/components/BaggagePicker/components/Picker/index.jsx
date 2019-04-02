// @flow strict
import * as React from "react";
import R from "ramda";
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
import type { OptionBaggage, BaggageCategory } from "../../../../records/Baggage.js.flow";

type State = {
  showedOptions: Array<OptionBaggage>,
  hiddenOptions: number,
};

type Props = {|
  options: Array<OptionBaggage>,
  pickerType: BaggageCategory,
  onChange: (pickerType: BaggageCategory, index: number) => void,
  selectedIndex: number,
  context: "booking" | "mmb",
  currentCombination?: number,
|};

const EmptyOption = styled.div.attrs({
  "data-test": "BaggagePicker-EmptyOption",
})`
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
    showedOptions: [],
    hiddenOptions: 0,
  };

  componentDidMount() {
    this.handleDefaultStateValues(this.props);
  }

  componentDidUpdate(prevProps: Props) {
    // eslint-disable-next-line
    if (!R.equals(this.props.options, prevProps.options)) {
      this.handleDefaultStateValues(this.props);
    }
  }

  handleDefaultStateValues = ({ options }: Props) => {
    if (options.length > 4) {
      const showedOptionsItems = options.slice(0, 3);
      const hiddenOptionsItems = options.length - showedOptionsItems.length;
      this.setState({
        showedOptions: showedOptionsItems,
        hiddenOptions: hiddenOptionsItems,
      });
    } else {
      this.setState({ showedOptions: options, hiddenOptions: 0 });
    }
  };

  handleShowOptions = () => {
    const { options } = this.props;
    this.setState({ showedOptions: options, hiddenOptions: 0 });
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

  // get info about presence of personal item in all options
  // to validate if "no personal item" should be showed
  getPersonalItemPresence = (): boolean => {
    const { pickerType, options } = this.props;
    if (pickerType === "holdBag") return false;
    return options
      .reduce((acc, option) => {
        const items = R.values(option.items).map(item => item.category);
        return [...acc, ...items];
      }, [])
      .some(i => i === "personalItem");
  };

  render() {
    const {
      context,
      pickerType,
      options,
      selectedIndex,
      currentCombination,
      onChange,
    } = this.props;
    const hasOnlyEmptyOption = options.length === 1 && R.isEmpty(options[0].items);
    const { showedOptions, hiddenOptions } = this.state;

    return (
      <Stack spacing="condensed" spaceAfter="largest" dataTest={`BaggagePicker-${pickerType}`}>
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
        {options.length > 0 && !hasOnlyEmptyOption ? (
          showedOptions.map((item, index) => (
            <Option
              key={item.originalIndex}
              dataTest={`BaggagePicker-Option-${index}`}
              pickerType={pickerType}
              items={item.items}
              price={item.price}
              isChecked={item.originalIndex === selectedIndex}
              isCurrentCombination={item.originalIndex === currentCombination}
              onClick={() => onChange(pickerType, item.originalIndex)}
              isPersonalItemPresent={this.getPersonalItemPresence()}
            />
          ))
        ) : (
          <EmptyOption>
            <Close size="medium" color="critical" />
            <Text>{this.getEmptyOptionText(pickerType)}</Text>
          </EmptyOption>
        )}
        {hiddenOptions > 0 && (
          <Flex x="center">
            <Button
              dataTest="BaggagePicker-ShowButton"
              onClick={this.handleShowOptions}
              size="small"
              type="secondary"
              icon={<ChevronDown />}
            >
              <Translate t="baggage_modal.select.show_more" values={{ number: hiddenOptions }} />
            </Button>
          </Flex>
        )}
      </Stack>
    );
  }
}

export default BaggagePicker;
