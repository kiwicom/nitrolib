// @flow
import * as React from "react";

import { getItem } from "../../services/utils/storage";
import type { StarredItem } from "../../records/Starred";

type State = {|
  starred: Array<StarredItem>,
|};

type Args = {|
  starred: Array<StarredItem>,
  onRemoveStarred: (arg: number, e: SyntheticMouseEvent<HTMLDivElement>) => void,
  onAddStarred: (arg: StarredItem) => void,
  onClearStarred: (e: SyntheticMouseEvent<HTMLDivElement>) => void,
|};

type Props = {|
  children: (args: Args) => React.Node,
|};

class StarredProvider extends React.Component<Props, State> {
  state = {
    starred: JSON.parse(getItem("starred")),
  };

  onAddStarred = (trip: StarredItem) => {
    const { starred } = this.state;
    this.setState({
      starred: starred.concat(trip),
    });
  };

  onClearStarred = (e: SyntheticMouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();

    localStorage.removeItem("starred");
    this.setState({
      starred: [],
    });
  };

  onRemoveStarred = (index: number, e: SyntheticMouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();

    const { starred } = this.state;
    const storage = getItem("starred");

    this.setState({
      starred: starred.filter((_, i) => i !== index),
    });

    const removeItem = storage.slice(0, index - 1).concat(storage.slice(index, storage.length));
    localStorage.setItem("starred", JSON.stringify(removeItem));
  };

  render() {
    const { children } = this.props;
    const { starred } = this.state;

    return children({
      starred,
      onRemoveStarred: this.onRemoveStarred,
      onAddStarred: this.onAddStarred,
      onClearStarred: this.onClearStarred,
    });
  }
}

export default StarredProvider;
