import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { RestLink } from "apollo-link-rest";
import { BrowserRouter } from "react-router-dom";
import { v4 as uuid } from "uuid";
import GA from "react-ga";
import "nes.css/css/nes.min.css";

import Game from "./Game";
import typeDefs from "./schema";
// import addPlayer from './mutations/addPlayer';
// import updateSettings from './mutations/updateSettings';

// setup your `RestLink` with your endpoint
const link = new RestLink({
  uri: "https://opentdb.com",
  async responseTransformer(response) {
    const { results } = await response.json();
    return results;
  },
});

const cache = new InMemoryCache({
  dataIdFromObject: (object) => `${object.__typename}:${uuid()}`,
});

// setup your client
const client = new ApolloClient({
  link,
  cache,
  connectToDevTools: true,
  typeDefs,
  // resolvers: {
  //   Mutation: {
  //     addPlayer,
  //     updateSettings
  //   }
  // }
});

const Root = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const App = () => {
  useEffect(() => {
    GA.pageview("/");
  }, []);

  console.log("PATH", process.env.PUBLIC_URL)
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <ApolloProvider client={client}>
        <Root>
          <Game />
        </Root>
      </ApolloProvider>
    </BrowserRouter>
  );
};

export default App;
