require ('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const productRoute = require('./routes/productRoute');
const errorMiddleware = require('./middleware/errorMiddleware');
var cors = require('cors');
const MONGO_URL = process.env.MONGO_URL;
var corsOptions = {
  origin: 'http://localhost:4200'   , //your server
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

app.use('/api/product', productRoute);

app.use(errorMiddleware);

mongoose.set("strictQuery", false)
mongoose.connect(MONGO_URL)
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





