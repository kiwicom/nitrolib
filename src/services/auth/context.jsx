// @flow strict
import * as React from "react";

import { userDefault } from "../../records/User";
import type { User } from "../../records/User";
import * as api from "./api";

type Props = {|
  token: ?string,
  children: React.Node,
|};

type State = {|
  user: ?User,
  loading: boolean,
|};

type Context = {|
  user: ?User,
  loading: boolean,
  setUser: (user: ?User) => void,
|};

const { Consumer, Provider } = React.createContext(
  ({
    user: userDefault,
    loading: false,
    setUser: () => {},
  }: Context),
);

export class CurrencyProvider extends React.PureComponent<Props, State> {
  state = {
    user: userDefault,
    loading: false,
  };

  componentDidMount() {
    const { token } = this.props;
    if (!token) {
      return;
    }

    this.setState({ loading: true });
    api.getTokenUser(token).then(user => {
      this.setState({ user, loading: false });
    });
  }

  setUser = (user: ?User) => {
    this.setState({ user });
  };

  render() {
    const { user, loading } = this.state;
    const { children } = this.props;

    return (
      <Provider
        value={{
          user,
          loading,
          setUser: this.setUser,
        }}
      >
        {children}
      </Provider>
    );
  }
}

export { Consumer, CurrencyProvider as Provider };
