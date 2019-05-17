// @flow
import * as React from "react";

import Popup from "./primitives/Popup";
import Header from "./primitives/Header";
import Content from "./primitives/Content";
import Footer from "./primitives/Footer";

type Props = {|
  header?: React.Node,
  footer?: React.Node,
  children: React.Node,
  padding?: boolean,
  width?: string,
  positionMenuTablet?: number,
  positionMenuDesktop?: number,
|};

const TripContainer = ({
  header,
  footer,
  children,
  padding,
  width,
  positionMenuTablet,
  positionMenuDesktop,
}: Props) => (
  <Popup
    positionMenuTablet={positionMenuTablet}
    positionMenuDesktop={positionMenuDesktop}
    width={width}
  >
    {header && <Header>{header}</Header>}
    <Content padding={padding}>{children}</Content>
    <Footer>{footer}</Footer>
  </Popup>
);

export default TripContainer;
