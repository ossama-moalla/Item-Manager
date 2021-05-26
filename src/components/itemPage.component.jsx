import React,{Component} from 'react';
const base64 = require('base64-js');

export default class ItemPage extends Component{
    constructor(props)
    {
        super(props);
        this.state.item=this.props.location.state.item;
        console.log(this.state.item.ItemImage)
    }
    state={
        item:undefined,
    }
    
    render(){

       const style={
           tablerow:{fontWeight:"bold"}
       }
       //console.log(this.state.item.ItemImage);
 
        return(
            <div className="container">

                    <h1 >Item Page</h1>
                    <div display="flex" >
                    <div  style={{width:"60%",float:"left",margin:25}}>
                    <table className="table" >
                        <colgroup>
                        <col width="170" />

                        </colgroup>
                        <tbody style={style.tablerow}>
                            <tr style={{width:50}} >
                                <td>
                                    Item ID:
                                </td>
                                <td>
                                    {this.state.item._id}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Item Name:
                                </td>
                                <td>
                                    {this.state.item.ItemName}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Item Company:
                                </td>
                                <td>
                                    {this.state.item.ItemCompany}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Parent Folder ID:
                                </td>
                                <td>
                                    {this.state.item.FolderID}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <button className="btn btn-primary" onClick={()=>{this.props.history.push({
            pathname: '/folders/',
            state: { ParentFolderID: this.state.item.FolderID }
        })}}>Back</button>
                    </div>
                   
                    <div style={{float:"left",border:"ridge",margin:25}}>
                    <img style={{height:250,width:300}}
                    src={this.state.item.ItemImage}/>
                    </div>
                    </div>
                    
            </div>
        );
    }
}