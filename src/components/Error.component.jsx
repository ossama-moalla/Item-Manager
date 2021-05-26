import React,{Component} from 'react';

export default class Error extends Component{
    render(){

        return(
            <div>
       <h1>Error</h1>
                <p style={{color: "red"}}>
                    {this.props.location.Message}
                </p>
            </div>
        );
    }
}