// @flow strict
import styled from "styled-components";

const Flex = styled.div`
  display: flex;
  ${({ x, y, direction }) => x && `justify-content: ${direction === "column" ? y : x}`};
  ${({ x, y, direction }) => y && `align-items: ${direction === "column" ? x : y}`};
  ${({ direction }) => direction && `flex-direction: ${direction}`};
  ${({ wrap }) => wrap && `flex-wrap: ${wrap}`};
`;

Flex.defaultProps = {
  x: "flex-start",
  y: "flex-start",
  direction: "row",
  wrap: "nowrap",
};

export default Flex;
