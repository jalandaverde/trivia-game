import React, { useState } from "react";
import styled from "@emotion/styled";

import Input from "./common/Input";
import ColorPicker from "./common/ColorPicker";
import Button from "./common/Button";

const Form = styled.form`
  width: 450px;
  display: flex;
  flex-direction: column;

  & .with-bottom-margin {
    margin-bottom: 16px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  
  & > button {
    margin-left: 8px;
  }
`;

const PlayerForm = ({ onCancel, onSubmit }) => {
  const [values, setValue] = useState({});
  const updateValue = (ev) => {
    const { name, value } = ev.target;
    setValue({ ...values, [name]: value });
  };

  return (
    <Form
      onSubmit={(ev) => {
        ev.preventDefault();
        onSubmit(values);
      }}
    >
      <Input
        className="with-bottom-margin"
        name="name"
        maxLength={10}
        onChange={updateValue}
        autoFocus
      />
      <ColorPicker
        className="with-bottom-margin"
        onChange={updateValue}
        name="color"
      />
      <ButtonGroup>
        <Button onClick={onCancel}>Cancel</Button>
        <Button type="submit">Add Player</Button>
      </ButtonGroup>
    </Form>
  );
};

export default PlayerForm;
