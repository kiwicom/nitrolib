// @flow
import * as React from "react";
import Text from "@kiwicom/orbit-components/lib/Text";
import Button from "@kiwicom/orbit-components/lib/Button";
import InformationCircle from "@kiwicom/orbit-components/lib/icons/InformationCircle";
import ChevronDown from "@kiwicom/orbit-components/lib/icons/ChevronDown";
import ChevronUp from "@kiwicom/orbit-components/lib/icons/ChevronUp";
import Stack from "@kiwicom/orbit-components/lib/Stack";

import Flex from "../../primitives/Flex";
import type { OptionBaggage } from "../../records/Baggage";
import Options from "./BaggeOptions";

type State = {
  showedItems: Array<OptionBaggage>,
  hiddenItems: number,
};

type Props = {|
  options: Array<OptionBaggage>,
  title: string,
  onChange: (bagtype: string, index: number) => void,
  selectedIndex: string,
|};

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

  handleToggleOptions = () => {
    const { options } = this.props;
    const { showedItems } = this.state;
    if (showedItems.length === options.length) {
      const slicedOptionKeys = options.slice(0, 3);
      const getHiddens = options.length - slicedOptionKeys.length;
      this.setState({
        showedItems: slicedOptionKeys,
        hiddenItems: getHiddens,
      });
    } else {
      this.setState({ showedItems: options, hiddenItems: 0 });
    }
  };

  render() {
    const { title, options, selectedIndex, onChange } = this.props;
    const { showedItems, hiddenItems } = this.state;

    return (
      <Stack spacing="condensed">
        <Stack align="center" spacing="tight">
          <Text weight="bold" uppercase>
            {title}
          </Text>
          <InformationCircle size="small" color="secondary" />
        </Stack>
        <Text>Select one option:</Text>
        {showedItems.map(item => (
          <Options
            key={item.originalIndex}
            items={item.items}
            price={item.price}
            isChecked={item.originalIndex === selectedIndex}
            onClick={() => onChange(item.bagType, item.originalIndex)}
          />
        ))}
        {options.length > 4 && (
          <Flex x="center">
            <Button
              onClick={this.handleToggleOptions}
              size="small"
              type="secondary"
              iconRight={hiddenItems > 0 ? <ChevronDown /> : <ChevronUp />}
            >
              {hiddenItems > 0 ? `Show ${hiddenItems} more bundles` : "Hide"}
            </Button>
          </Flex>
        )}
      </Stack>
    );
  }
}

export default BaggagePicker;
