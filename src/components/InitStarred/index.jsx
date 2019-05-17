// @flow strict
import * as React from "react";
import * as R from "ramda";

import { load, remove, save } from "../../services/session/local";
import type { StarredItem } from "../../records/Starred";
import { STARRED_ID } from "../../consts/local";

type State = {|
  starred: { [key: string]: StarredItem },
|};

type Args = {|
  list: StarredItem[],
  onRemove: (arg: string, e: SyntheticEvent<HTMLDivElement>) => void,
  onAdd: (arg: StarredItem) => void,
  onClear: (e: SyntheticEvent<HTMLDivElement>) => void,
|};

type Props = {|
  children: (args: Args) => React.Node,
|};

class StarredProvider extends React.Component<Props, State> {
  state = {
    starred: JSON.parse(JSON.stringify(load(STARRED_ID))),
  };

  onAdd = (trip: StarredItem) => {
    const { starred } = this.state;

    this.setState({
      starred: R.assoc(String(trip.id), trip, starred),
    });

    save(STARRED_ID, JSON.stringify({ starred }));
  };

  onClear = (e: SyntheticEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();

    remove(STARRED_ID);

    this.setState({
      starred: {},
    });
  };

  onRemove = (key: string, e: SyntheticEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();

    const { starred } = this.state;

    this.setState({
      starred: R.filter(item => item.id !== key, starred),
    });

    save(STARRED_ID, JSON.stringify(R.filter(item => item.id !== key, starred)));
  };

  render() {
    const { children } = this.props;
    const { starred } = this.state;

    return children({
      list: R.values(starred),
      onRemove: this.onRemove,
      onAdd: this.onAdd,
      onClear: this.onClear,
    });
  }
}

export default StarredProvider;
