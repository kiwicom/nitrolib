// @flow strict
import styled from "styled-components";
import * as React from "react";
import PropTypes from "prop-types";

const Flex = styled(({ children, className, dataTest }) => (
  <div className={className} data-test={dataTest}>
    {children}
  </div>
))`
  display: flex;
  ${({ x, y, direction }) => x && `justify-content: ${direction === "column" ? y : x}`};
  ${({ x, y, direction }) => y && `align-items: ${direction === "column" ? x : y}`};
  ${({ direction }) => direction && `flex-direction: ${direction}`};
  ${({ wrap }) => wrap && `flex-wrap: ${wrap}`};
`;

// $FlowIssue
Flex.propTypes = {
  marginTop: PropTypes.number,
  marginBottom: PropTypes.number,
  x: PropTypes.oneOf([
    "flex-start",
    "flex-end",
    "center",
    "space-between",
    "space-around",
    "initial",
    "inherit",
  ]),
  y: PropTypes.oneOf([
    "stretch",
    "center",
    "flex-start",
    "flex-end",
    "baseline",
    "initial",
    "inherit",
  ]),
  direction: PropTypes.oneOf([
    "row",
    "row-reverse",
    "column",
    "column-reverse",
    "initial",
    "inherit",
  ]),
  wrap: PropTypes.oneOf(["nowrap", "wrap", "wrap-reverse"]),
};

Flex.defaultProps = {
  x: "flex-start",
  y: "flex-start",
  direction: "row",
  wrap: "nowrap",
};

export default Flex;
