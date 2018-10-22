// @flow strict
import * as React from "react";
import querystring from "querystring";

type Props = {|
  query?: string,
  onMount: (query: { [key: string]: string }) => void,
|};

export default class Query extends React.Component<Props> {
  componentDidMount() {
    const { query, onMount } = this.props;

    const search = query || window.location.search;
    onMount(querystring.parse(search.replace(/^\?/, "")));
  }

  render() {
    return null;
  }
}
