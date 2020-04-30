import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Mousetrap from "mousetrap";
import Container from "./common/Container";

const Avatar = styled(Container)`
  background: blue;
  background-color: ${props => props.color || "black"};
  padding: 0.25em 0.75em;
`;

const Root = styled.div`
  display: flex;
  align-items: center;
  padding: 4px;
  background: ${props => (props.selected ? "black" : "none")};
  color: ${props => (props.selected ? "white" : "black")};
`;

const Name = styled.p`
  flex: 1;
  font-size: 10pt;
  text-align: left;
  margin-left: 8px;
  margin-bottom: 0;
`;

const Player = ({ className, name, color, onClick, selected }) => {
  const [score, setScore] = useState(0);
  useEffect(() => {
    if (selected) {
      Mousetrap.bind("right", () => setScore(score + 1));
      Mousetrap.bind("left", () => setScore(score - 1));
    }
    return () => {
      if (!selected) {
        Mousetrap.unbind("right");
        Mousetrap.unbind("left");
      }
    };
  }, [selected, score]);
  return (
    <Root className={className} selected={selected} onClick={onClick}>
      <Avatar color={color}>{score}</Avatar>
      <Name>{name}</Name>
    </Root>
  );
};

export default Player;
