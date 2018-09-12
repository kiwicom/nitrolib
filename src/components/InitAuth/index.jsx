// @flow strict
import * as React from "react";

import { authDefault } from "../../records/Auth";
import type { Auth } from "../../records/Auth";
import * as api from "../../services/auth/api";

type Arg = {|
  auth: Auth | null,
  loading: boolean,
|};

type Props = {|
  token: string | null,
  children: (arg: Arg) => React.Node,
|};

type State = {|
  auth: Auth | null,
  loading: boolean,
|};

export default class LoginOnMount extends React.PureComponent<Props, State> {
  state = {
    auth: authDefault,
    loading: false,
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

  render() {
    const { auth, loading } = this.state;
    const { children } = this.props;

    return children({ auth, loading });
  }
}
