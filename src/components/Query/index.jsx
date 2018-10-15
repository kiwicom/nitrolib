// @flow strict
import * as React from "react";
import querystring from "querystring";

type Props = {|
  onMount: (query: { [key: string]: string }) => void,
|};

export default class Query extends React.Component<Props> {
  componentDidMount() {
    const { onMount } = this.props;

    onMount(querystring.parse(window.location.search));
  }

  render() {
    return null;
  }
}
