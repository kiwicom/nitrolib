import * as React from "react";

import { StarredItem, ShareDialog } from "../../records/Starred";

export type Context = {
  list: StarredItem[],
  isMobile: boolean,
  lang: string,
  onAdd: (arg: StarredItem) => void,
  onGoToStarred: (arg: StarredItem) => void,
  onRemove: (id: string, e: SyntheticEvent<HTMLDivElement>) => void,
  onClear: (e: SyntheticEvent<HTMLDivElement>) => void,
  onSetNotice: () => void,
  renderShareDialog: (arg: ShareDialog) => React.ReactNode,
  makeShareUrl: (arg: StarredItem) => string,
};

  const contextDefault: Context = {
    list: [],
    isMobile: false,
    lang: "en",
    onAdd: () => { },
    onGoToStarred: () => { },
    onRemove: () => { },
    onClear: () => { },
    onSetNotice: () => { },
    renderShareDialog: () => null,
    makeShareUrl: () => "some string",
  };

  const context: React.Context<Context> = React.createContext(contextDefault);

export const { Consumer, Provider } = context;
