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

import * as rtl from "../../../../../../styles/rtl";
import { themeDefault } from "../../../../../../records/Theme";
import InputText from "../../../../../InputText";
import LogMount from "../../../../../LogMount";
import type { Change } from "../../../../../InputText";
import Text from "../../../../../Text";
import firstFormError from "../../../services/firstFormError";
import compose from "../../../../../../services/input/composeValidator";
import * as validators from "../../../../../../services/input/validators";
import * as normalizers from "../../../../../../services/input/normalizers";
import emailCorrector from "../../../../../../services/input/emailCorrector";
import isEmptish from "../../../../../../services/utils/isEmptish";
import IconText from "../../../../../IconText";
import Query from "../../../../../Query";
import { OPEN_MODAL } from "../../../../../../consts/events";

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
  margin-${rtl.left}: 5px;
  margin-top: -2px;
`;

ForgotPasswordArrow.defaultProps = {
  theme: themeDefault,
};

type Props = {|
  loading: boolean,
  onSignIn: (email: string, password: string) => Promise<void>,
  onCloseSuccess: () => void,
  onOpenForgotPassword: () => void,
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

  handleSubmit = () => {
    const { onSignIn, onCloseSuccess } = this.props;
    const { fields } = this.state;

    this.setState({ submitted: true, error: "" });
    if (!isEmptish(R.map(R.prop("error"), fields))) {
      return;
    }

    onSignIn(fields.email.value, fields.password.value)
      .then(() => {
        onCloseSuccess();
      })
      .catch(err => {
        this.setState({ error: String(err) });
      });
  };

  render() {
    const { fields, submitted, error } = this.state;
    const { loading, onOpenForgotPassword } = this.props;

    const errorSync = firstFormError(fields);

    return (
      <>
        <Query onMount={this.handleMount} />
        <LogMount event={{ event: OPEN_MODAL, data: { modal: "signIn" } }} />

        <FieldWrap>
          <IconText icon={<Envelope color="primary" size="small" />}>
            <Text t={__("common.email.colon")} />
          </IconText>
          <InputText
            id="email"
            value={fields.email.value}
            error={fields.email.error}
            onChange={this.handleChange}
            normalize={normalizers.email}
            validate={emailValidator}
            corrector={emailCorrector}
            autocomplete="email"
            showState={submitted}
          />
        </FieldWrap>
        <FieldWrap>
          {/* TODO: replace with Icon password after it will be added to Orbit */}
          <IconText icon={<Security color="primary" size="small" />}>
            <Text t={__("account.password.colon")} />
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
            <Alert type="critical">{error}</Alert>
          </FieldWrap>
        )}
        {submitted &&
          errorSync && (
            <FieldWrap>
              <Alert type="critical">
                <Text t={errorSync} />
              </Alert>
            </FieldWrap>
          )}
        <Button block onClick={this.handleSubmit} disabled={loading}>
          <Text t={__("account.sign_in")} />
        </Button>
        <FieldWrap>
          <FieldCentered>
            <TextLink onClick={onOpenForgotPassword}>
              <Text t={__("account.forgot_password")} />
              <ForgotPasswordArrow>
                <FaLongArrowRight />
              </ForgotPasswordArrow>
            </TextLink>
          </FieldCentered>
        </FieldWrap>
      </>
    );
  }
}
