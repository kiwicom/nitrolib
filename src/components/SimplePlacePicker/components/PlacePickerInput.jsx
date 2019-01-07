// @flow strict
import * as React from "react";
import InputField from "@kiwicom/orbit-components/lib/InputField";

type Props = {|
  placeholder: string,
  label?: string,
  onChange: (ev: SyntheticInputEvent<HTMLInputElement>) => void,
  onFocus: () => void,
  icon?: React.Node,
  onBlur?: () => void,
  changeItemIndex: (arg: number) => void,
  onFocus?: () => void,
  error: string,
  resultsLast: number,
  value: string,
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
    const { selectedIndex, changeItemIndex, resultsLast } = this.props;
    if (selectedIndex < resultsLast) {
      changeItemIndex(selectedIndex + 1);
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
    const {
      placeholder,
      label,
      icon,
      value,
      error,
      onFocus,
      onBlur,
      onChange,
      children,
    } = this.props;
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
          onFocus={onFocus}
          onBlur={onBlur}
        />
        {children}
      </>
    );
  }
}

export default PlacePickerInput;
