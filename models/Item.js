const { Schema, model } = require('mongoose');

const ItemSchema = new Schema({
   name : {
      type : String,
      require : true,
   },
   date : {
      type : Date,
      default : Date.now
   }
})

const Item = model('item',ItemSchema);

module.exports = Item;