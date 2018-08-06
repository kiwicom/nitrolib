// @flow strict
import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import * as R from "ramda";
import styled, { css } from "styled-components";

import Text from "../Text";
import borderMixin, { getBorderState } from "../../styles/mixins/border";
import { themeDefault } from "../../records/Theme";
import type { ThemeProps } from "../../records/Theme";

const Label = styled.label`
  display: flex;
  position: relative;
  padding: 0 10px;
  border-radius: 1px;
  align-items: center;
  ${borderMixin};
  margin-bottom: 20px;
  background: ${({ theme }: ThemeProps) => theme.orbit.paletteWhite};
`;

Label.defaultProps = {
  theme: themeDefault,
};

const Input = styled.input`
  flex: 1;
  height: 44px;
  padding: 0;
  border: none;
  width: 100%;
  color: ${({ theme }: ThemeProps) => theme.orbit.paletteInkNormalActive};
  font-size: 14px;
  font-weight: 500;

  &:focus {
    outline: none;
  }
`;

Input.defaultProps = {
  theme: themeDefault,
};

type ErrorProps = ThemeProps & {
  active: boolean,
};

const stateMixin = css`
  position: absolute;
  font-size: 10px;
  font-weight: 400;
  right: 0;
  bottom: -14px;
`;

const Error = styled.div`
  ${stateMixin};
  color: ${({ theme, active }: ErrorProps) =>
    theme.orbit[active ? "paletteProductNormal" : "colorTextError"]};
`;

Error.defaultProps = {
  theme: themeDefault,
};

const Hint = styled.span`
  ${stateMixin};
  color: ${({ theme }: ErrorProps) => theme.orbit.paletteProductNormal};
`;

const HintText = styled.a`
  font-weight: 700;
  text-decoration: underline;
  cursor: pointer;
`;

Hint.defaultProps = {
  theme: themeDefault,
};

const omitProps = R.omit(["showState", "inputRef", "validate", "normalize", "corrector"]);

export type Change = {|
  value: string,
  error: string,
  id: string,
|};

type Props = {
  id: string,
  value: string,
  onChange: Change => void,
  onFocus?: (ev: SyntheticInputEvent<HTMLInputElement>) => void,
  onBlur?: (ev: SyntheticInputEvent<HTMLInputElement>) => void,
  placeholder: ?string,
  type: string,
  error: string,
  normalize: (value: string) => string,
  validate: (value: string) => string,
  corrector: (value: string) => string,
  showState: boolean,
  inputRef?: (node: HTMLInputElement) => void,
};

type State = {|
  hint: string,
  active: boolean,
  visited: boolean,
|};

export default class InputText extends React.PureComponent<Props, State> {
  static defaultProps = {
    type: "text",
    placeholder: null,
    showState: false,
    error: "",
    normalize: R.identity,
    validate: R.always(""),
    corrector: R.always(""),
  };

  state = {
    hint: "",
    active: false,
    visited: false,
  };

  handleHint = () => {
    const { hint } = this.state;
    const { id, normalize, validate, onChange } = this.props;

    const value = normalize(hint);
    const error = validate(value);

    this.setState({ hint: "" });

    onChange({ value, error, id });
  };

  handleChange = (ev: SyntheticInputEvent<HTMLInputElement>) => {
    const { id, normalize, validate, corrector, onChange } = this.props;

    const value = normalize(ev.target.value);
    const error = validate(value);
    const hint = corrector(value);

    this.setState({ hint });

    onChange({ value, error, id });
  };

  handleFocus = (ev: SyntheticInputEvent<HTMLInputElement>) => {
    const { onFocus } = this.props;

    this.setState({ active: true });
    if (onFocus) {
      onFocus(ev);
    }
  };

  handleBlur = (ev: SyntheticInputEvent<HTMLInputElement>) => {
    const { onBlur } = this.props;

    this.setState({ active: false, visited: true });
    if (onBlur) {
      onBlur(ev);
    }
  };

  render() {
    const { value, error, placeholder, showState, inputRef } = this.props;
    const { hint, active, visited } = this.state;

    const borderState = getBorderState({
      active,
      visited: visited || showState,
      error: Boolean(error),
      hint: Boolean(hint),
    });

    return (
      <Label state={borderState}>
        <Input
          {...omitProps(this.props)}
          innerRef={inputRef}
          value={value}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          placeholder={placeholder}
        />

        {borderState === "error" && (
          <Error active={active}>
            <Text t={error} />
          </Error>
        )}

        {borderState === "hint" && (
          <Hint onClick={this.handleHint}>
            <Text
              t={__("common.did_you_mean")}
              values={{ x: renderToStaticMarkup(<HintText>{hint}</HintText>) }}
              html
            />
          </Hint>
        )}
      </Label>
    );
  }
}
