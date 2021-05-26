import React,{Component} from 'react';
import axios from 'axios';

class updateItem extends Component{
    constructor(props)
    {
        super(props);
       this.state.ItemID=this.props.location.state.item._id;
       this.state.FolderID=this.props.location.state.item.FolderID;

       this.state.NewItemCompany=this.props.location.state.item.ItemCompany;
       this.state.NewItemName=this.props.location.state.item.ItemName;


    }
    state={
        NewItemName:'',
        NewItemCompany:'',
        ItemID:null,
        FolderID:undefined
    }
    
    onsubmit=async(e)=>{
        e.preventDefault();
        const Item={
            ItemID:this.state.ItemID,
            ItemName:this.state.NewItemName,
            ItemCompany:this.state.NewItemCompany,

            FolderID:this.state.FolderID
        }
        await axios.post("http://localhost:5000/Item/update/",Item)
        .then(res=>console.log('Item updated'))
        .catch(err=>console.log('Client:Item update error:'+err.response.data)); 
        this.props.history.push({
           pathname: '/folders/',
            state: { ParentFolderID: this.state.FolderID }
        })
    }
    onChangeItemName=(e)=>{
        this.setState({NewItemName:e.target.value});
    }
    onChangeItemCompany=(e)=>{
        this.setState({NewItemCompany:e.target.value});
    }
    render(){
        return(
            
            <form onSubmit={this.onsubmit}>
                <div className="form-group" >
                    <label style={{backgroundColor:"#DDD",fontWeight:"bold"}}>
                        Update Item[ ItemName:{this.state.NewItemName}
                        ,ItemCompany:{this.state.NewItemCompany}]</label>
                    <br/><br/>
                    <label>New ItemName</label>
                    <input type="text"
                     required className="form-control" 
                     value={this.state.NewItemName}
                     onChange={this.onChangeItemName}
                     autoFocus
                     />
                     <label>New ItemCompany</label>
                     <input type="text"
                     required className="form-control" 
                     value={this.state.NewItemCompany}
                     onChange={this.onChangeItemCompany}
                     
                     />
                </div>  
                <div className="form-group">
                    <input type="submit"  value="Update Item" className="btn btn-primary"  style={{margin:5}}/>
                    <button className="btn btn-primary" onClick={()=>{this.props.history.push({
            pathname: '/folders/',
            state: { ParentFolderID: this.state.FolderID }
        })}}>Back</button>
                </div>
            </form>

        );

    }
}

export default updateItem;