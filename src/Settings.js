import React, { useState } from "react";
import styled from "@emotion/styled";

import Button from "./common/Button";
import Container, { Title } from "./common/Container";
import RadioGroup from "./common/RadioGroup";

const Root = styled.div`
  width: 600px;
  & > * {
    margin: 32px 0;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  & > button:last-child {
    margin-left: 16px;
  }
`;

const Settings = ({ onCancel, onSave, values}) => {
  const [difficulty, setDifficulty] = useState(values.difficulty);
  const [type, setType] = useState(values.type);
  return (
    <Root>
      <Container>
        <Title>Difficulty</Title>
        <RadioGroup
          name="difficulty"
          onChange={e => setDifficulty(e.target.value)}
          value={difficulty}
          options={[
            { label: "Easy", value: "easy" },
            { label: "Medium", value: "medium" },
            { label: "Hard", value: "hard" }
          ]}
        />
      </Container>

      <Container>
        <Title>Question Type</Title>
        <RadioGroup
          name="type"
          onChange={e => setType(e.target.value)}
          value={type}
          options={[
            { label: "True/False", value: "boolean" },
            { label: "Multiple Choice", value: "multiple" }
          ]}
        />
      </Container>

      <ButtonGroup>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={() => onSave({ type, difficulty })}>Save</Button>
      </ButtonGroup>
    </Root>
  );
};

export default Settings;
