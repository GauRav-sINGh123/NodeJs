/*    Database Connection  */
require('dotenv').config();
const express=require('express');
const app=express();
const connectDB=require('./config/db');
const userRouter=require('./routes/users');

app.use(express.json());
connectDB();
app.use('/api',userRouter)



app.listen(process.env.PORT,()=>{
    console.log(`listening on port ${process.env.PORT}`)
})