import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import * as SecureStore from "expo-secure-store";

const httpLink = createHttpLink({
  //   uri: "https://server.cliffordwilliam.tech/",
  // uri: process.env.EXPO_PUBLIC_SERVER_URL,
  uri: "https://fr04vx71-3000.asse.devtunnels.ms/",
});
// add token to header
const authLink = setContext(async (_, { headers }) => {
  const token = await SecureStore.getItemAsync("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});
//  httpLink + authLink = client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
