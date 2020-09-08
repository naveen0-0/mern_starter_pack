const router = require('express').Router();
const Item = require('../models/Item');


router.get('/', (req,res) => {
   Item.find()
       .sort({data:-1})
       .then(items=> res.json(items))
})

router.post('/',(req,res) => {
   Item.create({ name : req.body.name })
       .then(item=>res.json(item))
})


router.delete('/:id',(req,res) => {
   Item.findByIdAndDelete({_id:req.params.id})
       .then(() => res.send("Item Deleted"))
       .catch(()=>res.status(404).json("Error"))
})

module.exports = router;