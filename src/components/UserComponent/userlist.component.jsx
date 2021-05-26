import React, { Component } from 'react';
import mongoose from 'mongoose';

import axios from 'axios';
import {Link,Redirect} from 'react-router-dom';
const User=props=>{
    return(
    <tr key={props.user._id}>
        <td>
        {props.user._id}
        </td>
        <td>
        {props.user.name}
        </td>
        <td>
        {props.user.email}
        </td>

    </tr>);
}
class userList extends Component {
    constructor(props)
    {
        super(props);
    }
    state = {
      userList:[],
    }
 
      componentDidMount(){
        console.log('fasdf')

                this.updateComponents();

                // this.state.parentfolderid=this.props.match.params.id;
      }
       
      updateComponents=async()=>{
          
            let userlist=[];
              console.log('ff')
             await axios.get('http://localhost:5000/user')
             .then(response=>{ 
              userlist=response.data;
                     })
                    .catch(err=>{
                        console.log('getuser error:'+err)
                        //this.props.history.push("/Error/"+err.response.data);
                    });
                   
                    this.setState({
                        userList:userlist}) ;

       
      }
      deleteuser=async(id)=>{
        const r=await axios.post("http://localhost:5000/user/delete/"+id)
            .then(res=>console.log('User Deleted!'))
            .catch(err=>console.log('user Delete Error:'+err.response.data)); 
            
            this.updateComponents(this.state.ParentFolderID);

        
        }
      getUserList(){
        return this.state.userList.map(currentuser=>
           {return <User user={currentuser}onDelete={this.deleteuser} 
           onClick={this.updateComponents } key={currentuser._id}/>});
  }

     
      render() { 
            
        console.log('userlist render')

        return ( 
                <div>
                    <label>Path:</label><br/>
                    
                    <h1>Users</h1>

                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                                {this.getUserList()}

                            
                        </tbody>
                    </table>
                </div>
            
            );
        }
}
 
export default userList;