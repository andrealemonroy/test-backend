const express = require('express');
const cors = require('cors');
const app = express();
const allowedOrigins = ["http://localhost:3000"];

const { config } = require('./config/index');
const loginApi = require('./routes/login.js');

const {
  logErrors,
  errorHandlers,
  wrapError
} = require('./utils/middleware/errorHandlers.js');

const notFoundHandler = require('./utils/middleware/notFoundHandler');


// body parser
app.use(express.json({limit:'50mb'}));

loginApi(app);
app.use(notFoundHandler);

app.use(logErrors);
app.use(wrapError);
app.use(errorHandlers);
app.use(function(req, res, next) {
  let origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin); // restrict it to the required domain
  }

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.listen(config.port, function() {
  console.log(`Listening http://localhost:${config.port}`);
});