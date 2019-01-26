// @flow strict
import * as React from "react";
import * as R from "ramda";
import styled, { css } from "styled-components";
import { right } from "@kiwicom/orbit-components/lib/utils/rtl";

import borderMixin, { getBorderState } from "../../styles/mixins/border";
import Translate from "../Translate";
import TranslateNode from "../TranslateNode";
import { themeDefault } from "../../records/Theme";
import type { ThemeProps } from "../../records/Theme";

const Label = styled.label`
  display: flex;
  position: relative;
  padding: 0 10px;
  border-radius: 1px;
  align-items: center;
  ${borderMixin};
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
  font-size: ${({ theme }: ThemeProps) => theme.orbit.fontSizeTextNormal};
  font-weight: ${({ theme }: ThemeProps) => theme.orbit.fontWeightMedium};

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
  font-weight: ${({ theme }: ThemeProps) => theme.orbit.fontWeightNormal};
  ${right}: 0;
`;

const States = styled.div`
  display: flex;
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

Hint.defaultProps = {
  theme: themeDefault,
};

const HintText = styled.a`
  font-weight: ${({ theme }: ThemeProps) => theme.orbit.fontWeightBold};
  text-decoration: underline;
  cursor: pointer;
`;

HintText.defaultProps = {
  theme: themeDefault,
};

const omitProps = R.omit(["showState", "forwardedRef", "validate", "normalize", "corrector"]);

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
  forwardedRef?: (node: HTMLInputElement) => void,
};

type State = {|
  hint: string,
  active: boolean,
  visited: boolean,
|};

class InputText extends React.PureComponent<Props, State> {
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
    const { value, error, placeholder, showState, forwardedRef } = this.props;
    const { hint, active, visited } = this.state;

    const borderState = getBorderState({
      active,
      visited: visited || showState,
      error: Boolean(error),
      hint: Boolean(hint),
    });

    return (
      <>
        <Label state={borderState}>
          <Input
            {...omitProps(this.props)}
            ref={forwardedRef}
            value={value}
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            placeholder={placeholder}
          />
        </Label>
        <States>
          {borderState === "error" && (
            <Error active={active}>
              <Translate t={error} />
            </Error>
          )}

          {borderState === "hint" && (
            <Hint onClick={this.handleHint}>
              <TranslateNode t="common.did_you_mean" values={{ x: <HintText>{hint}</HintText> }} />
            </Hint>
          )}
        </States>
      </>
    );
  }
}

type RefProps = {
  ...Props,
  ref?: (node: HTMLInputElement) => void,
};

// TODO find a nicer way to do this
// eslint-disable-next-line react/no-multi-comp
const InputTextRef: React.ComponentType<RefProps> = React.forwardRef((props, ref) => (
  <InputText {...props} forwardedRef={ref} />
));

export { InputText };

export default InputTextRef;
