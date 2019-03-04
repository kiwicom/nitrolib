// @flow strict
import * as React from "react";
import type { Environment } from "react-relay";
import { graphql, QueryRenderer } from "react-relay";
import Alert from "@kiwicom/orbit-components/lib/Alert";
import InputField from "@kiwicom/orbit-components/lib/InputField";

import environmentReal from "../../services/environment";
import PickerDropDown from "./primitives/PickerDropDown";
import NoResult from "./primitives/NoResult";
import ClickOutside from "../ClickOutside";
import Text from "../Text";
import LocationPickerResultList from "./components/LocationPickerResultList";
import getPlaceholder from "./services/placeholder";
import type { Location } from "../../records/Location";

// FIXME add arrow handling somehow neatly
// const ARROW_UP = 38;
// const ARROW_DOWN = 40;
// const ESC = 27;
// const ENTER = 13;

// FIXME @viktr solve these:
// centralize styles with IataPicker

// FIXME @oreqizer solve these:
// arrow handling

type Props = {|
  value: Location | null,
  onChange: (loc: Location) => void,
  label: string,
  icon?: React.Node,
  // defaulted
  environment?: Environment,
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

const queries = { // TODO make query with IFs
  allLocations: graphql`
    query LocationPickerQuery($input: String!, $options: LocationsOptionsInput) {
      allLocations(last: 50, search: $input, options: $options) {
        ...LocationPickerResultList_list
      }
    }
  `,
  holidaysLocations: graphql`
    query LocationPickerHolidaysQuery($input: String!) {
      holidaysLocations(last: 50, search: $input) {
        ...LocationPickerResultList_list
      }
    }
  `,
};

class LocationPicker extends React.Component<Props, State> {
  static defaultProps = {
    environment: environmentReal,
    queryName: "allLocations",
    locationType: false,
  };

  state = {
    active: false,
    input: "",
  };

  node: { current: any | HTMLDivElement } = React.createRef();

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

  handleFocus = (ev: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({
      input: "",
      active: true,
    });
  };

  render() {
    const { value, label, icon, environment, queryName, locationType } = this.props;
    const { active, input } = this.state;

    const placeholder = value ? getPlaceholder(value) : "";
    const options = locationType ? { locationType } : {};
    const inputValue = active ? input : placeholder; // TODO Warning: A component is changing an uncontrolled input of type text to be controlled. Input elements should not switch from uncontrolled to controlled (or vice versa). Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://fb.me/react-controlled-components

    return (
      <ClickOutside active={active} onClickOutside={this.handleClose}>
        <>
          <InputField
            inlineLabel
            label={label}
            onFocus={this.handleFocus}
            onChange={this.handleChange}
            prefix={icon}
            value={inputValue}
          />
          {input && active && (
            <QueryRenderer
              environment={environment}
              query={queries[queryName]}
              variables={{ input, options }}
              render={res => {
                if (res.error) {
                  return (
                    <Alert type="critical">
                      <Text t="common.api_error" />
                    </Alert>
                  );
                }

                if (!res.props) {
                  return null;
                }

                if (!res.props[queryName]) {
                  // TODO render this in the list if length is 0
                  return (
                    <NoResult>
                      <Text t="forms.places_no_results" />
                    </NoResult>
                  );
                }

                return (
                  <PickerDropDown ref={this.node}>
                    <LocationPickerResultList
                      list={res.props[queryName]}
                      selectedId={value && value.id}
                      onSelect={this.handleSelect}
                    />
                  </PickerDropDown>
                );
              }}
            />
          )}
        </>
      </ClickOutside>
    );
  }
}

export default LocationPicker;
