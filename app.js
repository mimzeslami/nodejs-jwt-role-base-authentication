const express = require("express");
const app = express();
const fs = require("fs");
const morgan = require("morgan");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./config/app");
const routes = require("./routes");
const limiter = require('express-rate-limit')
const { setHeaders } = require("./middlewares/headers");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "uploads")));
app.use(express.static("public"));
app.use(morgan("dev"));
require("./swagger-setup")(app);

app.use(
  limiter({
    windowMs: 1000,
    max: 20,
    lookup: ["connection.remoteAddress"],
    message: {
      code: 429,
      message: "could not response due limitation policy",
    },
  })
);

// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "logs/access.log"),
  {
    flags: "a",
  }
);
// setup the logger
app.use(morgan("combined", { stream: accessLogStream }));

app.use(setHeaders);

app.use("/", routes);
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server started. Open the browser at http://localhost:" + port);
});
