// @flow strict
import * as React from "react";
import { graphql, QueryRenderer } from "react-relay";
import Alert from "@kiwicom/orbit-components/lib/Alert";
import InputField from "@kiwicom/orbit-components/lib/InputField";

import environmentReal from "../../../services/environment";
import PickerDropDown from "../primitives/PickerDropDown";
import ClickOutside from "../../ClickOutside";
import Text from "../../Text";
import NoResult from "../primitives/NoResult";
import LocationPickerResultList from "./LocationPickerResultList";
import type { LocationPickerRow_item } from "./__generated__/LocationPickerRow_item.graphql";
import placeholderFunc from "../services/placeholder";

type Props = {|
  label: string,
  icon: React.Node,
  error: string,
  placeholder: string,
  environment: typeof environmentReal,
|};

type State = {|
  active: boolean,
  selectedIndex: number,
  placeholderChange: string,
  results: Array<LocationPickerRow_item>,
|};

class LocationPicker extends React.Component<Props, State> {
  static defaultProps = {
    environment: environmentReal,
  };

  state = {
    selectedIndex: 0,
    active: false,
    results: [],
    // eslint-disable-next-line react/destructuring-assignment
    placeholderChange: this.props.placeholder,
  };

  node: { current: any | HTMLDivElement } = React.createRef();

  handleClose = () => {
    this.setState({
      active: false,
    });
  };

  handleResultList = (arr: Array<LocationPickerRow_item>) => {
    this.setState({
      results: arr,
    });
  };

  handleSelect = (item: LocationPickerRow_item, index: number) => {
    const { type, country, code, name } = item;
    this.setState({
      active: false,
      placeholderChange: placeholderFunc({ type, country, code, name }),
      selectedIndex: index,
    });
  };

  handleChange = (ev: SyntheticInputEvent<HTMLInputElement>) => {
    const { value } = ev.target;

    this.setState({
      placeholderChange: value,
      active: true,
    });
  };

  handleSelectItem = (ev: SyntheticKeyboardEvent<EventTarget>) => {
    ev.preventDefault();
    const { selectedIndex, results } = this.state;
    const rowHeight = this.node.current?.children[0].clientHeight;

    const ARROW_UP = 38;
    const ARROW_DOWN = 40;
    const ESC = 27;
    const ENTER = 13;

    if (ev.keyCode === ENTER) {
      this.handleSelect(results[selectedIndex], selectedIndex);
    }

    if (ev.keyCode === ESC) {
      this.handleClose();
    }

    if (ev.keyCode === ARROW_UP) {
      if (selectedIndex > 0) {
        this.setState({ selectedIndex: selectedIndex - 1 });
        this.node.current.scrollTop -= rowHeight;
      }
    }

    if (ev.keyCode === ARROW_DOWN) {
      if (selectedIndex < results.length - 1) {
        this.setState({ selectedIndex: selectedIndex + 1 });
        this.node.current.scrollTop += rowHeight;
      }
    }
  };

  render() {
    const { label, icon, error, environment, placeholder } = this.props;
    const { active, selectedIndex, placeholderChange } = this.state;

    return (
      <ClickOutside active={active} onClickOutside={this.handleClose}>
        <>
          <InputField
            label={label}
            inlineLabel
            placeholder={placeholderChange || placeholder}
            onChange={this.handleChange}
            onKeyUp={this.handleSelectItem}
            prefix={icon}
            value={active ? placeholderChange : ""}
            error={error}
          />
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
                      handleResults={this.handleResultList}
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
