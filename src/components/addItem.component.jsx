import React,{Component} from 'react';
import axios from 'axios';

class addItem extends Component{
    constructor(props)
    {
        super(props);
       this.state.FolderID=this.props.location.ParentFolder.FolderID;
    }
    state={
        ItemName:'',
        ItemCompany:'',
        FolderID:undefined,
        ItemImageTemp:[],
        ItemImageFile:undefined
    }
     readfile=async (params) =>{
        
    }
    readFile=(e)=>{
            return new Promise((resolve) => {
              const reader = new FileReader()
              reader.onloadend = () => resolve(reader.result)
              reader.readAsDataURL(e)
            })
    }
    onsubmit=async(e)=>{
        e.preventDefault(); 
        var reader = new FileReader();
        var result=[];
        try
        {
             result=await this.readFile(this.state.ItemImageFile);

        }catch{
            result=[]
        }
            const item={
                ItemName:this.state.ItemName,
                ItemCompany:this.state.ItemCompany,
                FolderID:this.state.FolderID,
                ItemImage:result
            }
            

            await axios.post("http://localhost:5000/item/add",item)
            .then(res=>console.log('item added'))
            .catch(err=>console.log('Client:item add error:'+err.response.data)); 
            this.props.history.push({
                pathname: '/folders/',
                state: { ParentFolderID: this.state.FolderID }
           })        
        
         
        
        
    }
    onChangeItemName=(e)=>{
        this.setState({ItemName:e.target.value});
    }
    onChangeItemCompany=(e)=>{
        this.setState({ItemCompany:e.target.value});
    }
    
    onChangeItemImageURL =async(event)  => {
        if (event.target.files && event.target.files[0]) {
          let img = event.target.files[0];
         
          this.setState({

            ItemImageTemp: URL.createObjectURL(img),
            ItemImageFile:img
          });
        }
      };
    render(){

        return(
            
            <form onSubmit={this.onsubmit}>
                <div className="container"  >
                <div className="row" style={{margin:10,marginTop:0}}>
                    <div className="col-sm" style={{width:"50%",margin:20}}>
                        <br/>
                        <label >Item Name</label>
                        <input type="text"
                        required className="form-control" 
                        value={this.state.ItemName}
                        onChange={this.onChangeItemName}
                        autoFocus
                        />
                        <label>Item Company</label>
                        <input type="text"
                        required className="form-control" 
                        value={this.state.ItemCompany}
                        onChange={this.onChangeItemCompany}
                        
                        />
                    </div>
                    <div className="col-sm" style={{margin:20}}>
                       <input style={{visibility:"hidden"}} type="file" id="image"
                        name="image" value="" onChange={this.onChangeItemImageURL}></input>
                        <br/>
                        <label>Item Image</label><br/>
                        <div>

                        <img src={this.state.ItemImageTemp} style={{width:200,height:200,display:"block"}} alt=""/>
                        <input type="button" value="Upload Image" onClick={()=>{
                            document.getElementById('image').click()
                        }}></input>
                       </div>
                        
                    </div>
                </div>
                <div className="row" style={{margin:10}}>
                    <div style={{margin:"auto",float:"left",width:300}}>
                        <input type="submit"  value="add Item" className="btn btn-primary" style={{margin:5,width:100,height:50}}/>
                        <button style={{margin:5,width:100,height:50}} className="btn btn-primary" onClick={()=>{this.props.history.push({
                                pathname: '/folders/',
                                state: { ParentFolderID: this.state.FolderID }
                            })}}>Back</button>     
                    </div>
                   
                </div>

                    
                    
                </div>  
                
            </form>

        );

    }
}

export default addItem;