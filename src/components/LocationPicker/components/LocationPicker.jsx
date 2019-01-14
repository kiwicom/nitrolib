// @flow strict
import * as React from "react";
import { graphql, QueryRenderer } from "react-relay";
import Alert from "@kiwicom/orbit-components/lib/Alert";

import environmentReal from "../../../services/environment";
import LocationPickerInput from "./LocationPickerInput";
import PickerDropDown from "../primitives/PickerDropDown";
import ClickOutside from "../../ClickOutside";
import Text from "../../Text";
import NoResult from "../primitives/NoResult";
import LocationPickerResultList from "./LocationPickerResultList";
import type { LocationPickerRow_item } from "./__generated__/LocationPickerRow_item.graphql";

type Props = {|
  label: string,
  icon?: React.Node,
  error: string,
  placeholder: string,
  environment: typeof environmentReal,
|};

export type Arg = {|
  name: string,
  code: string,
  type: string,
  country: {
    name: string,
    code: string,
  },
|};

type State = {|
  active: boolean,
  selectedIndex: number,
  placeholderChange: string,
  dropdownLength: number,
|};

class LocationPicker extends React.Component<Props, State> {
  static defaultProps = {
    environment: environmentReal,
  };

  state = {
    selectedIndex: 0,
    active: false,
    // eslint-disable-next-line react/destructuring-assignment
    placeholderChange: this.props.placeholder,
    dropdownLength: 0,
  };

  node: { current: any | HTMLDivElement } = React.createRef();

  onClickOutside = () => {
    this.setState({
      active: false,
    });
  };

  handleSelect = (item: LocationPickerRow_item, index: number) => {
    const { type, country, code, name } = item;
    const countryName = type === "city" && country && country.name ? ` (${country.name}) ` : "";
    const airportCode = type === "airport" && code ? ` (${code}) ` : "";

    this.setState({
      active: false,
      placeholderChange: String(name) + countryName + airportCode,
      selectedIndex: index,
    });
  };

  handleLength = (length: number) => {
    this.setState({
      dropdownLength: length,
    });
  };

  changeItemIndex = (index: number, down?: boolean) => {
    const rowHeight = this.node.current?.children[0].clientHeight;

    if (down) {
      this.node.current.scrollTop += rowHeight;
    } else {
      this.node.current.scrollTop -= rowHeight;
    }

    this.setState({ selectedIndex: index });
  };

  handleChange = (ev: SyntheticInputEvent<HTMLInputElement>) => {
    const { value } = ev.target;
    this.setState({
      placeholderChange: value,
      active: true,
    });
  };

  render() {
    const { label, icon, error, environment, placeholder } = this.props;
    const { active, selectedIndex, placeholderChange, dropdownLength } = this.state;

    return (
      <ClickOutside active={active} onClickOutside={this.onClickOutside}>
        <LocationPickerInput
          placeholder={placeholderChange || placeholder}
          label={label}
          changeItemIndex={this.changeItemIndex}
          selectedIndex={selectedIndex}
          onChange={this.handleChange}
          icon={icon}
          dropdownLength={dropdownLength}
          error={error}
          value={active ? placeholderChange : ""}
        >
          {placeholderChange && active && (
            <QueryRenderer
              environment={environment}
              query={graphql`
                query LocationPickerQuery($input: String!) {
                  allLocations(last: 50, search: $input) {
                    ...LocationPickerResultList_list
                  }
                }
              `}
              variables={{ input: placeholderChange }}
              render={res => {
                if (res.error) {
                  return (
                    <Alert type="critical">
                      <Text t="common.api_error" />
                    </Alert>
                  );
                }

                if (!res.props || !res.props.allLocations) {
                  return (
                    <NoResult>
                      <Text t="forms.places_no_results" />
                    </NoResult>
                  );
                }

                return (
                  <PickerDropDown ref={this.node}>
                    <LocationPickerResultList
                      list={res.props.allLocations}
                      handleSelect={this.handleSelect}
                      selectedIndex={selectedIndex}
                      handleLength={this.handleLength}
                    />
                  </PickerDropDown>
                );
              }}
            />
          )}
        </LocationPickerInput>
      </ClickOutside>
    );
  }
}

export default LocationPicker;
