import React from "react";
import styled from "@emotion/styled";

const Root = styled.div`
  font-size: 8px;
  width: ${props => props.width || "72px"}
`;

const Badge = ({ children, variant, width }) => {
  return (
    <Root className="nes-badge" width={width}>
      <span className={`is-${variant}`}>{children}</span>
    </Root>
  );
};

export default Badge;
