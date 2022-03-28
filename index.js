const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors({origin:true,credentials: true}));
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