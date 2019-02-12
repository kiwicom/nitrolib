// @flow strict
import * as React from "react";
import * as R from "ramda";
import styled from "styled-components";
import FaLongArrowRight from "react-icons/lib/fa/long-arrow-right";
import Envelope from "@kiwicom/orbit-components/lib/icons/Email";
import Button from "@kiwicom/orbit-components/lib/Button";
import Alert from "@kiwicom/orbit-components/lib/Alert";
import TextLink from "@kiwicom/orbit-components/lib/TextLink";
import Security from "@kiwicom/orbit-components/lib/icons/Security";
import { left } from "@kiwicom/orbit-components/lib/utils/rtl";

import { themeDefault } from "../../../../records/Theme";
import ValueBind from "../../../ValueBind";
import InputText from "../../../InputText";
import LogMount from "../../../LogMount";
import type { Change } from "../../../InputText";
import Translate from "../../../Translate";
import firstFormError from "../../../NavBar/services/firstFormError";
import compose from "../../../../services/input/composeValidator";
import * as validators from "../../../../services/input/validators";
import * as normalizers from "../../../../services/input/normalizers";
import emailCorrector from "../../../../services/input/emailCorrector";
import isEmptish from "../../../../services/utils/isEmptish";
import IconText from "../../../IconText";
import Query from "../../../Query";
import { MODAL_OPEN } from "../../../../consts/events";

const ERRORS = {
  "Login failed.": __("account.login_failed"),
  "User is not verified.": __("account.user_is_not_verified"),
  "You are temporarily blocked from other login attempts.": __(
    "account.user_temporarily_blocked_from_login",
  ),
};

const emailValidator = compose(
  validators.email,
  validators.required,
);

const FieldWrap = styled.div`
  position: relative;
  margin: 15px 0;
`;

const FieldCentered = styled(FieldWrap)`
  text-align: center;
`;

const ForgotPasswordArrow = styled.span`
  margin-${/* sc-custom "left" */ left}: 5px;
  margin-top: -2px;
`;

ForgotPasswordArrow.defaultProps = {
  theme: themeDefault,
};

type Props = {|
  loading: boolean,
  onSignIn: (email: string, password: string) => Promise<void>,
  onChange: (value?: string) => void,
|};

type Field<T> = {|
  value: T,
  error: string,
|};

type Fields = {|
  email: Field<string>,
  password: Field<string>,
|};

type State = {|
  fields: Fields,
  submitted: boolean,
  error: string,
|};

export default class SignIn extends React.PureComponent<Props, State> {
  state = {
    fields: {
      email: {
        value: "",
        error: __("forms.this_field_must_be_filled"),
      },
      password: {
        value: "",
        error: __("forms.this_field_must_be_filled"),
      },
    },
    submitted: false,
    error: "",
  };

  handleMount = (query: { [key: string]: string }) => {
    // ?email=joe@doe.com
    if (query.email) {
      this.setState(state => R.assocPath(["fields", "email", "value"], query.email, state));
      this.setState(state => R.assocPath(["fields", "email", "error"], "", state));
    }
  };

  handleChange = ({ value, error, id }: Change) => {
    this.setState(state => ({
      fields: R.assoc(id, { value, error }, state.fields),
    }));
  };

  handleSubmit = (ev: SyntheticEvent<HTMLFormElement>) => {
    ev.preventDefault();

    const { loading, onSignIn, onChange } = this.props;
    const { fields } = this.state;

    if (loading) {
      return;
    }

    this.setState({ submitted: true, error: "" });
    if (!isEmptish(R.map(R.prop("error"), fields))) {
      return;
    }

    onSignIn(fields.email.value, fields.password.value)
      .then(() => {
        onChange();
      })
      .catch(err => {
        const msg = err.message;

        this.setState({ error: ERRORS[msg] || __("common.api_error") });
      });
  };

  render() {
    const { fields, submitted, error } = this.state;
    const { loading, onChange } = this.props;

    const errorSync = firstFormError(fields);

    return (
      <form onSubmit={this.handleSubmit}>
        <Query onMount={this.handleMount} />
        <LogMount event={MODAL_OPEN} props={{ modal: "signIn" }} />

        <FieldWrap>
          <IconText icon={<Envelope color="primary" size="small" />}>
            <Translate t="common.email.colon" />
          </IconText>
          <InputText
            id="email"
            value={fields.email.value}
            error={fields.email.error}
            onChange={this.handleChange}
            normalize={normalizers.email}
            validate={emailValidator}
            corrector={emailCorrector}
            autoComplete="email"
            showState={submitted}
          />
        </FieldWrap>
        <FieldWrap>
          {/* TODO: replace with Icon password after it will be added to Orbit */}
          <IconText icon={<Security color="primary" size="small" />}>
            <Translate t="account.password.colon" />
          </IconText>
          <InputText
            id="password"
            value={fields.password.value}
            error={fields.password.error}
            onChange={this.handleChange}
            validate={validators.required}
            type="password"
            showState={submitted}
          />
        </FieldWrap>
        {error && (
          <FieldWrap>
            <Alert type="critical">
              <Translate t={error} />
            </Alert>
          </FieldWrap>
        )}
        {submitted && errorSync && (
          <FieldWrap>
            <Alert type="critical">
              <Translate t={errorSync} />
            </Alert>
          </FieldWrap>
        )}
        <Button block submit disabled={loading}>
          <Translate t="account.sign_in" />
        </Button>
        <FieldWrap>
          <FieldCentered>
            <ValueBind value="forgotPassword" onChange={onChange}>
              {({ onClick }) => (
                <TextLink onClick={onClick}>
                  <Translate t="account.forgot_password" />
                  <ForgotPasswordArrow>
                    <FaLongArrowRight />
                  </ForgotPasswordArrow>
                </TextLink>
              )}
            </ValueBind>
          </FieldCentered>
        </FieldWrap>
      </form>
    );
  }
}
