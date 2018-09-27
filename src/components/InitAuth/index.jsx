// @flow strict
import * as React from "react";
import type { Environment } from "react-relay";

import { authDefault } from "../../records/Auth";
import type { Auth } from "../../records/Auth";
import type { Brand } from "../../records/Brand";
import * as api from "../../services/auth/api";
import makeEnvironment from "../../services/utils/makeEnvironment";
import type { Input } from "../../services/utils/makeEnvironment";

const makeCall = (token: string) => (input: Input) =>
  fetch("https://graphql.kiwi.com", {
    method: "POST",
    headers: {
      // Add authentication and other headers here
      "Content-type": "application/json",
      Accept: "application/json",
      Authorization: token,
    },
    body: JSON.stringify(input),
  }).then(res => res.json());

type Arg = {|
  auth: Auth | null,
  loading: boolean,
  error: string,
  environment: Environment,
  onSignIn: (email: string, password: string) => Promise<boolean>,
|};

type Props = {|
  token: string | null,
  brand: Brand,
  onToken: (token: string) => void,
  children: (arg: Arg) => React.Node,
|};

type State = {|
  auth: Auth | null,
  loading: boolean,
  error: string,
|};

export default class InitAuth extends React.PureComponent<Props, State> {
  state = {
    auth: authDefault,
    loading: false,
    error: "",
  };

  componentDidMount() {
    const { token } = this.props;
    if (token === null) {
      return;
    }

    this.setState({ loading: true });
    api
      .getTokenUser(token)
      .then(user => {
        this.setState({ auth: { user, token }, loading: false });
      })
      .catch(() => {
        // Ignoring errors here
        this.setState({ loading: false });
      });
  }

  handleSignIn = (email: string, password: string): Promise<boolean> => {
    const { brand, onToken } = this.props;

    this.setState({ loading: true });
    return api
      .signIn({ email, password, brand: brand.id })
      .then(auth => {
        onToken(auth.token);
        this.setState({ auth, error: "", loading: false });
        return true;
      })
      .catch(err => {
        this.setState({ auth: null, error: String(err), loading: false });
        return false;
      });
  };

  render() {
    const { auth, loading, error } = this.state;
    const { children } = this.props;

    return children({
      auth,
      loading,
      error,
      environment: makeEnvironment(makeCall(auth !== null ? auth.token : "")),
      onSignIn: this.handleSignIn,
    });
  }
}
