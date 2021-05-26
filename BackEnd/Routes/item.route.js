const router=require('express').Router();
const mongoose = require('mongoose');
let Item=require('../models/item.model');


router.route('/:id').get((req,res)=>{
        
        Item.find({_id:req.params.id})
        .then(item=>{
            res.json(item)})
        .catch(err=>res.status(400).json('Error:'+err));

    });
router.route('/list/:id').get((req,res)=>{

        Item.find({FolderID:req.params.id})
        .then(item=>{
            res.json(item)})
        .catch(err=>res.status(400).json('Error:'+err));

    });
router.route('/add').post((req,res)=>{

    var item = new Item;
     item.ItemName=req.body.ItemName;
     item.ItemCompany=req.body.ItemCompany;
     item.FolderID=req.body.FolderID;

     item.ItemImage=req.body.ItemImage;
    item.save()
    .then(()=>{
        res.json('Item added')})
    .catch(err=>{
        res.status(400).json('SERVER Replay:Add Item ERROR:'+err);});

});

router.route('/update').post((req,res)=>{
    Item.findById(req.body.ItemID)
    .then(item=>{
        item.ItemName=req.body.ItemName;
        item.ItemCompany=req.body.ItemCompany;

        item.FolderID=req.body.FolderID;
        item.save()
        .then(()=>res.json('Item updated'))
        .catch(err=>{ res.status(400).json('Update Item Error:'+err)})
    })
   
})
router.route('/delete/:id').post((req,res)=>{
    Item.findByIdAndDelete(req.params.id)
    .then(()=>res.json('Item Deleted'))
    .catch(err=>res.status(400).json('Item Delete Error:'+err));
})

module.exports=router;