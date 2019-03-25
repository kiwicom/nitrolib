// @flow
import * as React from "react";

import { load, remove, save } from "../../services/session/storage";
import type { StarredItem } from "../../records/Starred";

type State = {|
  starred: Array<StarredItem>,
|};

type Args = {|
  starredList: Array<StarredItem>,
  onRemoveStarred: (arg: number, e: SyntheticMouseEvent<HTMLDivElement>) => void,
  onAddStarred: (arg: StarredItem) => void,
  lang: string,
  onClearStarred: (e: SyntheticMouseEvent<HTMLDivElement>) => void,
|};
type Props = {|
  children: (args: Args) => React.Node,
|};

// TODO: refactor to local storage service
class StarredProvider extends React.Component<Props, State> {
  state = {
    starred: load("starred") ? JSON.parse(load("starred")) : [],
  };

  onAdd = (trip: StarredItem) => {
    const { starred } = this.state;
    this.setState({
      starred: starred.concat(trip),
    });
  };

  onClear = (e: SyntheticMouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();

    remove("starred");
    this.setState({
      starred: [],
    });
  };

  onRemove = (index: number, e: SyntheticMouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();

    const { starred } = this.state;
    const storage = load("starred");

    this.setState({
      starred: starred.filter((_, i) => i !== index),
    });

    const removeItem = storage.slice(0, index - 1).concat(storage.slice(index, storage.length));
    save("starred", JSON.stringify(removeItem));
  };

  render() {
    const { children } = this.props;
    const { starred } = this.state;

    return children({
      starredList: starred,
      onRemoveStarred: this.onRemove,
      lang: "en",
      onAddStarred: this.onAdd,
      onClearStarred: this.onClear,
    });
  }
}

export default StarredProvider;
