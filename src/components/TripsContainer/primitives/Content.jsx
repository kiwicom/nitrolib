// @flow
import styled from "styled-components";

type Padding = {|
  padding?: boolean,
|};

const Content = styled.div`
  padding: ${({ padding }: Padding) => (padding ? `12px` : `0`)};
`;

export default Content;
