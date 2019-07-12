// @flow strict
import * as React from "react";
import InputField from "@kiwicom/orbit-components/lib/InputField";
import type { spaceAfter as SpaceAfter } from "@kiwicom/orbit-components/lib/common/getSpacingToken";
import type { Translation } from "@kiwicom/orbit-components/lib/common/common.js.flow";

import { phone, required } from "../../services/input/validators";
import compose from "../../services/input/composeValidator";

const validator = compose(
  phone,
  required,
);

type Props = {|
  ...SpaceAfter,
  size?: "small" | "normal",
  name?: string,
  label?: Translation,
  inlineLabel?: boolean,
  value: string,
  placeholder?: Translation,
  help?: React.Node,
  prefix?: React.Node,
  suffix?: React.Node,
  tabIndex?: string,
  id?: string,
  onChange: ({ error: string, value: string }) => void,
  onFocus?: (ev: SyntheticInputEvent<HTMLInputElement>) => void | Promise<any>,
  onBlur?: (ev: SyntheticInputEvent<HTMLInputElement>) => void | Promise<any>,
  onKeyDown?: (ev: SyntheticKeyboardEvent<HTMLInputElement>) => void | Promise<any>,
  onKeyUp?: (ev: SyntheticKeyboardEvent<HTMLInputElement>) => void | Promise<any>,
|};

type State = {|
  error: string,
|};

class InputPhone extends React.Component<Props, State> {
  state = {
    error: "",
  };

  handleChange = (ev: SyntheticInputEvent<HTMLInputElement>) => {
    const { value } = ev.target;
    const error = validator(value);

    const { onChange } = this.props;

    this.setState({ error: validator(value) });

    onChange({ value, error });
  };

  render() {
    const {
      onBlur,
      onFocus,
      onKeyDown,
      name,
      onKeyUp,
      placeholder,
      prefix,
      suffix,
      help,
      spaceAfter,
      tabIndex,
      size,
      value,
      id,
      inlineLabel,
      label,
    } = this.props;
    const { error } = this.state;
    return (
      <InputField
        id={id}
        type="text"
        required
        name={name}
        size={size}
        error={error}
        onBlur={onBlur}
        tabIndex={tabIndex}
        onFocus={onFocus}
        onChange={this.handleChange}
        onKeyDown={onKeyDown}
        help={help}
        onKeyUp={onKeyUp}
        prefix={prefix}
        suffix={suffix}
        placeholder={placeholder}
        spaceAfter={spaceAfter}
        value={value}
        label={label}
        inlineLabel={inlineLabel}
      />
    );
  }
}

export default InputPhone;
