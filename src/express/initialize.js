import express from "express";
import helmet from "helmet";
import bodyParser from "body-parser";
import path from "path";
import glob from "glob";
import logs from "./logs";

const initialize = () => {
  const app = express();

  app.use(helmet.frameguard());
  app.use(helmet.xssFilter());
  app.use(helmet.noSniff());
  app.use(helmet.ieNoOpen());
  app.disable("x-powered-by");

  // parse application/x-www-form-urlencoded
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );
  // parse application/json
  app.use(bodyParser.json());

  // Set up logging
  logs(app);

  // Glob routes
  glob.sync("./src/**/routes.js").forEach(file => {
    console.log(`Loading routes for ${file}`);
    // babel uses the `default` property for whatever require pulls in
    const routes = require(path.resolve(file)).default;

    // Routes are a list of route objects that can be used to apply to the app
    routes.forEach(route => {
      app[route.method](route.path, route.handler);
    });
  });

  // Log error stacks to the console
  app.use((err, req, res, next) => {
    console.error(err.stack);
    next(err);
  });

  // Respond to XHR 500s with the error in json format
  app.use((err, req, res, next) => {
    if (req.xhr) {
      res.status(500).json({ error: err.message || err.toString() });
    } else {
      next(err);
    }
  });

  // Assume 404 since no middleware responded
  app.use((req, res) => {
    res.status(404).json({
      url: req.originalUrl,
      error: "Not Found"
    });
  });

  return app;
};

export default initialize;
