const router=require('express').Router();
const {getProducts,createProduct,updateProduct,deleteProduct}=require('../controller/productController');
 
router.get('/products',getProducts);

router.post('/products',createProduct);

// router.put('/products/:id',updateProduct) // Put updates or overwrites all the fields of the document

router.patch('/products/:id',updateProduct); // Patch updates only particular field of the document

router.delete('/products/:id',deleteProduct);


module.exports=router;