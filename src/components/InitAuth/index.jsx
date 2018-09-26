// @flow strict
import * as React from "react";

import { authDefault } from "../../records/Auth";
import type { Auth } from "../../records/Auth";
import type { Brand } from "../../records/Brand";
import * as api from "../../services/auth/api";

type Arg = {|
  auth: Auth | null,
  loading: boolean,
  error: string,
  onSignIn: (email: string, password: string) => void,
|};

type Props = {|
  token: string | null,
  brand: Brand,
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
    api.getTokenUser(token).then(user => {
      this.setState({ auth: { user, token }, loading: false });
    });
  }

  handleSignIn = (email: string, password: string) => {
    const { brand } = this.props;

    this.setState({ loading: true });
    api
      .signIn({ email, password, brand: brand.id })
      .then(auth => {
        this.setState({ auth, error: "", loading: false });
      })
      .catch(err => {
        this.setState({ auth: null, error: String(err), loading: false });
      });
  };

  render() {
    const { auth, loading, error } = this.state;
    const { children } = this.props;

    return children({ auth, loading, error, onSignIn: this.handleSignIn });
  }
}
