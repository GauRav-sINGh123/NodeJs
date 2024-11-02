const express=require('express');
const app=express();
const port=3000;
const useRoutes=require('./routes/routes');

// app.use(express.json()); // json middleware(inbuilt middleware)
  
//   app.get('/', (req, res) => {
//     console.log(req.body)
//     res.send('Hello World!')
//   })
  
/* Application Level Middleware */

// const user=true
//  const isLoggedIn=(req,res,next,err)=>{
//     if(user){
//         console.log('user is logged in')
//         next()
//     }
//     else{
        //    console.log(err)
//         res.send('Please Login')
//         
//     }
//  }
//  app.use(isLoggedIn)

//  const isAdmin=(req,res,next)=>{
//     if(user){
//         console.log('user is admin')
//         next()
//     }
//     else{
//         res.send('Please Login')
//     }
//  }
//  app.use(isAdmin)
  
//   app.get('/', (req, res) => {
//     res.send('Hello User!')
//   })

/*     Router Level Middleware/  Route Specific Middleware      */


app.use('/api',useRoutes)

app.listen(port,()=>{
    console.log(`listening on port ${port}`)
})