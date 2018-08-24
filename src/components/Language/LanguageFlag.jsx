// @flow strict
import styled from "styled-components";
import PropTypes from "prop-types";

import config from "../../consts/config";

type Props = {
  flagId: string,
  scale: number,
};

const LanguageFlag = styled.i`
  background: ${({ flagId }: Props) => `url("${config.imagesUrl}flags/24x0/flag-${flagId}.jpg")`};
  height: 13px;
  border-radius: 2px;
  width: 24px;
  margin-right: 8px;
  xdisplay: block;
`;

// $FlowIssue
LanguageFlag.propTypes = {
  flagId: PropTypes.string.isRequired,
};

LanguageFlag.defaultProps = {
  scale: 1,
};

export default LanguageFlag;
