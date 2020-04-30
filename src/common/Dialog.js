import React, { useEffect } from "react";
import styled from "@emotion/styled";

import Container from "./Container";

const Overlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled(Container)`
  background: white;
  min-width: 400px;
  min-height: 200px;
`;

const noop = () => undefined;
const Dialog = ({ children, isOpen, onClose = noop, onOpen = noop }) => {
  useEffect(() => {
    onOpen();
    return () => onClose();
  }, []);
  return isOpen ? (
    <Overlay>
      <Content>{children}</Content>
    </Overlay>
  ) : null;
};

export default Dialog;
