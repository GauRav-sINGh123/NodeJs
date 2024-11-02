const app=require('express')();
const port=3000;
const router=require('./routes/items');

app.use('/',router)

app.listen(port,()=>{
    console.log(`listening on port ${port}`)
})