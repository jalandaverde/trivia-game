import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import Mousetrap from "mousetrap";

import Container from "./Container";

const colors = [
  "#3BB273",
  "#f44336",
  "#4D9DE0",
  "#7768AE",
  "#6D676E",
  "#b03060",
  "#deb887",
  "#ffd700",
  "#ffb6c1",
  "#ef6c00"
];

const Tile = styled(Container)`
  width: 24px;
  height: 24px;
  background-color: ${props => props.value};
  background-image: ${props =>
    props.selected
      ? ` repeating-linear-gradient(
    45deg,
    transparent,
    transparent 10px,
    #ccc 10px,
    #ccc 20px
  )`
      : "none"};
  margin: 8px;
  outline: none;
`;

const Root = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const ColorPicker = ({ className, onChange, name }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [focused, setFocus] = useState(false);
  useEffect(() => {
    onChange({ target: { name, value: colors[activeIndex] } });
  }, [activeIndex]);

  useEffect(() => {
    if (focused) {
      Mousetrap.bind("left", () =>
        setActiveIndex((activeIndex - 1 + colors.length) % colors.length)
      );
      Mousetrap.bind("right", () =>
        setActiveIndex((activeIndex + 1) % colors.length)
      );

      return () => {
        Mousetrap.unbind("right");
        Mousetrap.unbind("left");
      };
    }
  }, [focused, activeIndex]);

  return (
    <Root
      className={className}
      tabIndex={0}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
    >
      {colors.map((color, i) => (
        <Tile
          selected={i === activeIndex}
          value={color}
          onClick={() => setActiveIndex(i)}
        />
      ))}
    </Root>
  );
};

export default ColorPicker;
