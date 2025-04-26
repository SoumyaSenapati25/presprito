import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import helmet from 'helmet';  // Import helmet for security headers
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRoute from './routes/userRoute.js';

// app config
const app = express();
const port = process.env.PORT || 4000;

// Middleware to secure the app
app.use(helmet());  // Use helmet for security headers

// Database & Cloudinary connections
connectDB();
connectCloudinary();

// middlewares
app.use(express.json());
app.use(cors());

// api endpoints
app.use('/api/admin', adminRouter);
app.use('/api/doctor', doctorRouter);
app.use('/api/user', userRoute);

// Basic route for checking server status
app.get('/', (req, res) => {
  res.send('API Working Perfectly');
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Starting the server and handling successful connection
app.listen(port, () => {
  console.log(`Server Started on port ${port}`);
});

// Database connection handling (improved version)
connectDB()
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((err) => {
    console.error('Error connecting to the database', err);
    process.exit(1);  // Exit process with failure
  });
