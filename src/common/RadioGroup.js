import React from "react";
import styled from "@emotion/styled";

const Root = styled.div`
  display: flex;
  justify-content: space-between;
`;

const RadioGroup = ({ options, name, value, onChange }) => {
  return (
    <Root>
      {options.map(option => (
        <label key={option.value}>
          <input
            type="radio"
            class="nes-radio"
            name={name}
            value={option.value}
            checked={option.value === value}
            onChange={onChange}
          />
          <span>{option.label}</span>
        </label>
      ))}
    </Root>
  );
};

export default RadioGroup;
