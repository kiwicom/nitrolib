import * as React from "react";
import InputField from "@kiwicom/orbit-components/lib/InputField";
import { spaceAfter as SpaceAfter } from "@kiwicom/orbit-components/lib/common/getSpacingToken";
import { Translation } from "@kiwicom/orbit-components/lib/common/common.js.flow";

import Translate from "../Translate";
import { phone, required } from "../../services/input/validators";
import compose from "../../services/input/composeValidator";

const validator = compose(
  phone,
  required,
);

type Props = {
  ...SpaceAfter,
  size?: "small" | "normal",
  name?: string,
  label?: Translation,
  inlineLabel?: boolean,
  value: string,
  placeholder?: Translation,
  help?: React.ReactNode,
  prefix?: React.ReactNode,
  suffix?: React.ReactNode,
  tabIndex?: string,
  id?: string,
  onChange: ({ error: string, value: string }) => void,
  onFocus?: (ev: SyntheticInputEvent<HTMLInputElement>) => void | Promise<any>,
  onBlur?: (ev: SyntheticInputEvent<HTMLInputElement>) => void | Promise<any>,
  onKeyDown?: (ev: SyntheticKeyboardEvent<HTMLInputElement>) => void | Promise<any>,
  onKeyUp?: (ev: SyntheticKeyboardEvent<HTMLInputElement>) => void | Promise<any>,
};

const InputPhone = ({ onChange, ...props }: Props) => {
  const [state, setState] = React.useState({ error:  });

  const handleChange = (ev: SyntheticInputEvent<HTMLInputElement>) => {
    const { value } = ev.target;
    const error = validator(value);

    setState({ error });

    onChange({ value, error });
  };
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
  } = props;
  return (
    <InputField
      id={id}
      type="text"
      required
      name={name}
      size={size}
      error={<Translate t={state.error} />}
      onBlur={onBlur}
      tabIndex={tabIndex}
      onFocus={onFocus}
      onChange={handleChange}
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
};

export default InputPhone;
