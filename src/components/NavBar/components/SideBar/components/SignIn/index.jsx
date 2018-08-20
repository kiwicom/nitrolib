// @flow strict
import * as React from "react";
import * as R from "ramda";
import styled from "styled-components";
import FaEnvelope from "react-icons/lib/fa/envelope";
import MdLock from "react-icons/lib/md/lock";
import Alert from "@kiwicom/orbit-components/lib/Alert";
import Button from "@kiwicom/orbit-components/lib/Button";
import TextOrbit from "@kiwicom/orbit-components/lib/Text";

import linkMixin from "../../../../../../styles/mixins/link";
import InputText from "../../../../../InputText";
import type { Change } from "../../../../../InputText";
import IconText from "../../../../../IconText";
import Text from "../../../../../Text";
import { themeDefault } from "../../../../../../records/Theme";
import * as validators from "../../../../../../services/input/validators";
import * as normalizers from "../../../../../../services/input/normalizers";
import isEmptish from "../../../../../../services/utils/isEmptish";
import * as api from "../../../../../../services/auth/api";
import type { User } from "../../../../../../records/User";

const FieldWrap = styled.div`
  position: relative;
  margin: 15px 0;
`;

const FieldPolicy = styled(FieldWrap)`
  ${linkMixin};
`;

FieldPolicy.defaultProps = {
  theme: themeDefault,
};

type Props = {|
  brandId: string,
  onSetUser: (user: ?User) => void,
  onSaveToken: (token: string) => void,
  // DI
  signIn: typeof api.signIn,
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
  loading: boolean,
  error: string,
|};

export default class SignIn extends React.PureComponent<Props, State> {
  static defaultProps = {
    signIn: api.signIn,
  };

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
    loading: false,
    error: "",
  };

  handleChange = ({ value, error, id }: Change) => {
    this.setState(state => ({
      fields: R.assoc(id, { value, error }, state.fields),
    }));
  };

  handleSubmit = () => {
    const { brandId, signIn, onSetUser, onSaveToken } = this.props;
    const { fields } = this.state;

    this.setState({ submitted: true });
    if (!isEmptish(R.map(R.prop("error"), fields))) {
      return;
    }

    this.setState({ error: "", loading: true });
    signIn({
      email: fields.email.value,
      password: fields.password.value,
      brand: brandId,
    })
      .then(({ user, token }) => {
        onSetUser(user);
        onSaveToken(token);
        this.setState({ loading: false });
      })
      .catch(err => {
        this.setState({ loading: false, error: String(err) });
        // TODO log
      });
  };

  render() {
    const { fields, submitted, loading, error } = this.state;

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
        <FieldPolicy>
          <TextOrbit>
            <Text t={__("account.registration_privacy_policy")} html />
          </TextOrbit>
        </FieldPolicy>
        <Button block onClick={this.handleSubmit} disabled={loading}>
          <Text t={__("account.sign_in")} />
        </Button>
      </>
    );
  }
}
