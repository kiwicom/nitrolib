// @flow strict
import * as React from "react";
import * as R from "ramda";
import styled from "styled-components";
import FaUser from "react-icons/lib/fa/user";
import FaEnvelope from "react-icons/lib/fa/envelope";
import MdLock from "react-icons/lib/md/lock";
import Alert from "@kiwicom/orbit-components/lib/Alert";
import Button from "@kiwicom/orbit-components/lib/Button";

import InputText from "../../../../../InputText";
import type { Change } from "../../../../../InputText";
import IconText from "../../../../../IconText";
import Text from "../../../../../Text";
import * as normalizers from "../../../../../../services/input/normalizers";
import * as validators from "../../../../../../services/input/validators";
import compose from "../../../../../../services/input/composeValidator";
import emailCorrector from "../../../../../../services/input/emailCorrector";
import addScript from "../../../../../../services/utils/addScript";
import isEmptish from "../../../../../../services/utils/isEmptish";
import * as api from "../../../../../../services/auth/api";

const ZXCVBN_URL = "https://cdnjs.cloudflare.com/ajax/libs/zxcvbn/4.4.2/zxcvbn.js";

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

type Props = {|
  brandId: string,
  // DI
  register: typeof api.register,
|};

type Field<T> = {|
  value: T,
  error: string,
|};

type Fields = {|
  firstName: Field<string>,
  lastName: Field<string>,
  email: Field<string>,
  password: Field<string>,
|};

type State = {|
  fields: Fields,
  submitted: boolean,
  loading: boolean,
  error: string,
|};

export default class Register extends React.PureComponent<Props, State> {
  static defaultProps = {
    register: api.register,
  };

  state = {
    fields: {
      firstName: {
        value: "",
        error: __("forms.this_field_must_be_filled"),
      },
      lastName: {
        value: "",
        error: __("forms.this_field_must_be_filled"),
      },
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

  componentDidMount() {
    if (!window.zxcvbn) {
      addScript(ZXCVBN_URL);
    }
  }

  handleChange = ({ value, error, id }: Change) => {
    this.setState(state => ({
      fields: R.assoc(id, { value, error }, state.fields),
    }));
  };

  handleSubmit = () => {
    const { brandId, register } = this.props;
    const { fields } = this.state;

    this.setState({ submitted: true });
    if (!isEmptish(R.map(R.prop("error"), fields))) {
      return;
    }

    this.setState({ error: "", loading: true });
    register({
      firstName: fields.firstName.value,
      lastName: fields.lastName.value,
      email: fields.email.value,
      password: fields.password.value,
      brand: brandId,
    })
      .then(() => {
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
          <IconText Icon={FaUser}>
            <Text t={__("common.firstname.colon")} />
          </IconText>
          <InputText
            id="firstName"
            value={fields.firstName.value}
            error={fields.firstName.error}
            onChange={this.handleChange}
            validate={validators.required}
            autocomplete="given-name"
            showState={submitted}
          />
        </FieldWrap>
        <FieldWrap>
          <IconText Icon={FaUser}>
            <Text t={__("common.lastname.colon")} />
          </IconText>
          <InputText
            id="lastName"
            value={fields.lastName.value}
            error={fields.lastName.error}
            onChange={this.handleChange}
            validate={validators.required}
            autocomplete="family-name"
            showState={submitted}
          />
        </FieldWrap>
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
            validate={emailValidator}
            corrector={emailCorrector}
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
            validate={passwordValidator}
            type="password"
            showState={submitted}
          />
        </FieldWrap>
        <Button block onClick={this.handleSubmit} disabled={loading}>
          <Text t={__("account.sign_up")} />
        </Button>
      </>
    );
  }
}
