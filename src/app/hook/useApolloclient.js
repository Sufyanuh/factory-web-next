// lib/apolloClient.js
import { useMemo } from "react";
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import secureStorage from "react-secure-storage";
import { getMainDefinition } from "apollo-utilities";
import { split } from "apollo-link";
import { setContext } from "@apollo/client/link/context";

let apolloClient;

function createApolloClient() {
  const httpLink = createHttpLink({
    uri: "https://factolabs.app/graphql",
    credentials: "omit",
  });

  const wsLink = new WebSocketLink({
    uri: "wss://factolabs.app/graphql",
    options: {
      reconnect: true,
    },
  });

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    httpLink
  );

  const authLink = setContext((_, { headers }) => {
    const token = secureStorage.getItem("token");
    // console.log("token", token);
    let authorization = "";
    if (token) authorization = `Bearer ${token}`;
    return {
      headers: {
        ...headers,
        authorization,
        Cookie: null,
      },
    };
  });

  return new ApolloClient({
    ssrMode: typeof window === "undefined", // set to true for SSR
    link: authLink.concat(splitLink),
    cache: new InMemoryCache(),
    connectToDevTools: true,
  });
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client,
  // the initial state gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Restore the cache using the data passed from
    // getStaticProps/getServerSideProps combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;

  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
