import { css } from "emotion";
import React from "react";
import Head from "react-helmet-async";

import Button from "../components/Button";

const h1 = css({
  fontSize: "3rem",
  marginBottom: "1rem"
});

const h2 = css({
  lineHeight: 1,
  marginBottom: "2rem"
});

export default ({ page }) => (
  <>
    <Head>
      <title>{page.title}</title>
    </Head>
    <main>
      <h1 className={h1}>Not Found</h1>
      <h2 className={h2}>
        The request page <strong>{page.path}</strong> does not exist.
      </h2>
      <Button to="/">Go Home</Button>
    </main>
  </>
);
