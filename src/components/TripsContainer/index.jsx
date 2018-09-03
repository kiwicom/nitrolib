// @flow
import * as React from "react";

import Popup from "./primitives/Popup";
import Header from "./primitives/Header";
import Content from "./primitives/Content";

type Props = {|
  header?: React.Node,
  children: React.Node,
  padding?: boolean,
  width?: string,
|};

const TripContainer = ({ header, children, padding, width }: Props) => (
  <Popup width={width}>
    <Header>{header}</Header>
    <Content padding={padding}>{children}</Content>
  </Popup>
);

export default TripContainer;
