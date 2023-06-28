const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/model');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));


mongoose.set("strictQuery", false)
mongoose.connect('mongodb+srv://swayamsbisoyi:swayams@api.7logcrw.mongodb.net/restApi?retryWrites=true&w=majority')
.then(() =>{
  app.listen(3000, () => { 
    console.log("Listening on 3000");
  });
  console.log("Connected to MongoDB")

}).catch((err) => {
  console.log("Not Connected to MongoDB ERROR!", err)
});

//routes

app.get('/', (req, res) => {
    res.send("Hello World");

});

app.get('/product', async(req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({products});
  }
  catch (error) {
    res.status(500).json({message: error.message});
  }
});

app.get('/product/:id', async(req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json({product});
  }
  catch (error) {
    res.status(500).json({message: error.message});
  }
});

app.delete('/product/:id', async(req, res) => {
 try {
  const product = await Product.findByIdAndDelete(req.params.id);
  if(!product){
    res.status(404).json({message: "Product not found"});
  }

  return res.status(200).json({product});
  
 } catch (error) {
  res.status(500).json({message: error.message});
 }
});

app.put('/product/:id', async(req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true});
    if(!product){
      //cant find any product with the given id
      return res.status(404).json({message: "Product not found"});
    }
    const updatedProduct = await Product.findById(req.params.id);
    return res.status(200).json({updatedProduct});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});
app.post('/product', async(req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({product});
    
  } catch (error) {
     console.log(error.message);
     res.status(500).json({message: error.message});
    
  }
  });




