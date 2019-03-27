// @flow strict
import * as React from "react";
import addons, { types } from "@storybook/addons";
import { TooltipLinkList } from "@storybook/components";
import { FORCE_RE_RENDER } from "@storybook/core-events";

import themes from "../allThemes";
import type { ThemeNames } from "../records/Theme";

const ADDON_ID = "NitroThemes";
const STORAGE = "theme";

type Props = {|
  api: any,
|};

type Args = {|
  api: any,
  set: ThemeNames,
  rerender: boolean,
|};

type Link = {|
  id: ThemeNames,
  title: ThemeNames,
  onClick: () => void,
|};

const setTheme = ({ api, set, rerender }: Args) => {
  window.localStorage.setItem(STORAGE, set);

  api.setOptions({
    theme: themes[set],
  });

  if (rerender) {
    addons.getChannel().emit(FORCE_RE_RENDER);
  }
};

const ThemeSwitcher = ({ api }: Props) => {
  const links: Array<Link> = Object.keys(themes).map(i => ({
    id: i,
    title: i,
    onClick: () => {
      setTheme({ api, set: i, rerender: true });
    },
  }));

  return <TooltipLinkList links={links} />;
};

addons.register(ADDON_ID, api => {
  addons.add(ADDON_ID, {
    type: types.PANEL,
    title: "themes",
    match: ({ viewMode }) => viewMode === "story",
    render: () => <ThemeSwitcher api={api} />,
  });
});
