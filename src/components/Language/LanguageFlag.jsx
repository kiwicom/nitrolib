// @flow strict
import styled from "styled-components";
import PropTypes from "prop-types";

import config from "consts/config";

type Props = {
  flagId: string,
  scale: number,
};

const LanguageFlag = styled.i`
  background: ${({ flagId }: Props) => `url("${config.imagesUrl}flags/32x32/${flagId}.png")`};
  height: 32px;
  width: 32px;
  display: block;
  transform: ${({ scale }: Props) => `scale(${scale})`};
`;

// $FlowIssue
LanguageFlag.propTypes = {
  flagId: PropTypes.string.isRequired,
};

LanguageFlag.defaultProps = {
  scale: 1,
};

export default LanguageFlag;
