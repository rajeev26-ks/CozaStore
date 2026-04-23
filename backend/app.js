import express from 'express';
import cors from 'cors';
import dbconnect from './connect/dbconnect.js';  
import fileUpload from 'express-fileupload';
import userRouter from './routes/userRouter.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import authRoutes from './routes/authRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';

import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(fileUpload({
  limits: { fileSize: 5 * 1024 * 1024 }  // optional: limit file size to 5MB
}));

const port = 8888;
dbconnect();

// API routes
app.use('/api/orders', orderRoutes);
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/user', userRouter);

// 404 handler for unmatched routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});