import * as React from "react";
import enUS from "date-fns/locale/en-US"; // fallback

type Props = {
  children: (locale: $FlowFixMe) => React.ReactNode,
    getLocale: Promise < $FlowFixMe >,
};

type State = {
  locale: $FlowFixMe | null,
};

export default class DateFnsLocale extends React.PureComponent<Props, State> {
  state = {
    locale: null,
  };

  componentDidMount() {
    const { getLocale } = this.props;

    getLocale
      .then(locale => {
        this.setState({ locale });
      })
      .catch(() => {
        this.setState({ locale: enUS });
      });
  }

  render() {
    const { children } = this.props;
    const { locale } = this.state;

    if (!locale) {
      return null;
    }

    return children(locale);
  }
}
