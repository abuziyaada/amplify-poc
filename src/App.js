import logo from "./logo.svg";
import "./App.css";
import { API, graphqlOperation } from "aws-amplify";
import { listPosts } from "./graphql/queries";
import { createBlog } from "./graphql/mutations";
import { useEffect, useState } from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import SurahList from "./components/surah-list";
import { Typography, Box } from "@mui/material";

function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <Box
            sx={{
              px: "20px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <h1>Surah List</h1>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography sx={{ fontWeight: "bold", mr: "10px" }}>
                Assalamu Alaikum!{" "}
              </Typography>
              <button onClick={signOut}>Sign out</button>
            </Box>
          </Box>
          <SurahList />
        </main>
      )}
    </Authenticator>
  );
}
export default App;
