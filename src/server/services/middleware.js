/* eslint-disable no-console */

import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import config from "../config";

export default app => {
  app.set("trust proxy", true);
  app.use(cookieParser());
  app.use(
    bodyParser.json({
      type: ["json", "application/csp-report"]
    })
  );

  if (config.isProduction) {
    app.use(morgan("tiny"));
    app.disable("x-powered-by");
    app.enable("etag");
    app.use(compression());
    app.use(helmet());
    app.use(helmet.hsts({ includeSubdomains: false }));

    app.use(
      helmet.contentSecurityPolicy({
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "'unsafe-eval'", "'unsafe-inline'"],
          styleSrc: [
            "'self'",
            "'unsafe-eval'",
            "'unsafe-inline'",
            "https://fonts.googleapis.com"
          ],
          imgSrc: ["'self'", "data:"],
          fontSrc: ["'self'", "https://fonts.gstatic.com"],
          connectSrc: ["'self'", "https://fonts.gstatic.com"],
          reportUri: "/report-violation"
        },
        browserSniff: false
      })
    );

    app.post("/report-violation", (req, res) => {
      if (req.body) {
        console.warn("CSP Violation: ", req.body);
      } else {
        console.warn("CSP Violation: No data received!");
      }

      res.status(204).end();
    });
  } else {
    app.use(morgan("dev"));
    app.use(cors());
    app.use(helmet.noCache());
  }
};
