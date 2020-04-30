import React, { useState, useMemo } from "react";
import { useQuery } from "@apollo/react-hooks";
import { useParams } from "react-router";
import gql from "graphql-tag";
import get from "lodash/get";
import shuffle from "lodash/shuffle";
import styled from "@emotion/styled";
import ent from "ent";
import { useHistory } from "react-router-dom";

import Button from "./common/Button";
import Container, { Title } from "./common/Container";
import Timer from "./Timer";
import Badge from "./common/Badge";

const GET = gql`
  query listQuestions {
    questions(
      amount: $amount
      category: $category
      type: $type
      difficulty: $difficulty
      token: $token
    ) @rest(type: "[Question]", path: "/api.php?{args}") {
      type
      category
      question
      difficulty
      correct_answer
      incorrect_answers
    }
  }
`;

const Root = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  & .timer {
    position: absolute;
    top: 16px;
    left: 50%;
    transform: translate(-50%, 0);
  }
`;

const QuestionCard = styled(Container)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  && .title {
    font-size: 16pt;
  }
  min-width: 600px;
  max-width: 750px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 32px;

  & button:last-child {
    margin-left: 16px;
  }
`;

const Choices = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 16px 0;
  grid-gap: 16px;
  visibility: ${(props) => props.visibility};
`;

const Text = styled.div`
  margin-top: 16px;
`

const mergeQuestions = (prev, { fetchMoreResult }) => {
  if (!prev) {
    return fetchMoreResult;
  } else if (fetchMoreResult) {
    return {
      ...prev,
      questions: [...fetchMoreResult.questions, ...prev.questions],
    };
  } else {
    return prev;
  }
};

const labels = {
  boolean: "true/false",
  multiple: "multiple choice",
};

const Question = ({ difficulty, type, token }) => {
  const { category } = useParams();
  const variables = { amount: 1, category, difficulty, type, token };
  const { data, loading } = useQuery(GET, {
    variables,
    fetchPolicy: "network-only",
    fetchMoreResult: mergeQuestions,
  });
  const [state, setState] = useState("question");
  const [choicesVisibility, setChoicesVisibility] = useState("hidden");
  const question = get(data, "questions.0.question", "");
  const answer = get(data, "questions.0.correct_answer", "");
  const incorrectAnswers = get(data, "questions.0.incorrect_answers", []);

  const choices = useMemo(() => shuffle([...incorrectAnswers, answer]), [
    answer,
  ]);

  const history = useHistory();

  return loading ? null : (
    <Root>
      <Timer value={120} className="timer" />
      <QuestionCard>
        {state === "question" ? (
          <>
            <Title> Question </Title>
            <Badge variant="dark" width="175px">{labels[type]}</Badge>
            <Badge variant="warning">{difficulty}</Badge>
            <Text>{ent.decode(question)}</Text>

            <Choices visibility={choicesVisibility}>
              {choices.map((choice, index) => (
                <div key={(10 + index).toString(36)}>{`${(10 + index).toString(
                  36
                )}) ${ent.decode(choice)}`}</div>
              ))}
            </Choices>
            <ButtonGroup>
              <Button
                onClick={() =>
                  choicesVisibility === "hidden"
                    ? setChoicesVisibility("visible")
                    : setChoicesVisibility("hidden")
                }
              >
                {choicesVisibility === "hidden"
                  ? "Show options"
                  : "Hide options"}
              </Button>
              <Button variant="success" onClick={() => setState("answer")}>
                View answer
              </Button>
            </ButtonGroup>
          </>
        ) : (
          <>
            <Title> Answer </Title>
            {ent.decode(answer)}
            <ButtonGroup>
              <Button onClick={() => setState("question")}>Back</Button>
              <Button variant="primary" onClick={() => history.goBack()}>
                Next Turn
              </Button>
            </ButtonGroup>
          </>
        )}
      </QuestionCard>
    </Root>
  );
};

export default Question;
