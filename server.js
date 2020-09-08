const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');


const items = require('./routes/items');
const app = express();
app.use(express.json());


//@ Database Connection
mongoose.connect(process.env.mongo ,{ useNewUrlParser :true, useUnifiedTopology: true})
.then(()=>{console.log("Database Connection Successful")})
.catch(()=>{console.log("Database Error")})        

//@ Routes
app.use('/api/items',items);

//@ Serve static assests if we are in production

if(process.env.NODE_ENV === 'production') {
   app.use(express.static('client/build'));
   app.get('*',(req,res)=>{
      res.sendFile(path.resolve(__dirname,'client','build','index.html'))
   })
}

const port = process.env.PORT || 5000
app.listen(port,()=>{
   console.log("Server running on http://localhost:5000");
})