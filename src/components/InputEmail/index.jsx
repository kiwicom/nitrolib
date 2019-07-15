// @flow strict
import * as React from "react";
import InputField from "@kiwicom/orbit-components/lib/InputField";
import type { spaceAfter as SpaceAfter } from "@kiwicom/orbit-components/lib/common/getSpacingToken";
import type { Translation } from "@kiwicom/orbit-components/lib/common/common.js.flow";

import { email as normalize } from "../../services/input/normalizers";
import { email, required } from "../../services/input/validators";
import compose from "../../services/input/composeValidator";
import corrector from "../../services/input/emailCorrector";

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
  value: string,
  placeholder?: Translation,
  prefix?: React.Node,
  suffix?: React.Node,
  tabIndex?: string,
  id?: string,
  autoComplete?: string,
  onChange: ({ value: string, error: string }) => void,
  onFocus?: (ev: SyntheticInputEvent<HTMLInputElement>) => void | Promise<any>,
  onBlur?: (ev: SyntheticInputEvent<HTMLInputElement>) => void | Promise<any>,
|};

const InputEmail = ({ onChange, ...props }: Props) => {
  const [state, setState] = React.useState({ error: "", help: "" });

  const handleChange = (ev: SyntheticInputEvent<HTMLInputElement>) => {
    const value = normalize(ev.target.value);
    const help = corrector(value);
    const error = validator(value);

    setState({ error, help });

    onChange({ value, error });
  };

  const {
    onBlur,
    onFocus,
    name,
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
      error={state.error}
      onBlur={onBlur}
      tabIndex={tabIndex}
      onFocus={onFocus}
      onChange={handleChange}
      prefix={prefix}
      suffix={suffix}
      placeholder={placeholder}
      spaceAfter={spaceAfter}
      autoComplete={autoComplete}
      help={state.help}
      value={value}
      label={label}
      inlineLabel={inlineLabel}
    />
  );
};

export default InputEmail;
