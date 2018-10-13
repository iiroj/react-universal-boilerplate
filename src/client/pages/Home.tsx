import { css } from "emotion";
import React from "react";
import Head from "react-helmet";

import { Route } from "../routes";
import Button from "../components/Button";

const title = css({
  fontSize: "3rem",
  lineHeight: 1,
  marginBottom: "2rem"
});

type Home = {
  page: Route;
};

export default ({ page }: Home) => (
  <>
    <Head>
      <title>{page.title}</title>
    </Head>
    <main>
      <h1 className={title}>{page.title}</h1>
      <Button
        href="https://gitlab.com/iiroj/react-universal-boilerplate"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitLab
      </Button>
      <Button to="/404">See 404 page</Button>
    </main>
  </>
);
