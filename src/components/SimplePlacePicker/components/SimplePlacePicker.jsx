// @flow strict
import * as React from "react";

import type { LocationItem } from "../records/LocationItem";
import getLocations from "../service/api";
import PlacePicker from "./PlacePickerInput";
import PickerDropDown from "../primitives/PickerDropDown";
import ClickOutside from "../../ClickOutside";
import SimplePlacePickerRow from "./SimplePlacePickerRow";
import Text from "../../Text";
import NoResult from "../primitives/NoResult";

type Props = {|
  locale: string,
  label: string,
  icon?: React.Node,
  onBlur?: () => void,
  onFocus?: () => void,
  error: string,
  value: string,
|};

type State = {|
  result: Array<LocationItem>,
  placeholder: string,
  active: boolean,
  selectedIndex: number,
|};

class SimplePlacePicker extends React.Component<Props, State> {
  state = {
    result: [],
    placeholder: "",
    selectedIndex: 0,
    active: false,
  };

  node: { current: any | HTMLDivElement } = React.createRef();

  onClickOutside = () => {
    this.setState({
      active: false,
    });
  };

  async getLocationsData(value: string) {
    const { locale } = this.props;
    const params = {
      limit: 50,
      locale,
      term: value,
    };

    const response = await getLocations(params);
    const { locations } = response;
    this.setState({
      result: locations,
      active: true,
    });
  }

  handleSelect = (index: number) => {
    const { result } = this.state;
    if (result.length > 0) {
      this.setState({
        active: true,
        placeholder: result[index].code,
      });
    }
  };

  changeItemIndex = (index: number) => {
    const childrenHeight = this.node.current?.children[0].clientHeight;
    this.node.current.scrollTop += childrenHeight;

    this.setState({ selectedIndex: index });
  };

  handleChange = (ev: SyntheticInputEvent<HTMLInputElement>) => {
    const { value } = ev.target;
    this.getLocationsData(value);
  };

  render() {
    const { label, icon, onBlur, error, value, onFocus } = this.props;
    const { placeholder, result, active, selectedIndex } = this.state;
    const resultsLast = result.length - 1;

    const results: React$Node = result.map((location, index) => {
      const { country, name, type, code, id } = location;
      return (
        <SimplePlacePickerRow
          onClick={() => this.handleSelect(index)}
          type={type}
          name={name}
          country={country && country.name}
          cityCode={code}
          selected={selectedIndex === index}
          countryCode={id}
        />
      );
    });

    return (
      <ClickOutside active={active} onClickOutside={this.onClickOutside}>
        <PlacePicker
          placeholder={placeholder}
          label={label}
          onFocus={onFocus}
          changeItemIndex={this.changeItemIndex}
          selectedIndex={selectedIndex}
          onChange={this.handleChange}
          icon={icon}
          resultsLast={resultsLast}
          onBlur={onBlur}
          error={error}
          value={active ? value : " "}
        >
          <PickerDropDown ref={this.node}>
            {/* TODO: temporary decision, will be change by Popover from Orbit */}
            {result.length > 0
              ? results
              : active && (
                  <NoResult>
                    <Text t="forms.places_no_results" />
                  </NoResult>
                )}
          </PickerDropDown>
        </PlacePicker>
      </ClickOutside>
    );
  }
}

export default SimplePlacePicker;
