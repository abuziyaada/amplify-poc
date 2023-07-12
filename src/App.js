import logo from "./logo.svg";
import "./App.css";
import { API, graphqlOperation } from "aws-amplify";
import { listPosts } from "./graphql/queries";
import { createBlog } from "./graphql/mutations";
import { useEffect, useState } from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import SurahList from "./components/surah-list";

function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <h1>Bismillah</h1>
          <SurahList />
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
  );
}
export default App;
