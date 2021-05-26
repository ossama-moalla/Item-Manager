const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const Folder=require('./folder.model');
const itemSchema=new Schema({
    ItemName:{
        type:String,
        required:true,
        minlength:3
    },
    ItemCompany:{
        type:String,
        required:false,
        minlength:3
    },
    FolderID:
    {
        type:Schema.Types.ObjectId,
        ref: 'Folder',
    },
    ItemImage:{ 
        type: String
        }
},{
    timestamps:true
});

const Item= mongoose.model('Item',itemSchema);

module.exports=Item;