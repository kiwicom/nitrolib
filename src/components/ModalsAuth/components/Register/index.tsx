import * as React from "react";
import * as R from "ramda";
import styled from "styled-components";
import Button from "@kiwicom/orbit-components/lib/Button";
import Text from "@kiwicom/orbit-components/lib/Text";
import Alert from "@kiwicom/orbit-components/lib/Alert";
import Envelope from "@kiwicom/orbit-components/lib/icons/Email";
import Lock from "@kiwicom/orbit-components/lib/icons/Lock";
import User from "@kiwicom/orbit-components/lib/icons/Passenger";

import Query from "../../../Query";
import LogMount from "../../../LogMount";
import InputText from "../../../InputText";
import { Change } from "../../../InputText";
import IconText from "../../../IconText";
import Translate from "../../../Translate";
import firstFormError from "../../../NavBar/services/firstFormError";
import * as normalizers from "../../../../services/input/normalizers";
import * as validators from "../../../../services/input/validators";
import compose from "../../../../services/input/composeValidator";
import emailCorrector from "../../../../services/input/emailCorrector";
import addScript from "../../../../services/utils/addScript";
import isEmptish from "../../../../services/utils/isEmptish";
import linkMixin from "../../../../styles/mixins/link";
import { themeDefault } from "../../../../records/Theme";
import { RegisterInput } from "../../../../services/auth/api";
import { MODAL_OPEN } from "../../../../consts/events";

const ZXCVBN_URL = "https://cdnjs.cloudflare.com/ajax/libs/zxcvbn/4.4.2/zxcvbn.js";

const ERRORS = {
  "Password is too short.": __("account.password_too_short"),
  "Password has a pattern.": __("account.password_has_pattern"),
  "Password is too common.": __("account.password_too_common"),
  "Password is too simple.": __("account.password_too_simple"),
};

const emailValidator = compose(
  validators.email,
  validators.required,
);

const passwordValidator = compose(
  validators.password,
  validators.required,
);

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

type Props = {
  loading: boolean,
  onRegister: (input: RegisterInput) => Promise<void>,
  onChange: () => void,
};

type Field<T> = {
  value: T,
  error: string,
};

type Fields = {
  firstName: Field<string>,
  lastName: Field<string>,
  email: Field<string>,
  password: Field<string>,
};

type State = {
  fields: Fields,
  submitted: boolean,
  error: string,
};

export default class Register extends React.PureComponent<Props, State> {
  state = {
    fields: {
      firstName: {
        value: ,
        error: __("forms.this_field_must_be_filled"),
      },
      lastName: {
        value: ,
        error: __("forms.this_field_must_be_filled"),
      },
      email: {
        value: ,
        error: __("forms.this_field_must_be_filled"),
      },
      password: {
        value: ,
        error: __("forms.this_field_must_be_filled"),
      },
    },
    submitted: false,
    error: ,
  };

  componentDidMount() {
    if (!window.zxcvbn) {
      addScript(ZXCVBN_URL);
    }
  }

  handleMount = (query: { [key: string]: string }) => {
    // ?first_name=Joe&last_name=Doe&email=joe@doe.com
    if (query.first_name) {
      this.setState(state =>
        R.assocPath(["fields", "firstName", "value"], query.first_name, state),
      );
      this.setState(state => R.assocPath(["fields", "firstName", "error"], , state));
    }

    if (query.last_name) {
      this.setState(state => R.assocPath(["fields", "lastName", "value"], query.last_name, state));
      this.setState(state => R.assocPath(["fields", "lastName", "error"], , state));
    }

    if (query.email) {
      this.setState(state => R.assocPath(["fields", "email", "value"], query.email, state));
      this.setState(state => R.assocPath(["fields", "email", "error"], , state));
    }
  };

  handleChange = ({ value, error, id }: Change) => {
    this.setState(state => ({
      fields: R.assoc(id, { value, error }, state.fields),
    }));
  };

  handleSubmit = (ev: SyntheticEvent<HTMLFormElement>) => {
    ev.preventDefault();

    const { loading, onRegister, onChange } = this.props;
    const { fields } = this.state;

    if (loading) {
      return Promise.resolve(null);
    }

    this.setState({ submitted: true });
    if (!isEmptish(R.map(R.prop("error"), fields))) {
      return Promise.resolve(null);
    }

    return onRegister({
      firstName: fields.firstName.value,
      lastName: fields.lastName.value,
      email: fields.email.value,
      password: fields.password.value,
    })
      .then(() => {
        onChange();
      })
      .catch(err => {
        const msg = err.message;

        this.setState({ error: ERRORS[msg] || msg });
      });
  };

  render() {
    const { fields, submitted, error } = this.state;
    const { loading } = this.props;

    const errorSync = firstFormError(fields);

    return (
      <form onSubmit={this.handleSubmit}>
        <Query onMount={this.handleMount} />
        <LogMount event={MODAL_OPEN} props={{ modal: "register" }} />

        <FieldWrap>
          <IconText icon={<User color="primary" size="small" />}>
            <Translate t="common.firstname.colon" />
          </IconText>
          <InputText
            id="firstName"
            value={fields.firstName.value}
            error={fields.firstName.error}
            onChange={this.handleChange}
            validate={validators.required}
            autoComplete="given-name"
            showState={submitted}
          />
        </FieldWrap>
        <FieldWrap>
          <IconText icon={<User color="primary" size="small" />}>
            <Translate t="common.lastname.colon" />
          </IconText>
          <InputText
            id="lastName"
            value={fields.lastName.value}
            error={fields.lastName.error}
            onChange={this.handleChange}
            validate={validators.required}
            autoComplete="family-name"
            showState={submitted}
          />
        </FieldWrap>
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
          <IconText icon={<Lock color="primary" size="small" />}>
            <Translate t="account.password.colon" />
          </IconText>
          <InputText
            id="password"
            value={fields.password.value}
            error={fields.password.error}
            onChange={this.handleChange}
            validate={passwordValidator}
            type="password"
            showState={submitted}
          />
        </FieldWrap>
        <FieldPolicy>
          <Text>
            <Translate t="account.registration_privacy_policy" html />
          </Text>
        </FieldPolicy>
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
          <Translate t="account.sign_up" />
        </Button>
      </form>
    );
  }
}
