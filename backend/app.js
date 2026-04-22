import express from 'express'
import cors from "cors";
import dbconnect from './connect/dbconnect.js';
import fileUpload from 'express-fileupload';
import userRouter from './routes/userRouter.js';

import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";


const app = express()

app.use(express.json())
app.use(cors());
app.use(fileUpload())


const port = 8888;
dbconnect()

app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);


app.use("/api/user",userRouter)
app.listen (port,()=>{
    console.log(`server is running on ${port}`)
})





