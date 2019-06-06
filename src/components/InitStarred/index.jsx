// @flow strict
import * as React from "react";

import { load, remove, save } from "../../services/session/local";
import type { StarredItem } from "../../records/Starred";
import { STARRED } from "../../consts/local";

type State = {|
  starred: StarredItem[],
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

const EMPTY: StarredItem[] = [];

class StarredProvider extends React.Component<Props, State> {
  state = {
    starred: EMPTY,
  };

  componentDidMount() {
    // FIXME why the fuck is 'JSON.strigify' here
    this.setState({ starred: JSON.parse(JSON.stringify(load(STARRED))) });
  }

  onAdd = (trip: StarredItem) => {
    const { starred } = this.state;

    const starredNew = starred.concat(trip);

    this.setState({ starred: starredNew });
    save(STARRED, JSON.stringify({ starred: starredNew }));
  };

  onClear = (e: SyntheticEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();

    remove(STARRED);

    this.setState({ starred: EMPTY });
  };

  onRemove = (key: string, e: SyntheticEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();

    const { starred } = this.state;

    const starredNew = starred.filter(item => item.id !== key);

    this.setState({ starred: starredNew });
    save(STARRED, JSON.stringify(starredNew));
  };

  render() {
    const { children } = this.props;
    const { starred } = this.state;

    return children({
      list: starred,
      onRemove: this.onRemove,
      onAdd: this.onAdd,
      onClear: this.onClear,
    });
  }
}

export default StarredProvider;
