// @flow strict
import styled from "styled-components";
import PropTypes from "prop-types";

const Flex = styled.div`
  display: flex;
  ${props => props.x && `justify-content: ${props.direction === "column" ? props.y : props.x}`};
  ${props => props.y && `align-items: ${props.direction === "column" ? props.x : props.y}`};
  ${props => props.direction && `flex-direction: ${props.direction}`};
  ${props => props.wrap && `flex-wrap: ${props.wrap}`};
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
