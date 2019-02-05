// @flow

import * as React from "react";

import {
  Provider,
  type Subcategory,
  type CuckooAction,
  type CuckooError,
  type CuckooProps,
} from "../../services/cuckoo/context";

type CuckooEvent = {|
  category: "nitro",
  subcategory: Subcategory,
  action: CuckooAction,
  destinations: {| logmole: boolean, exponea: boolean, ga: boolean |},
|};

type CuckooErrorEvent = {
  category: "nitro",
  subcategory: "Error",
  action: CuckooError,
  destinations: {| logmole: boolean, exponea: boolean, ga: boolean |},
};

type Props = {|
  children: React.Node,
  tracker: {|
    track: (CuckooEvent, CuckooProps) => void,
    error: (CuckooErrorEvent, CuckooProps) => void,
  |},
  bid: ?number,
|};

class CuckooLogger extends React.Component<Props> {
  error = (errorType: CuckooError, error: Error, props: ?CuckooProps) => {
    const { tracker, bid } = this.props;
    const enhancedProps = { ...(props || {}), bid, error };

    tracker.error(
      {
        category: "nitro",
        subcategory: "Error",
        action: errorType,
        destinations: { logmole: true, exponea: false, ga: false },
      },
      enhancedProps,
    );
  };

  track = (subcategory: Subcategory, action: CuckooAction, props: ?CuckooProps) => {
    const { tracker, bid } = this.props;
    const enhancedProps = { ...(props || {}), bid };

    tracker.track(
      {
        category: "nitro",
        subcategory,
        action,
        destinations: { logmole: false, exponea: true, ga: false },
      },
      enhancedProps,
    );
  };

  render() {
    const { children } = this.props;

    return <Provider value={this}>{children}</Provider>;
  }
}

export default CuckooLogger;
