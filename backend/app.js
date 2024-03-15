require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const customMiddleware = require('./middlewares/customMiddleware');
const userRouter = require('./routers/userRouter');
const contactRouter = require('./routers/contactRouter');

// express app
const app = express();

connectDB();
// ...

app.use(cors());
app.use(express.json());

app.use(customMiddleware.requestLogger);

app.use('/', require('./routers/userRouter.js'));

app.get('/', (req, res) => {
	res.send('API Running!');
});

app.use('/api/contact', contactRouter);
app.use('/api/users', userRouter);

app.use(customMiddleware.unknownEndpoint);
app.use(customMiddleware.errorHandler);

module.exports = app;
