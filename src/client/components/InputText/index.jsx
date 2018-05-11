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
  background: ${(props: ThemeProps) => props.theme.colors.white};
`;

Label.defaultProps = {
  theme: brandDefault.theme,
};

const LabelWrap = styled.div`
  flex: 0;
  height: 44px;
  padding-right: 14px;
`;

const Input = styled.input`
  flex: 1;
  height: 44px;
  padding: 0;
  border: none;
  width: 100%;
  color: ${(props: ThemeProps) => props.theme.colors["neutral-800"]};
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
  color: ${(props: ErrorProps) => props.theme.colors[props.active ? "primary-600" : "danger-700"]};
`;

Error.defaultProps = {
  theme: brandDefault.theme,
};

const omitProps = R.omit(["label", "error", "showState"]);

type Props = {
  id: string,
  value: string,
  onChange: (ev: SyntheticInputEvent<HTMLInputElement>) => void,
  onFocus?: (ev: SyntheticInputEvent<HTMLInputElement>) => void,
  onBlur?: (ev: SyntheticInputEvent<HTMLInputElement>) => void,
  placeholder: string,
  type: string,
  label: React.Node,
  error: string,
  showState: boolean,
};

type State = {|
  active: boolean,
  visited: boolean,
|};

export default class InputText extends React.PureComponent<Props, State> {
  static defaultProps = {
    type: "text",
    label: null,
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
    const { id, value, placeholder, label, error, showState } = this.props;
    const { active, visited } = this.state;

    const borderState = getBorderState({
      active,
      visited: visited || showState,
      error: Boolean(error),
    });

    return (
      <Label htmlFor={id} state={borderState}>
        {label !== null && <LabelWrap>{label}</LabelWrap>}
        <Input
          {...omitProps(this.props)}
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
