const cors = require('cors');
const express = require('express');
const app = express();
app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
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

app.listen(config.port, function() {
  console.log(`Listening http://localhost:${config.port}`);
});