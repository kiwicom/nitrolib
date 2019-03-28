// @flow strict
import * as React from "react";
import qs from "query-string";

import { sessionDefault } from "../../records/Session";
import type { Session } from "../../records/Session";
import handleUserId from "./services/handleUserId";
import handleAffiliateId from "./services/handleAffiliateId";
import handleSessionId from "./services/handleSessionId";
import { makePageViewId } from "../../services/session/ids";
import handleUTMs from "./services/handleUTMs";

type Props = {|
  children: (session: Session) => React.Node,
|};

type State = {|
  session: Session,
|};

export default class InitSession extends React.PureComponent<Props, State> {
  state = {
    session: sessionDefault,
  };

  componentDidMount() {
    // the order in which stuff should be determined is:
    // - URL
    // - Cookies / localStorage
    const { userId, affilId, ...rest } = qs.parse(window.location.search);

    const session = {
      userId: handleUserId(userId && String(userId)),
      sessionId: handleSessionId(),
      pageViewId: makePageViewId(),
      affiliate: handleAffiliateId(affilId && String(affilId), rest),
      UTMs: handleUTMs(rest),
    };

    this.setState({ session });
  }

  render() {
    const { children } = this.props;
    const { session } = this.state;

    return children(session);
  }
}
