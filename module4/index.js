/*    MVC Pattern  */
require('dotenv').config();
const express=require('express');
const app=express();
const connectDB=require('./config/db');
const productRouter=require('./routes/product');

app.use(express.json());
connectDB();

app.use('/api',productRouter);



app.listen(process.env.PORT,()=>{
    console.log(`listening on port ${process.env.PORT}`);
});