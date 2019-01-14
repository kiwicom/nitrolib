// @flow
import * as React from "react";
import styled from "styled-components";
import Text from "@kiwicom/orbit-components/lib/Text";
import Button from "@kiwicom/orbit-components/lib/Button";
import InformationCircle from "@kiwicom/orbit-components/lib/icons/InformationCircle";
import ChevronDown from "@kiwicom/orbit-components/lib/icons/ChevronDown";
import ChevronUp from "@kiwicom/orbit-components/lib/icons/ChevronUp";
import Stack from "@kiwicom/orbit-components/lib/Stack";

import Translate from "../Translate";
import Tooltip from "../Tooltip";
import Flex from "../../primitives/Flex";
import type { OptionBaggage } from "../../records/Baggage";
import Options from "./BaggageOptions";

type State = {
  showedItems: Array<OptionBaggage>,
  hiddenItems: number,
};

type Props = {|
  options: Array<OptionBaggage>,
  tooltip: React$Node,
  title: React$Node,
  onChange: (bagType: string, index: number) => void,
  selectedIndex: number,
  shouldShowRecheckNote: boolean,
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
      const hiddenOptionsNumber = options.length - slicedOptionKeys.length;
      this.setState({
        showedItems: slicedOptionKeys,
        hiddenItems: hiddenOptionsNumber,
      });
    } else {
      this.setState({ showedItems: options, hiddenItems: 0 });
    }
  };

  render() {
    const {
      title,
      context,
      tooltip,
      options,
      selectedIndex,
      onChange,
      shouldShowRecheckNote,
    } = this.props;
    const { showedItems, hiddenItems } = this.state;

    return (
      <Stack spacing="condensed" spaceAfter="largest">
        <Stack align="center" spacing="tight">
          <Text weight="bold" uppercase element="span">
            {title}
          </Text>
          <div>
            <Tooltip tip={<TooltipContent>{tooltip}</TooltipContent>} position="right">
              <InformationCircle size="small" color="secondary" />
            </Tooltip>
          </div>
        </Stack>

        <Text>
          {context === "booking" ? (
            <Translate t="common.baggage.select_option" />
          ) : (
            <Translate t="common.baggage.switch_option" />
          )}
        </Text>
        {showedItems.map(item => (
          <Options
            key={item.originalIndex}
            items={item.items}
            price={item.price}
            isChecked={item.originalIndex === selectedIndex}
            onClick={() => onChange(item.bagType, item.originalIndex)}
            shouldShowRecheckNote={shouldShowRecheckNote}
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
              {hiddenItems > 0 ? (
                <Translate t="common.baggage.show_more" values={{ number: hiddenItems }} />
              ) : (
                <Translate t="common.baggage.hide" />
              )}
            </Button>
          </Flex>
        )}
      </Stack>
    );
  }
}

export default BaggagePicker;
