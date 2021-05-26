const router=require('express').Router();
const mongoose = require('mongoose');
let Folder=require('../models/folder.model');

router.route('/').get((req,res)=>{
    Folder.find({ParentFolderID:null})
    .then(Folder=>res.json(Folder))
    .catch(err=>res.status(400).json('Error:'+err));
});
router.route('/get_path/:id').get(async(req,res)=>{
    let PathFolders=[];
    let id={value:req.params.id};
    if(mongoose.Types.ObjectId.isValid(id.value))
    {
        function getdata(iid){
            return  Folder.findById(iid)        
            .lean();
        }
        do{
            let data=await getdata(id.value);
            PathFolders.push(data);
            id.value=data.ParentFolderID;
        
        }while(mongoose.Types.ObjectId.isValid(id.value));

        res.json(PathFolders);
    }
        
    });
router.route('/:id').get((req,res)=>{

    const doesFolderExit =  Folder.exists({ _id: req.params.id });

    if(doesFolderExit)
    {
        Folder.find({ParentFolderID:req.params.id})
        .then(Folder=>res.json(Folder))
        .catch(err=>res.status(400).json('Error:'+err));

    }else{
        res.status(400).json('Folder Not Found');
    }
    });
router.route('/addfolder/').post((req,res)=>{

    const FolderName=req.body.FolderName;
    const ParentFolderID=mongoose.Types.ObjectId.isValid(req.body.ParentFolderID)? req.body.ParentFolderID:null;
    const folder=new Folder({FolderName,ParentFolderID});
    folder.save()
    .then(()=>res.json('folder added'))
    .catch(err=>{
        res.status(400).json('SERVER Replay:Add Folder ERROR:'+err);});

});

router.route('/updatefolder/').post((req,res)=>{
    Folder.findById(req.body.FolderID)
    .then(folder=>{
        folder.FolderName=req.body.FolderName;
        folder.ParentFolderID=req.body.ParentFolderID;
        folder.save()
        .then(()=>res.json('folder updated'))
        .catch(err=>res.status(400).json('Update Folder Error:'+err))
    })
   
})
router.route('/delete/:id').post((req,res)=>{
    console.log('delete folder route'+req.params.id);
    Folder.findByIdAndDelete(req.params.id)
    .then(()=>res.json('Folder Deleted'))
    .catch(err=>res.status(400).json('Folder Delete Error:'+err));
})

module.exports=router;