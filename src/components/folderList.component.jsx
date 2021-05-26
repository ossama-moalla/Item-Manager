import React, { Component } from 'react';
import mongoose from 'mongoose';

import axios from 'axios';
import {Link,Redirect} from 'react-router-dom';
import Error from './Error.component';
const Folder=props=>{
    return(
    <tr key={props.folder._id}>
        <td>
        <img src={process.env.PUBLIC_URL + '/folder_icon.jpg'} style={{width:25,height:25,marginTop:-8,marginRight:5}} /> 
        <Link to='#'  style={{textDecoration:"none"}} onClick={()=>{props.onClick(props.folder._id)}}>
            {props.folder.FolderName}</Link>
        </td>
        <td>-</td>
        <td>
            <Link to='#' onClick={()=>{props.onClick(props.folder._id)}}>Open</Link>|
            <Link to={{pathname:'/updatefolder' ,state:{Folder:props.folder}}}>Edit</Link>|
            <a href="#" onClick={()=>{props.onDelete(props.folder._id)}}>Delete</a>
        </td>

    </tr>);
}
const Item=props=>{
    return(
    <tr key={props.item._id}>
        <td>
        <img src={props.item.ItemImage} style={{width:25,height:25,marginTop:-8,marginRight:5}} /> 
        <Link style={{textDecoration:"none"}}  to={{pathname:'/item' ,state:{item:props.item}}}>{props.item.ItemName}</Link>
        </td>
        <td>
            <p>{props.item.ItemCompany}</p>
        </td>
        <td>
            <Link to={{pathname:'/item' ,state:{item:props.item}}}>Open</Link>|
            <Link to={{pathname:'/updateitem' ,state:{item:props.item}}}>Edit</Link>|
            <a href="#" onClick={()=>{props.onDelete(props.item._id)}}>Delete</a>
        </td>

    </tr>);
}
class FolderPath extends Component{
    state={
        PathFolders:[]
    }
    componentDidMount(){
        console.log('folderlist-componentDidMount');
          if(!mongoose.Types.ObjectId.isValid(this.props.FolderID))
          {

            this.setState({
                PathFolders:[]}) ;
          }
          else
          {           
               axios.get('http://localhost:5000/folders/get_path/'+this.props.FolderID)
              .then(response=>{ 
                    
                        this.setState({
                            PathFolders:response.data}) ;
 
                 })
              .catch(err=>{
                  this.props.history.push({
                      pathname: '/Error/',
                      Message: err.response.data
                  })
             });
      
          }
        // this.state.parentfolderid=this.props.match.params.id;
      }
      
      render(){
        console.log('folderlist-render');

          return(
              <React.Fragment>
                  <img src={process.env.PUBLIC_URL + '/home.png'} style={{width:20,height:20,marginTop:-8}}></img>

                <Link to='#' style={{textDecoration:"none"}} onClick={()=>{this.props.onClick(undefined)}}>ROOT</Link>/

                {
                    
                this.state.PathFolders.reverse().map(folder=>
                    <React.Fragment key={folder._id}>
                        <Link to='#' style={{textDecoration:"none"}} 
                         onClick={()=>{this.props.onClick(folder._id)}}>{folder.FolderName}</Link>/
                    </React.Fragment>
                        )
                        }

              </React.Fragment>
              
          )
      }
}
class folderList extends Component {
    constructor(props)
    {
        super(props);
        console.log(props)
    }
    state = {
        ParentFolderID:undefined,
        FoldersList:[],
        ItemsList:[],

        PathFolders:[]
      }
      componentDidMount(){
                let folderid;
                if(
                    this.props.location.state===undefined||
                    !mongoose.Types.ObjectId.isValid(this.props.location.state.ParentFolderID)
                    ||this.props.location.state.ParentFolderID===undefined)
                    {
                        folderid="";
                    }
                else
                {    
                     folderid=this.props.location.state.ParentFolderID ;
                }
                this.updateComponents(folderid);

                // this.state.parentfolderid=this.props.match.params.id;
      }
       
      updateComponents=async(folderid)=>{
          
            let folderslist=[];
            let itemslist=[];

             await axios.get('http://localhost:5000/folders/'+(folderid===undefined?"":folderid))
             .then(response=>{ 
                     folderslist=response.data;
                     })
                    .catch(err=>{
                        <Error Message={'ffff'}/>
                        //this.props.history.push("/Error/"+err.response.data);
                    });
                    if(mongoose.Types.ObjectId.isValid(folderid)){
                        await axios.get('http://localhost:5000/item/list/'+folderid)
                        .then(res=>{
                            itemslist=res.data;
                        })
                        .catch(err=>{
                            <Error Message={'ffff'}/>
                            //this.props.history.push("/Error/"+err.response.data);
                        });

                    }
                    this.setState({
                        ParentFolderID:folderid,
                        ItemsList:itemslist,
                        FoldersList:folderslist}) ;

       
      }
      deleteFolder=async(id)=>{
        const r=await axios.post("http://localhost:5000/folders/delete/"+id)
            .then(res=>console.log('folder Deleted!'))
            .catch(err=>console.log('folder Delete Error:'+err.response.data)); 
            
            this.updateComponents(this.state.ParentFolderID);

        
        }
        deleteItem=async(id)=>{
            const r=await axios.post("http://localhost:5000/item/delete/"+id)
                .then(res=>console.log('item Deleted!'))
                .catch(err=>console.log('item Delete Error:'+err.response.data)); 
                
                this.updateComponents(this.state.ParentFolderID);

        }
      getFolderList(parentfolderid){
        return this.state.FoldersList.map(currentfolder=>
           {return <Folder folder={currentfolder}onDelete={this.deleteFolder} 
           onClick={this.updateComponents } key={currentfolder._id}/>});
  }

      getItemList(parentfolderid){
          if(mongoose.Types.ObjectId.isValid(this.state.ParentFolderID))
          {
            return this.state.ItemsList.map(currentitem=>
                {return <Item item={currentitem}onDelete={this.deleteItem} 
                onClick={this.updateComponents } key={currentitem._id}/>});
          }
  }
      render() { 
            
        console.log('folderlist render')

        return ( 
                <div>
                    <label>Path:</label><br/>
                    <div style={{border:"ridge "}}>
                        {<FolderPath FolderID={this.state.ParentFolderID} onClick={this.updateComponents } key={this.state.ParentFolderID}/>}
                    </div>
                    <h1>Folders</h1>

                    <Link to={{pathname:'/addfolder' ,ParentFolder:{FolderID:this.state.ParentFolderID}}} style={{marginRight :40}}>Add Folder</Link>
                    {
                        mongoose.Types.ObjectId.isValid(this.state.ParentFolderID)&&
                        <Link to={{pathname:'/additem' ,ParentFolder:{FolderID:this.state.ParentFolderID}}}>Add Item</Link>
                    }
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Company</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                                {this.getFolderList()}
                                {this.getItemList()}

                            
                        </tbody>
                    </table>
                </div>
            
            );
        }
}
 
export default folderList;