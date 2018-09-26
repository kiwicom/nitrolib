// @flow strict
import * as React from "react";
import * as R from "ramda";
import styled from "styled-components";
import FaEnvelope from "react-icons/lib/fa/envelope";
import FaLongArrowRight from "react-icons/lib/fa/long-arrow-right";
import MdLock from "react-icons/lib/md/lock";
import Alert from "@kiwicom/orbit-components/lib/Alert";
import Button from "@kiwicom/orbit-components/lib/Button";
import TextLink from "@kiwicom/orbit-components/lib/TextLink";

import * as rtl from "../../../../../../styles/rtl";
import { themeDefault } from "../../../../../../records/Theme";
import InputText from "../../../../../InputText";
import type { Change } from "../../../../../InputText";
import IconText from "../../../../../IconText";
import Text from "../../../../../Text";
import * as validators from "../../../../../../services/input/validators";
import * as normalizers from "../../../../../../services/input/normalizers";
import isEmptish from "../../../../../../services/utils/isEmptish";

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
  error: string,
  onSignIn: (email: string, password: string) => Promise<boolean>,
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
  };

  handleChange = ({ value, error, id }: Change) => {
    this.setState(state => ({
      fields: R.assoc(id, { value, error }, state.fields),
    }));
  };

  handleSubmit = () => {
    const { onSignIn, onCloseSuccess } = this.props;
    const { fields } = this.state;

    this.setState({ submitted: true });
    if (!isEmptish(R.map(R.prop("error"), fields))) {
      return;
    }

    onSignIn(fields.email.value, fields.password.value).then(ok => {
      if (ok) {
        onCloseSuccess();
      }
    });
  };

  render() {
    const { fields, submitted } = this.state;
    const { loading, error, onOpenForgotPassword } = this.props;

    return (
      <>
        {error && (
          <FieldWrap>
            <Alert type="critical">{error}</Alert>
          </FieldWrap>
        )}
        <FieldWrap>
          <IconText Icon={FaEnvelope}>
            <Text t={__("common.email.colon")} />
          </IconText>
          <InputText
            id="email"
            value={fields.email.value}
            error={fields.email.error}
            onChange={this.handleChange}
            normalize={normalizers.email}
            validate={validators.required}
            autocomplete="email"
            showState={submitted}
          />
        </FieldWrap>
        <FieldWrap>
          <IconText Icon={MdLock}>
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
