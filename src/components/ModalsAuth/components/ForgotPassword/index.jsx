// @flow strict
import * as React from "react";
import styled from "styled-components";
import Envelope from "@kiwicom/orbit-components/lib/icons/Email";
import Alert from "@kiwicom/orbit-components/lib/Alert";
import Button from "@kiwicom/orbit-components/lib/Button";
import Text from "@kiwicom/orbit-components/lib/Text";

import { padding } from "../../../../styles";
import { themeDefault } from "../../../../records/Theme";
import type { ThemeProps } from "../../../../records/Theme";
import LogMount from "../../../LogMount";
import InputText from "../../../InputText";
import type { Change } from "../../../InputText";
import IconText from "../../../IconText";
import Translate from "../../../Translate";
import AcceptAlert from "../../../AcceptAlert";
import * as validators from "../../../../services/input/validators";
import compose from "../../../../services/input/composeValidator";
import * as normalizers from "../../../../services/input/normalizers";
import emailCorrector from "../../../../services/input/emailCorrector";
import * as api from "../../../../services/auth/api";
import { MODAL_OPEN } from "../../../../consts/events";

const emailValidator = compose(
  validators.email,
  validators.required,
);

const Container = styled.div`
  padding: ${padding.page}px;
  background: ${({ theme }: ThemeProps) => theme.orbit.paletteWhite};
`;

Container.defaultProps = {
  theme: themeDefault,
};

const FieldWrap = styled.div`
  position: relative;
  margin: 15px 0;
`;

type Props = {|
  brandId: string,
  onClose: () => void,
  // DI
  resetPassword: typeof api.resetPassword,
|};

type State = {|
  email: {|
    value: string,
    error: string,
  |},
  submitted: boolean,
  loading: boolean,
  error: ?Error,
|};

export default class ForgotPassword extends React.PureComponent<Props, State> {
  static defaultProps = {
    resetPassword: api.resetPassword,
  };

  state = {
    email: {
      value: "",
      error: __("forms.this_field_must_be_filled"),
    },
    submitted: false,
    loading: false,
    error: null,
  };

  handleChange = ({ value, error }: Change) => {
    this.setState({
      email: { value, error },
      submitted: false,
      error: null,
    });
  };

  handleSubmit = (ev: SyntheticEvent<HTMLFormElement>) => {
    ev.preventDefault();

    const { brandId, resetPassword } = this.props;
    const { loading, email } = this.state;

    if (loading || email.error) {
      return Promise.resolve();
    }

    this.setState({ error: null, loading: true });

    return resetPassword(email.value, brandId)
      .then(() => {
        this.setState({ loading: false, submitted: true });
        // TODO log
      })
      .catch(err => {
        this.setState({ loading: false, error: err });
        // TODO log
      });
  };

  render() {
    const { email, submitted, loading, error } = this.state;
    const { onClose } = this.props;

    if (error && error.name === "INVALID_ARGUMENT_LOGIN") {
      return (
        <AcceptAlert onClose={onClose}>
          <Text>
            <Translate t="account.user_with_email_does_not_exist" />
          </Text>
        </AcceptAlert>
      );
    }

    if (submitted) {
      return (
        <AcceptAlert onClose={onClose}>
          <Text>
            <Translate t="account.you_will_recieve_password" />
          </Text>
        </AcceptAlert>
      );
    }

    return (
      <Container>
        <form onSubmit={this.handleSubmit}>
          <LogMount event={MODAL_OPEN} props={{ modal: "forgotPassword" }} />
          {error && (
            <FieldWrap>
              <Alert type="critical">
                <Translate t="common.api_error" />
              </Alert>
            </FieldWrap>
          )}
          <Text>
            <Translate t="account.enter_your_email" />
          </Text>
          <FieldWrap>
            <IconText icon={<Envelope color="primary" size="small" />}>
              <Translate t="common.email.colon" />
            </IconText>
            <InputText
              id="email"
              value={email.value}
              error={email.error}
              onChange={this.handleChange}
              normalize={normalizers.email}
              validate={emailValidator}
              corrector={emailCorrector}
              autoComplete="email"
              showState={submitted}
            />
          </FieldWrap>
          <Button block submit size="large" disabled={loading || Boolean(email.error)}>
            {loading ? <Translate t="common.loading" /> : <Translate t="account.reset_password" />}
          </Button>
        </form>
      </Container>
    );
  }
}
