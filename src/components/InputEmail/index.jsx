// @flow strict
import * as React from "react";
import InputField from "@kiwicom/orbit-components/lib/InputField";
import type { spaceAfter as SpaceAfter } from "@kiwicom/orbit-components/lib/common/getSpacingToken";
import type { Translation } from "@kiwicom/orbit-components/lib/common/common.js.flow";

import { email, required } from "../../services/input/validators";
import compose from "../../services/input/composeValidator";
import emailCorrector from "../../services/input/emailCorrector";

const validator = compose(
  email,
  required,
);

type Props = {|
  ...SpaceAfter,
  size?: "small" | "normal",
  name?: string,
  label?: Translation,
  inlineLabel?: boolean,
  value?: (() => string | number) | string | number,
  placeholder?: Translation,
  prefix?: React$Node,
  suffix?: React$Node,
  tabIndex?: string,
  id?: string,
  autoComplete?: string,
  onChange?: (ev: SyntheticInputEvent<HTMLInputElement>) => void | Promise<any>,
  onFocus?: (ev: SyntheticInputEvent<HTMLInputElement>) => void | Promise<any>,
  onBlur?: (ev: SyntheticInputEvent<HTMLInputElement>) => void | Promise<any>,
  onKeyDown?: (ev: SyntheticKeyboardEvent<HTMLInputElement>) => void | Promise<any>,
  onKeyUp?: (ev: SyntheticKeyboardEvent<HTMLInputElement>) => void | Promise<any>,
|};

const InputEmail = (props: Props) => {
  const {
    onBlur,
    onFocus,
    onChange,
    onKeyDown,
    name,
    onKeyUp,
    placeholder,
    prefix,
    suffix,
    autoComplete,
    spaceAfter,
    tabIndex,
    size,
    value,
    id,
    inlineLabel,
    label,
  } = props;

  return (
    <InputField
      id={id}
      type="email"
      required
      name={name}
      size={size}
      error={validator(value)}
      onBlur={onBlur}
      tabIndex={tabIndex}
      onFocus={onFocus}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      prefix={prefix}
      suffix={suffix}
      placeholder={placeholder}
      spaceAfter={spaceAfter}
      autoComplete={autoComplete}
      help={emailCorrector(String(value))}
      value={value}
      label={label}
      inlineLabel={inlineLabel}
    />
  );
};

export default InputEmail;
