import React,{Component} from 'react';
import axios from 'axios';

class updateFolder extends Component{
    constructor(props)
    {
        super(props);
       this.state.FolderID=this.props.location.state.Folder._id;
       this.state.ParentFolderID=this.props.location.state.Folder.ParentFolderID;

       this.state.FolderName=this.props.location.state.Folder.FolderName;
       this.state.NewFolderName=this.props.location.state.Folder.FolderName;


    }
    state={
        FolderName:'',
        NewFolderName:'',
        FolderID:null,
        ParentFolderID:undefined
    }
    
    onsubmit=async(e)=>{
        e.preventDefault();
        const folder={
            FolderID:this.state.FolderID,
            FolderName:this.state.NewFolderName,
            ParentFolderID:this.state.ParentFolderID
        }
        await axios.post("http://localhost:5000/folders/updatefolder/",folder)
        .then(res=>console.log('folder updated'))
        .catch(err=>console.log('Client:folder update error:'+err.response.data)); 
        this.props.history.push({
            pathname: '/folders/',
            state: { ParentFolderID: this.state.ParentFolderID }
        })
    }
    onChangeFolderName=(e)=>{
        this.setState({NewFolderName:e.target.value});
    }
    render(){
        return(
            
            <form onSubmit={this.onsubmit}>
                <div className="form-group" >
                    <label>Update Folder :{this.state.FolderName}</label>
                    <input type="text"
                     required className="form-control" 
                     value={this.state.NewFolderName}
                     onChange={this.onChangeFolderName}
                     
                     />
                </div>  
                <div className="form-group">
                    <input type="submit"  value="Update Folder" className="btn btn-primary"  style={{margin:5}}/>
                    <button className="btn btn-primary" onClick={()=>{this.props.history.push({
            pathname: '/folders/',
            state: { ParentFolderID: this.state.ParentFolderID }
        })}}>Back</button>
                </div>
            </form>

        );

    }
}

export default updateFolder;