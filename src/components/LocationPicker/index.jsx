// @flow strict
import * as React from "react";
import styled from "styled-components";
import InputField from "@kiwicom/orbit-components/lib/InputField";

import ClickOutside from "../ClickOutside";
import getPlaceholder from "./services/placeholder";
import type { Location } from "../../records/Location";
import LocationPickerPopup from "./components/LocationPickerPopup";
import { themeDefault } from "../../records/Theme";
import LocationPickerQuery from "./components/LocationPickerQuery";

const Spacer = styled.div`
  padding-bottom: ${({ theme }) => theme.orbit.spaceSmall};
`;

Spacer.defaultProps = {
  theme: themeDefault,
};

type Props = {|
  value: Location | null,
  onChange: (loc: Location) => void,
  label: React.Node,
  error?: React.Node,
  queryName?: "allLocations" | "holidaysLocations",
  locationType?:
    | "airport"
    | "autonomous_territory"
    | "city"
    | "country"
    | "station"
    | "subdivision",
|};

type State = {|
  active: boolean,
  input: string,
|};

class LocationPicker extends React.Component<Props, State> {
  static defaultProps = {
    queryName: "allLocations",
    locationType: false,
  };

  state = {
    active: false,
    input: "",
  };

  handleClose = () => {
    this.setState({
      active: false,
    });
  };

  handleSelect = (item: Location) => {
    const { onChange } = this.props;

    onChange(item);
    this.setState({
      active: false,
    });
  };

  handleChange = (ev: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({
      input: ev.target.value,
      active: true,
    });
  };

  handleFocus = () => {
    this.setState({
      input: "",
      active: true,
    });
  };

  render() {
    const { value, label, queryName, locationType, error } = this.props;
    const { active, input } = this.state;

    const placeholder = value ? getPlaceholder(value) : "";
    const options = locationType ? { locationType } : {};
    const inputValue = active ? input : placeholder; // TODO Warning: A component is changing an uncontrolled input of type text to be controlled. Input elements should not switch from uncontrolled to controlled (or vice versa). Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://fb.me/react-controlled-components

    return (
      <LocationPickerPopup active={active}>
        <ClickOutside active={active} onClickOutside={this.handleClose}>
          <>
            <InputField
              prefix={label}
              onFocus={this.handleFocus}
              onChange={this.handleChange}
              value={inputValue}
              error={error}
            />
            {active && input.trim().length !== 0 && (
              <>
                <Spacer />
                <LocationPickerQuery
                  {...{ input, value, options, queryName }}
                  onSelect={this.handleSelect}
                />
              </>
            )}
          </>
        </ClickOutside>
      </LocationPickerPopup>
    );
  }
}

export default LocationPicker;
