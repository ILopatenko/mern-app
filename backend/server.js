//IMPORT block
const express = require('express');
const dotenv = require('dotenv/config');
const { errorHandler } = require('./middleware/errorMiddleware');

//Setup variables
const PORT = process.env.PORT || 5555;

//Create a new instance of express server
const app = express();

//Add body parser and json middlewares to the server
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Setup server routes
app.use('/api/goals', require('./routes/goalRoutes'));

//Setup error handler
app.use(errorHandler);

//Start the server on PORT
app.listen(PORT, () => {
  console.log(`Server is started on port ${PORT}`);
});
