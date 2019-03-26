import { css } from "@emotion/core";
import { Helmet } from "react-helmet-async";
import { withRouter } from "react-router";
import React from "react";

import Button from "../components/Button";

const NotFound = ({ location, staticContext = {} }) => {
  staticContext.status = 404;

  return (
    <main>
      <Helmet>
        <title>404 — Not Found</title>
      </Helmet>

      <h1
        css={css({
          fontSize: "3rem",
          marginBottom: "1rem"
        })}
      >
        404 — Not Found
      </h1>
      <h2
        css={css({
          lineHeight: 1,
          marginBottom: "2rem"
        })}
      >
        The request page <strong>{location.pathname}</strong> does not exist.
      </h2>
      <Button to="/">Go Home</Button>
    </main>
  );
};

export default withRouter(NotFound);
