const router=require('express').Router();
const User=require('../models/userModel');

/*   Get Request */

router.get('/user',async(req,res)=>{
  try{
    const users=await User.find();
    res.status(200).json(users)
  }
  catch(err){
   res.status(500).json({message:err.message})
  }
})
/*   Post Request */
router.post('/user',async(req,res)=>{
  try{
    const user=await User.create(req.body);
    res.status(201).json(user)
  }
  catch(err){
   res.status(500).json({message:err.message})
  }
})

/*   Put Request */

router.put('/user/:id',async(req,res)=>{
  const {id}=req.params;
  try{
    const updatedUser=await User.findByIdAndUpdate(id,req.body);
    if(!updatedUser){
      return res.status(404).json({message:"User not found"})
    }
    res.status(200).json(updatedUser)
  }
  catch(err){
   res.status(500).json({message:err.message})
  }
})


/*   Delete Request */
router.delete('/user/:id',async(req,res)=>{
  const {id}=req.params;
  try{
    const deletedUser=await User.findByIdAndDelete(id);
    if(!deletedUser){
      return res.status(404).json({message:"User not found"})
    }
    res.status(200).json({
      success:true,
      message:"User Deleted"
    })
  }
  catch(err){
   res.status(500).json({message:err.message})
  }
})


module.exports=router