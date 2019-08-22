// @flow strict
import * as React from "react";
import InputField from "@kiwicom/orbit-components/lib/InputField";
import type { spaceAfter as SpaceAfter } from "@kiwicom/orbit-components/lib/common/getSpacingToken";
import type { Translation } from "@kiwicom/orbit-components/lib/common/common.js.flow";
import InputGroup from "@kiwicom/orbit-components/lib/InputGroup";
import Select from "@kiwicom/orbit-components/lib/Select";

import getCallingCodes from "./services/getCallingCodes";
import { useFetched } from "../../services/fetched/context";
import { useIntl } from "../../services/intl/context";
import Translate from "../Translate";
import { validate } from "../../services/input/phoneValidator";
import { phone as normalizer } from "../../services/input/normalizers";

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
  maxLength?: number,
  minLength?: number,
  onChange: ({ error: string, value: string, code?: string }) => void,
  error: string,
  onFocus?: (ev: SyntheticInputEvent<HTMLInputElement>) => void | Promise<any>,
  onBlur?: (ev: SyntheticInputEvent<HTMLInputElement>) => void | Promise<any>,
  onKeyDown?: (ev: SyntheticKeyboardEvent<HTMLInputElement>) => void | Promise<any>,
  onKeyUp?: (ev: SyntheticKeyboardEvent<HTMLInputElement>) => void | Promise<any>,
|};

type Events = SyntheticInputEvent<HTMLInputElement> | SyntheticInputEvent<HTMLSelectElement>;

const InputPhone = ({ onChange, ...props }: Props) => {
  const handleChange = (ev: Events) => {
    const value = normalizer(ev.target.value);
    console.log(ev.target.value);

    return validate(value)
      .then(res => onChange({ value, error: res.error, code: res.code }))
      .catch(err => Promise.reject(err));
  };

  const { countries } = useFetched();
  const { language } = useIntl();

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
    maxLength,
    minLength,
    value,
    error,
    id,
    inlineLabel,
    label,
  } = props;
  return (
    <InputGroup onChange={handleChange}>
      <Select options={getCallingCodes(countries, language.countriesTranslations)} />
      <InputField
        id={id}
        type="text"
        required
        name={name}
        size={size}
        error={error && <Translate t={error} />}
        onBlur={onBlur}
        maxLength={maxLength}
        minLength={minLength}
        tabIndex={tabIndex}
        onFocus={onFocus}
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
    </InputGroup>
  );
};

export default InputPhone;
