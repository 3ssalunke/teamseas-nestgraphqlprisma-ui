import * as React from "react";
import ReactDOM from "react-dom";
import {
  createClient,
  defaultExchanges,
  Provider,
  subscriptionExchange,
} from "urql";
import { createClient as createWsClient } from "graphql-ws";

import { App } from "./App";

const wsClient = createWsClient({
  url: "ws://localhost:3001/graphql",
});

const graphqlClient = createClient({
  url: "http://localhost:3001/graphql",
  exchanges: [
    ...defaultExchanges,
    subscriptionExchange({
      forwardSubscription: (operation) => ({
        subscribe: (sink: any) => ({
          unsubscribe: wsClient.subscribe(operation, sink),
        }),
      }),
    }),
  ],
});

ReactDOM.render(
  <React.StrictMode>
    <Provider value={graphqlClient}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
