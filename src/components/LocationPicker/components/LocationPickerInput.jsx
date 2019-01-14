// @flow strict
import * as React from "react";
import InputField from "@kiwicom/orbit-components/lib/InputField";

type Props = {|
  placeholder: string,
  label?: string,
  onChange: (ev: SyntheticInputEvent<HTMLInputElement>) => void,
  icon?: React.Node,
  changeItemIndex: (index: number, down?: boolean) => void,
  error: string,
  value: string,
  dropdownLength: number,
  selectedIndex: number,
  children: React.Node,
|};

class PlacePickerInput extends React.Component<Props> {
  selectUp = () => {
    const { selectedIndex, changeItemIndex } = this.props;
    if (selectedIndex > 0) {
      changeItemIndex(selectedIndex - 1);
    }
  };

  selectDown = () => {
    const { selectedIndex, changeItemIndex, dropdownLength } = this.props;
    if (selectedIndex < dropdownLength - 1) {
      changeItemIndex(selectedIndex + 1, true);
    }
  };

  handleSelectItem = (ev: SyntheticKeyboardEvent<EventTarget>) => {
    ev.preventDefault();

    if (ev.keyCode === 38) {
      this.selectUp();
    }

    if (ev.keyCode === 40) {
      this.selectDown();
    }
  };

  render() {
    const { placeholder, label, icon, value, error, onChange, children } = this.props;
    return (
      <>
        <InputField
          label={label}
          inlineLabel
          placeholder={placeholder}
          onChange={onChange}
          onKeyUp={this.handleSelectItem}
          prefix={icon}
          value={value}
          error={error}
        />
        {children}
      </>
    );
  }
}

export default PlacePickerInput;
