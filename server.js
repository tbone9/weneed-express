const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const connectDB = require('./config/db');

app.use(cors());

dotenv.config({ path: './config/config.env'});

connectDB();

// const post = require('./routes/post');


app.use(express.json());

// app.use('/api/v1/post', post);

// ROUTES
const postController = require('./controllers/post');
app.use('/post', postController);

const authController = require('./controllers/auth');
app.use('/user', authController);

//PORT CONNECTION
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));