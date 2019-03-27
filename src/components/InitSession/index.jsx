// @flow strict
import * as React from "react";
import { parse } from "query-string";

import type { Session } from "../../records/Session";

type Props = {|
  children: (session: Session | null) => React.Node,
|};

type State = {|
  session: Session | null,
|};

export default class InitSession extends React.PureComponent<Props, State> {
  state = {
    session: null,
  };

  componentDidMount() {
    // the order in which stuff should be determined is:
    // - URL
    // - Cookies
    // const { userId, affilId } = parse(window.location.search);

    // this.setState({});
  }

  render() {
    const { children } = this.props;
    const { session } = this.state;

    return children(session);
  }
}
