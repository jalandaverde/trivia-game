import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import styled from "@emotion/styled";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Container, { Title } from "./common/Container";
import Button from "./common/Button";
import Player from "./Player";
import Dialog from "./common/Dialog";
import PlayerForm from "./PlayerForm";
import Categories from "./Catergories";
import Question from "./Question";

import useSessionStorage from "./common/useSessionStorage";
import Settings from "./Settings";

const Root = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const Content = styled.div`
  flex: 1;
  height: 100%;
  position: relative;
`;

const Sidebar = styled.div`
  width: 400px;
  padding: 16px;
  heigh: 100%;
  display: flex;
  padding: 16px;
  flex-direction: column;

  & button {
    margin: 16px 0;
  }
`;

const Players = styled(Container)`
  flex: 1;
`;

const ADD_PLAYER = gql`
  mutation AddPlayer($id: Int!) {
    addPlayer(id: $id, name: $name, color: $color) @client
  }
`;

const Game = () => {
  const [selectedPlayer, selectPlayer] = useState([]);
  const [dialogId, setDialogId] = useState(null);
  const [players = [], setPlayers] = useSessionStorage("players", []);
  const [settings, setSettings] = useSessionStorage("settings", {
    difficulty: "easy",
    type: "multiple",
  });

  // const [addPlayer] = useMutation(ADD_PLAYER);

  return (
    <Root>
      <Sidebar>
        <Players centered>
          <Title>Players</Title>
          {players.map((player) => (
            <Player
              key={player.name}
              {...player}
              selected={selectedPlayer === player}
              onClick={() => selectPlayer(player)}
            />
          ))}
          <Button onClick={() => setDialogId("add-player")}>Add Player</Button>
        </Players>
        <Button variant="warning">Reset</Button>
        <Button variant="primary" onClick={() => setDialogId("show-settings")}>
          Settings
        </Button>
      </Sidebar>
      <Content>
        <Switch>
          <Route path="/" exact component={Categories} />
          <Route
            path="/question/:category"
            render={() => <Question {...settings} />}
          />
        </Switch>
      </Content>
      <Dialog isOpen={dialogId === "add-player"}>
        <PlayerForm
          onCancel={() => setDialogId(null)}
          onSubmit={(values) => {
            setPlayers([...players, values]);
            setDialogId(null);
            // addPlayer({ variables: values });
          }}
        />
      </Dialog>
      <Dialog isOpen={dialogId === "show-settings"}>
        <Settings
          values={settings}
          onCancel={() => setDialogId(null)}
          onSave={(values) => {
            setSettings(values);
            setDialogId(null);
          }}
        />
      </Dialog>
    </Root>
  );
};

export default Game;
