// @flow strict
import * as React from "react";

import { authDefault } from "../../records/Auth";
import type { Auth } from "../../records/Auth";
import * as api from "./api";

type Props = {|
  token: ?string,
  children: React.Node,
|};

type State = {|
  auth: Auth | null,
  loading: boolean,
|};

type Context = {|
  auth: Auth | null,
  loading: boolean,
  setAuth: (auth: ?Auth) => void,
|};

const { Consumer, Provider } = React.createContext(
  ({
    auth: null,
    loading: false,
    setAuth: () => {},
  }: Context),
);

export class AuthProvider extends React.PureComponent<Props, State> {
  state = {
    auth: authDefault,
    loading: false,
  };

  componentDidMount() {
    const { token } = this.props;
    if (!token) {
      return;
    }

    this.setState({ loading: true });
    api.getTokenUser(token).then(user => {
      this.setState({ auth: { user, token }, loading: false });
    });
  }

  setAuth = (auth: ?Auth) => {
    this.setState({ auth });
  };

  render() {
    const { auth, loading } = this.state;
    const { children } = this.props;

    return (
      <Provider
        value={{
          auth,
          loading,
          setAuth: this.setAuth,
        }}
      >
        {children}
      </Provider>
    );
  }
}

export { Consumer, AuthProvider as Provider };
