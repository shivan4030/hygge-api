import morgan from "morgan";
import fs from "fs";
import path from "path";
import rfs from "rotating-file-stream";

const logs = app => {
  const directory = path.resolve("./logs");

  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
  }

  const rotation = {
    interval: "1d",
    size: "10M",
    compress: "gzip",
    path: directory
  };

  const appLogStream = rfs("app.log", rotation);
  const errorLogStream = rfs("error.log", rotation);

  // 400 & 500 errors to the error log
  app.use(
    morgan("dev", {
      stream: errorLogStream,
      skip: (req, res) => res.statusCode < 400
    })
  );

  // App logs
  app.use(
    morgan("combined", {
      stream: appLogStream
    })
  );
};

export default logs;
