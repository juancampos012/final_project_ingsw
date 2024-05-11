const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const app = express();

const userRoutes = require('./src/routes/UserRoutes');
const truckRoutes = require('./src/routes/TruckRoutes');
const tripRoutes = require('./src/routes/TripRoutes');
const tireRoutes = require('./src/routes/TireRoutes');

const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(cookieParser());

app.use('/uploads/users', express.static('./uploads/users'));

// http://localhost:3006
app.listen(PORT, () => console.log('Server running on port', PORT));

// http://localhost:3006/api/v1/users
app.use('/api/v1/users', userRoutes);

// http://localhost:3006/api/v1/trucks
app.use('/api/v1/trucks', truckRoutes);

// http://localhost:3006/api/v1/trips
app.use('/api/v1/trips', tripRoutes);

// http://localhost:3006/api/v1/tires
app.use('/api/v1/tires', tireRoutes);

//connect to mongo
const getConnection = async () => {
    try {
      await mongoose.connect(process.env.DATABASE_URL );
      console.log(`MongoDB Connected good`);
    } catch (error) {
      console.error(`Failed with error: ${error.message}`);
    }
};

getConnection();
