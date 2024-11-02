const express=require('express');
const router=express.Router();

router.get('/',(req,res)=>{
    res.send({
        data:[
            {
                name:'item1',
                price:100
            },
            {
                name:'item2',
                price:200
            },
            {
                name:'item3',
                price:300
            }
        ],
        status:200,})
})

router.post('/item',(req,res)=>{
    res.send({
        data:req.body,
        status:200
    })
})

router.put('/item',(req,res)=>{
    res.send('Put request recieved')
})

router.delete('/item',(req,res)=>{
  res.send('Delete request recieved')
})

module.exports=router