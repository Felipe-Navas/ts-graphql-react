import * as React from 'react';
import { render } from 'react-dom';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/react-hooks';

import App from './App';

const client = new ApolloClient({
  uri: 'https://tyoku.sse.codesandbox.io/graphql',
  cache: new InMemoryCache(),
});

const rootElement = document.getElementById('root');
render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  rootElement
);
