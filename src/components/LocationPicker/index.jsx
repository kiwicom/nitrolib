// @flow strict
import * as React from "react";
import { graphql, QueryRenderer } from "react-relay";
import Alert from "@kiwicom/orbit-components/lib/Alert";
import InputField from "@kiwicom/orbit-components/lib/InputField";
import type { Environment } from "react-relay";

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
  environment: Environment,
|};

type State = {|
  active: boolean,
  input: string,
|};

class LocationPicker extends React.Component<Props, State> {
  static defaultProps = {
    environment: environmentReal,
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

  render() {
    const { value, label, icon, environment } = this.props;
    const { active, input } = this.state;

    const placeholder = value ? getPlaceholder(value) : "";

    return (
      <ClickOutside active={active} onClickOutside={this.handleClose}>
        <>
          <InputField
            inlineLabel
            label={label}
            placeholder={placeholder}
            onChange={this.handleChange}
            prefix={icon}
            value={active ? input : ""}
          />
          {input && active && (
            <QueryRenderer
              environment={environment}
              query={graphql`
                query LocationPickerQuery($input: String!) {
                  allLocations(last: 50, search: $input) {
                    ...LocationPickerResultList_list
                  }
                }
              `}
              variables={{ input }}
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

                if (!res.props.allLocations) {
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
                      list={res.props.allLocations}
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
