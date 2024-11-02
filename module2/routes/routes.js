const express=require('express');
const router=express.Router();

/* Middlewares  */
const isAuthenticated=(req,res,next)=>{
    req.user={
        id:1,
        role:"student"
    }
    if(req.user){    
        next()
    }
    else{
        res.send('Please Login')
    }

}
const isStudent=(req,res,next)=>{
    if(req.user.role=="student"){
        next()
    }
    else{
        res.json({
            status:401,
            message:'Please Login as student',
        })
    }
}
const isAdmin=(req,res,next)=>{
    if(req.user.role=="admin"){
        next()
    }
    else{
        res.json({
            status:401,
            message:'Please Login as admin',
        })
    }
}



/* Routes */

router.get('/student',isAuthenticated,isStudent,(req,res)=>{
 res.send('Welcome Student')   
})
router.get('/admin',isAuthenticated,isAdmin,(req,res)=>{
 res.send('Welcome Admin')   
})

module.exports=router