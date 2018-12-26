import { css } from "@emotion/core";
import React from "react";
import Head from "react-helmet-async";

import Button from "../components/Button";

const NotFound = ({ page }) => (
  <main>
    <Head>
      <title>{page.title}</title>
    </Head>

    <h1
      css={css({
        fontSize: "3rem",
        marginBottom: "1rem"
      })}
    >
      {page.title}
    </h1>
    <h2
      css={css({
        lineHeight: 1,
        marginBottom: "2rem"
      })}
    >
      The request page <strong>{page.path}</strong> does not exist.
    </h2>
    <Button to="/">Go Home</Button>
  </main>
);

export default NotFound;
