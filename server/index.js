const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

const app = express();

const userRoutes = require('./src/routes/UserRoutes')

const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

// http://localhost:3006/
app.listen(PORT, () => console.log('Server running on port', PORT));

// http://localhost:3006/users/
app.use('/users', userRoutes);

//connect to mongo
const getConnection = async () => {
    try {
      await mongoose.connect(process.env.DATABASE_URL );
      console.log(`MongoDB Connected`);
    } catch (error) {
      console.error(`Failed with error: ${error.message}`);
    }
};

getConnection();
