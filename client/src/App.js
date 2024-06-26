import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import GetTodos from "./Components/GetTodos";

const errorLink = onError(({ graphqlErrors }) => {
  if (graphqlErrors) {
    const gqlErrors = graphqlErrors.map(({ message, location, path }) => {
      return (`Graphql error: ${message}`);
    });
    for (const error of gqlErrors) {
      console.log(error);
    }
  }
});

const link = from([
  errorLink,
  new HttpLink({ uri: "http://localhost:5000/graphql" }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <GetTodos />
    </ApolloProvider>
  );
}

export default App;
