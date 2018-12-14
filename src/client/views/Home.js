// @jsx jsx

import { css, jsx } from "@emotion/core";
import React from "react";
import Head from "react-helmet-async";

import Button from "../components/Button";

const buttonContainer = css({
  "* + *": {
    marginLeft: "1rem"
  }
});

const Home = ({ page }) => (
  <main>
    <Head>
      <title>{page.title}</title>
    </Head>

    <h1
      css={css({
        fontSize: "3rem",
        lineHeight: 1,
        marginBottom: "2rem"
      })}
    >
      {page.title}
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
