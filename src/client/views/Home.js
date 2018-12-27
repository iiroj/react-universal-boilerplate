import { css } from "@emotion/core";
import Head from "react-helmet-async";
import React from "react";

import Button from "../components/Button";

const buttonContainer = css({
  "* + *": {
    marginLeft: "1rem"
  }
});

const Home = () => (
  <main>
    <Head>
      <title>React Universal Boilerplate</title>
    </Head>

    <h1
      css={css({
        fontSize: "3rem",
        lineHeight: 1,
        marginBottom: "2rem"
      })}
    >
      React Universal Boilerplate
    </h1>
    <div css={buttonContainer}>
      <Button
        href="https://gitlab.com/iiroj/react-static-boilerplate"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitLab
      </Button>
      <Button to="/404">See 404 page</Button>
    </div>
  </main>
);

export default Home;
