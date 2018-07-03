// @flow strict
import * as React from "react";
import * as R from "ramda";
import styled from "styled-components";

import borderMixin, { getBorderState } from "../../styles/mixins/border";
import { brandDefault } from "../../records/Brand";
import type { ThemeProps } from "../../records/Brand";

const Label = styled.label`
  display: flex;
  position: relative;
  padding: 0 10px;
  border-radius: 1px;
  align-items: center;
  ${borderMixin};
  margin-bottom: 20px;
  background: ${({ theme }: ThemeProps) => theme.colors.white};
`;

Label.defaultProps = {
  theme: brandDefault.theme,
};

const Input = styled.input`
  flex: 1;
  height: 44px;
  padding: 0;
  border: none;
  width: 100%;
  color: ${({ theme }: ThemeProps) => theme.colors["neutral-800"]};
  font-size: 14px;
  font-weight: 500;

  &:focus {
    outline: none;
  }
`;

Input.defaultProps = {
  theme: brandDefault.theme,
};

type ErrorProps = ThemeProps & {
  active: boolean,
};

const Error = styled.div`
  position: absolute;
  font-size: 10px;
  font-weight: 400;
  right: 0;
  bottom: -14px;
  color: ${({ theme, active }: ErrorProps) => theme.colors[active ? "primary-600" : "danger-700"]};
`;

Error.defaultProps = {
  theme: brandDefault.theme,
};

const omitProps = R.omit(["error", "showState", "inputRef"]);

type Props = {
  id: string,
  value: string,
  onChange: (ev: SyntheticInputEvent<HTMLInputElement>) => void,
  onFocus?: (ev: SyntheticInputEvent<HTMLInputElement>) => void,
  onBlur?: (ev: SyntheticInputEvent<HTMLInputElement>) => void,
  placeholder: string,
  type: string,
  error: string,
  showState: boolean,
  inputRef?: (node: HTMLInputElement) => void,
};

type State = {|
  active: boolean,
  visited: boolean,
|};

export default class InputText extends React.PureComponent<Props, State> {
  static defaultProps = {
    type: "text",
    error: "",
    showState: false,
  };

  state = {
    active: false,
    visited: false,
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
    const { id, value, placeholder, error, showState, inputRef } = this.props;
    const { active, visited } = this.state;

    const borderState = getBorderState({
      active,
      visited: visited || showState,
      error: Boolean(error),
    });

    return (
      <Label state={borderState}>
        <Input
          {...omitProps(this.props)}
          innerRef={inputRef}
          id={id}
          value={value}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          placeholder={placeholder}
        />
        {borderState === "error" && <Error active={active}>{error}</Error>}
      </Label>
    );
  }
}
