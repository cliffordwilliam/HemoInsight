import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import * as SecureStore from "expo-secure-store";
const httpLink = createHttpLink({
    //   uri: "https://server.cliffordwilliam.tech/",
    uri: process.env.EXPO_PUBLIC_SERVER_URL, // TODO: move this to .env? Or change each time?
});
// add token to header
const authLink = setContext(async (_, { headers }) => {
    const token = await SecureStore.getItemAsync("token");
    console.log(token, "ini dari apollo");
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
    defaultOptions: {
        query: {
            fetchPolicy: "no-cache",
            errorPolicy: "all",
        },
    },
});

export default client;
