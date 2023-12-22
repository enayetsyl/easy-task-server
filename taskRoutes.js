const express = require('express');
const router = express.Router();
const { Task } = require('./model');

// FOR ALL PRODUCTS

router.get('/allproducts', async (req, res) => {
  try {
    const result = await Product.find();
    res.send(result);
  } catch (error) {
    console.error('Error fetching produts:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

// EDIT PRODUCT GET ROUTE
router.get('/allproducts/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Product.findById(id);
    res.send(result);
  } catch (error) {
    console.error('Error fetching products:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

// FOR ADD PRODUCT POST ROUTE
router.post('/addproduct', async (req, res) => {
  try {
    const product = new Product(req.body);
    console.log('req.body', product)
    const result = await product.save();
    console.log('result', result)
    res.send(result);
  } catch (error) {
    console.error('Error adding product:', error.message);
    res.status(500).send('Internal Server Error');
  }
});
// EDIT PRODUCT PATCH ROUTE
router.patch('/allproducts/:id', async (req, res) => {
  const id = req.params.id;
  const updatedProductData = req.body;
  const result = await Product.findByIdAndUpdate(
    id,
    { $set: updatedProductData },
    { new: true }
  );
  res.send(result);
});

// FOR DELETE PRODUCT ROUTE
router.delete('/allproduct/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Product.findByIdAndDelete(id);
    res.send(result);
  } catch (error) {
    console.error('Error deleting product:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
