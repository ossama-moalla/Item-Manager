const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const folderSchema=new Schema({
    FolderName:{
        type:String,
        required:true,
        minlength:3
    },
    ParentFolderID:
    {
            type:Schema.Types.ObjectId,
            ref: 'Folder',
            required:false
            
    }},
    {
        timestamps:true,
    });
    
    const Folder= mongoose.model('Folder',folderSchema);
 
    module.exports=Folder;