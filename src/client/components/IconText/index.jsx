// @flow strict
import * as React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  display: flex;
  height: 100%;
  align-items: center;

  .icon {
    padding-right: 4px;
    height: 22px;
    width: 22px;
  }
`;

const Text = styled.span`
  font-size: 14px;
  height: 24px;
  line-height: 24px;
`;

type Props = {|
  Icon: React.ComponentType<{ className: string }>,
  children: React.Node,
|};

const IconText = ({ Icon, children }: Props) => (
  <Container>
    <Icon className="icon" />
    <Text>{children}</Text>
  </Container>
);

export default IconText;
