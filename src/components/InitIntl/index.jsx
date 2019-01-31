// @flow strict
import * as React from "react";
import * as R from "ramda";
import enUS from "date-fns/locale/en-US"; // fallback

import type { IntlRaw } from "../../records/Intl";
import type { Context } from "../../services/intl/context";
import translate from "../../services/intl/translate";
import type { Values } from "../../services/intl/translate";

type Props = {|
  raw: IntlRaw,
  children: (arg: Context) => React.Node,
  // defaulted
  getLocale: Promise<$FlowFixMe>,
|};

type State = {|
  debug: boolean,
|};

export default class InitIntl extends React.PureComponent<Props, State> {
  static defaultProps = {
    getLocale: Promise.resolve(enUS),
  };

  state = {
    debug: false,
  };

  handleDebug = () => {
    this.setState(state => ({ debug: !state.debug }));
  };

  render() {
    const { raw, getLocale, children } = this.props;
    const { debug } = this.state;

    const t = (key: string, values?: Values) => translate(raw.translations, key, values);

    return children({
      language: raw.language,
      translations: raw.translations,
      translate: debug ? R.identity : t,
      getLocale,
      onDebug: this.handleDebug,
    });
  }
}
