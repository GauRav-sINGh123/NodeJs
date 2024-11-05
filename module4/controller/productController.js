const Product=require('../models/productModel');

const getProducts=async(req,res)=>{
    try{
        const allProducts=await Product.find();
        if(!allProducts || allProducts.length===0){
        return res.status(404).json({message:"Products not found"});
        }
        res.status(200).json(allProducts);
      }
      catch(err){
       res.status(500).json({message:err.message});
      }
}

const createProduct=async(req,res)=>{
    try{
        const product=await Product.create(req.body);
        res.status(201).json(product);
      }
      catch(err){
       res.status(500).json({message:err.message});
      }
}

const updateProduct=async(req,res)=>{
    const {id}=req.params;
    try{
        const updatedProduct=await Product.findByIdAndUpdate(id,req.body,{new:true});
        if(!updatedProduct){
            return res.status(404).json({message:"Product not found"});
          }
        res.status(200).json(updatedProduct);
      }
      catch(err){
       res.status(500).json({message:err.message});
      }
}

const deleteProduct=async(req,res)=>{
    const {id}=req.params;
    try{
        const deletedProduct=await Product.findByIdAndDelete(id);
        if(!deletedProduct){
            return res.status(404).json({message:"Product not found"});
        }
        res.status(200).json(deletedProduct);
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
}

module.exports={getProducts,createProduct,updateProduct,deleteProduct};