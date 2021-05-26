import React,{Component} from 'react';
import axios from 'axios';
import { Mongoose } from 'mongoose';

class addFolder extends Component{
    constructor(props)
    {
        super(props);
       this.state.ParentFolderID=this.props.location.ParentFolder.FolderID;

    }
    state={
        FolderName:'',
        ParentFolderID:null
    }
    
    onsubmit=async(e)=>{

        e.preventDefault();
        const folder={
            FolderName:this.state.FolderName,
            ParentFolderID: this.state.ParentFolderID
        }
        await axios.post("http://localhost:5000/folders/addfolder/",folder)
        .then(res=>console.log('folder added'))
        .catch(err=>console.log('Client:folder add error:'+err.response.data)); 
       this.props.history.push({
            pathname: '/folders/',
            state: { ParentFolderID: this.state.ParentFolderID }

            
        })
    }
    onChangeFolderName=(e)=>{
        this.setState({FolderName:e.target.value});
    }
    render(){

        return(
            
            <form onSubmit={this.onsubmit}>
                <div className="form-group" >
                    <label>Folder Name</label>
                    <input type="text"
                     required className="form-control" 
                     value={this.state.FolderName}
                     onChange={this.onChangeFolderName}
                     />
                </div>  
                <div className="form-group">
                    <input type="submit"  value="add folder" className="btn btn-primary" style={{margin:5}}/>
                    <button className="btn btn-primary" onClick={()=>{this.props.history.push({
            pathname: '/folders/',
            state: { ParentFolderID: this.state.ParentFolderID }
        })}}>Back</button>
                </div>
            </form>

        );

    }
}

export default addFolder;