// @flow strict
import * as React from "react";
import addons, { types } from "@storybook/addons";
import { TabButton, WithTooltip, TooltipLinkList } from "@storybook/components";
import { FORCE_RE_RENDER } from "@storybook/core-events";

import themes from "../allThemes";
import type { ThemeNames } from "../records/Theme";

const ADDON_ID = "NitroThemes";
const STORAGE = "theme";

type Props = {|
  api: any,
|};
type State = {|
  active: boolean,
  theme: ThemeNames,
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

class ThemeSwitcher extends React.Component<Props, State> {
  state = { theme: "default", active: false };

  componentDidMount() {
    const stored = window.localStorage.getItem(STORAGE);

    this.setState({
      theme: window.localStorage.getItem(STORAGE) !== null ? stored : "default",
    });
  }

  handleActive = () => {
    this.setState({
      // eslint-disable-next-line
      active: !this.state.active,
    });
  };

  handleTheme = (theme: ThemeNames) => {
    this.setState({
      theme,
    });
  };

  setTheme = ({ api, set, rerender }: Args) => {
    window.localStorage.setItem(STORAGE, set);

    api.setOptions({
      theme: themes[set],
    });

    if (rerender) {
      addons.getChannel().emit(FORCE_RE_RENDER);
    }
  };

  render() {
    const { theme, active } = this.state;
    const { api } = this.props;

    const links: Array<Link> = Object.keys(themes).map(i => ({
      id: i,
      title: i,
      onClick: () => {
        this.handleTheme(i);
        this.setTheme({ api, set: i, rerender: true });
      },
    }));

    return (
      <WithTooltip
        placement="top"
        trigger="click"
        tooltipShown={active}
        onVisibilityChange={this.handleActive}
        tooltip={<TooltipLinkList links={links} />}
        closeOnClick
      >
        <TabButton>{theme}</TabButton>
      </WithTooltip>
    );
  }
}

addons.register(ADDON_ID, api => {
  addons.add(ADDON_ID, {
    type: types.TOOL,
    title: "themes",
    match: ({ viewMode }) => viewMode === "story",
    render: () => <ThemeSwitcher api={api} />,
  });
});
